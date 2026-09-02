/**
 * Consultant photo prepare + upload wrapper for the BladeX Supabase
 * `consultant-photos` public bucket.
 *
 * Credentials are consumed from process.env only. This file never reads .env,
 * never logs a credential, and never places one in a command argument. Node
 * loads the env file via --env-file, so the caller's command stays secret-free.
 *
 *   node --env-file=.env skills/consultant-photos/scripts/photos.mjs <command>
 *
 * Commands:
 *   prepare <src> <dest.jpg> [maxEdge=900] [quality=4]
 *       Convert any image to compressed JPEG via ffmpeg (sips fallback).
 *   upload <local.jpg> <objectName.jpg> [--name "Exact Name"]
 *       Upload to consultant-photos and optionally set consultants.photo_url.
 *   upload-batch <manifest.json|->
 *       Upload many: [{ "file": "path.jpg", "object": "45.jpg", "name": "…" }]
 */
import { createClient } from '@supabase/supabase-js';
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const URL_VAR = 'VITE_SUPABASE_URL';
const WRITE_KEY_VAR = 'SUPABASE_SERVICE_ROLE_KEY';
const BUCKET = 'consultant-photos';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function client() {
  const url = process.env[URL_VAR];
  const key = process.env[WRITE_KEY_VAR];

  if (!url) fail(`Required configuration is unavailable: ${URL_VAR}`);
  if (!key) fail(`Required credential is unavailable: ${WRITE_KEY_VAR}`);

  if (key.startsWith('eyJ')) {
    fail(
      `${WRITE_KEY_VAR} is a legacy JWT key. Legacy keys are disabled on this project. ` +
        'Replace it with the current key from Supabase Dashboard > Project Settings > API Keys.',
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

function publicUrl(objectName) {
  const base = process.env[URL_VAR].replace(/\/$/, '');
  return `${base}/storage/v1/object/public/${BUCKET}/${objectName}`;
}

function readJsonInput(source) {
  if (!source) fail('Expected a JSON file path, or - to read stdin.');
  const raw = source === '-' ? readFileSync(0, 'utf8') : readFileSync(source, 'utf8');
  try {
    return JSON.parse(raw);
  } catch {
    fail('Input is not valid JSON.');
  }
}

function which(bin) {
  const r = spawnSync('which', [bin], { encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

/**
 * Prepare a site-ready JPEG: longest edge capped, ffmpeg q:v quality.
 * Matches existing bucket objects (image/jpeg, ~100–170 KB typical).
 */
function prepare(src, dest, maxEdge = '900', quality = '4') {
  if (!src || !dest) fail('Usage: prepare <src> <dest.jpg> [maxEdge=900] [quality=4]');
  if (!existsSync(src)) fail(`Source not found: ${src}`);
  if (!dest.toLowerCase().endsWith('.jpg') && !dest.toLowerCase().endsWith('.jpeg')) {
    fail('Destination must end in .jpg (bucket convention).');
  }

  mkdirSync(dirname(resolve(dest)), { recursive: true });
  const edge = String(Number(maxEdge) || 900);
  const q = String(Number(quality) || 4);

  const ffmpeg = which('ffmpeg');
  if (ffmpeg) {
    // Cap the longest edge; keep aspect ratio.
    const vf = `scale='min(${edge},iw)':'min(${edge},ih)':force_original_aspect_ratio=decrease`;
    const r = spawnSync(
      ffmpeg,
      ['-y', '-i', src, '-vf', vf, '-q:v', q, dest],
      { encoding: 'utf8' },
    );
    if (r.status !== 0) fail(`ffmpeg failed: ${r.stderr?.split('\n').slice(-3).join(' ')}`);
  } else {
    const sips = which('sips');
    if (!sips) fail('Neither ffmpeg nor sips is available.');
    let r = spawnSync(sips, ['-s', 'format', 'jpeg', src, '--out', dest], { encoding: 'utf8' });
    if (r.status !== 0) fail(`sips convert failed: ${r.stderr || r.stdout}`);
    r = spawnSync(sips, ['-Z', edge, dest], { encoding: 'utf8' });
    if (r.status !== 0) fail(`sips resize failed: ${r.stderr || r.stdout}`);
    // sips formatOptions ~70 ≈ light web JPEG when ffmpeg is missing
    r = spawnSync(sips, ['-s', 'formatOptions', '70', dest], { encoding: 'utf8' });
    if (r.status !== 0) fail(`sips compress failed: ${r.stderr || r.stdout}`);
  }

  const st = spawnSync('ls', ['-la', dest], { encoding: 'utf8' });
  const file = spawnSync('file', [dest], { encoding: 'utf8' });
  console.log(file.stdout.trim());
  console.log(st.stdout.trim());
  console.log(`Prepared ${dest}`);
}

async function resolveByName(supabase, name) {
  const { data, error } = await supabase.from('consultants').select('id, name, order');
  if (error) fail(`Query failed: ${error.message}`);
  const hit = (data ?? []).find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (!hit) fail(`No exact match for: ${name}`);
  return hit;
}

async function uploadOne(filePath, objectName, consultantName) {
  if (!filePath || !objectName) {
    fail('Usage: upload <local.jpg> <objectName.jpg> [--name "Exact Name"]');
  }
  if (!existsSync(filePath)) fail(`File not found: ${filePath}`);
  if (!objectName.toLowerCase().endsWith('.jpg')) {
    fail('Object name must be like 45.jpg (bucket convention).');
  }

  const bytes = readFileSync(filePath);
  if (bytes.length > 400_000) {
    console.warn(
      `Warning: ${objectName} is ${(bytes.length / 1024).toFixed(0)} KB. ` +
        'Existing photos are typically 100–170 KB — consider re-running prepare.',
    );
  }

  const supabase = client();
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(objectName, bytes, {
    contentType: 'image/jpeg',
    upsert: true,
    cacheControl: '3600',
  });
  if (upErr) fail(`Upload failed for ${objectName}: ${upErr.message}`);

  const url = publicUrl(objectName);
  console.log(`Uploaded ${objectName} (${bytes.length} bytes)`);
  console.log(`public_url ${url}`);

  if (consultantName) {
    const row = await resolveByName(supabase, consultantName);
    const { data, error } = await supabase
      .from('consultants')
      .update({ photo_url: url })
      .eq('id', row.id)
      .select('name, photo_url, order')
      .single();
    if (error) fail(`photo_url update failed for "${consultantName}": ${error.message}`);
    console.log(`Updated ${data.name} (order ${data.order}): photo_url set`);
  }
}

async function uploadBatch(source) {
  const entries = readJsonInput(source);
  if (!Array.isArray(entries) || !entries.length) {
    fail('Expected a non-empty JSON array of { file, object, name? }.');
  }

  for (const entry of entries) {
    if (!entry.file || !entry.object) fail('Each entry needs file and object.');
    await uploadOne(entry.file, entry.object, entry.name ?? null);
  }
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'prepare':
    prepare(args[0], args[1], args[2], args[3]);
    break;
  case 'upload': {
    let name = null;
    const positional = [];
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--name') {
        name = args[++i];
      } else {
        positional.push(args[i]);
      }
    }
    await uploadOne(positional[0], positional[1], name);
    break;
  }
  case 'upload-batch':
    await uploadBatch(args[0]);
    break;
  default:
    fail(
      'Usage: photos.mjs <prepare|upload|upload-batch> [args]\n' +
        '  prepare <src> <dest.jpg> [maxEdge] [quality]\n' +
        '  upload <local.jpg> <object.jpg> [--name "Exact Name"]\n' +
        '  upload-batch <manifest.json|->',
    );
}
