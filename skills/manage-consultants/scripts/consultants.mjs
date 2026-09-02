/**
 * Consultant admin wrapper for the BladeX Supabase `consultants` table.
 *
 * Credentials are consumed from process.env only. This file never reads .env,
 * never logs a credential, and never places one in a command argument. Node
 * loads the env file via --env-file, so the caller's command stays secret-free.
 *
 *   node --env-file=.env skills/manage-consultants/scripts/consultants.mjs <command>
 *
 * Commands:
 *   list                       Active roster summary
 *   all                        Roster summary including inactive
 *   get <name-fragment>        Full rows matching a name fragment
 *   add <file|->               Insert rows from a JSON array (file or stdin)
 *   update <file|->            Patch rows from [{ name, patch }] (file or stdin)
 *   deactivate <name>...       Soft delete by exact name (case-insensitive)
 *   activate <name>...         Restore by exact name (case-insensitive)
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

const URL_VAR = 'VITE_SUPABASE_URL';
const READ_KEY_VAR = 'VITE_SUPABASE_ANON_KEY';
const WRITE_KEY_VAR = 'SUPABASE_SERVICE_ROLE_KEY';

const SUMMARY_FIELDS = 'name, role, country_of_expertise, is_active, order';
const FULL_FIELDS =
  'id, name, role, bio, photo_url, booking_url, current_studies, current_occupation, ' +
  'country_of_expertise, area_of_expertise, major_subject_expertise, region, is_active, order';

function fail(message) {
  console.error(message);
  process.exit(1);
}

/** Builds a client from the environment. Reports missing vars by name only. */
function client({ write = false } = {}) {
  const keyVar = write ? WRITE_KEY_VAR : READ_KEY_VAR;
  const url = process.env[URL_VAR];
  const key = process.env[keyVar];

  if (!url) fail(`Required configuration is unavailable: ${URL_VAR}`);
  if (!key) fail(`Required credential is unavailable: ${keyVar}`);

  if (key.startsWith('eyJ')) {
    fail(
      `${keyVar} is a legacy JWT key. Legacy keys are disabled on this project. ` +
      'Replace it with the current key from Supabase Dashboard > Project Settings > API Keys.',
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
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

function printSummary(rows) {
  for (const r of rows) {
    const flag = r.is_active ? '' : ' [inactive]';
    console.log(`${String(r.order ?? '-').padStart(3)}  ${r.name} | ${r.role} | ${r.country_of_expertise ?? '-'}${flag}`);
  }
  console.log(`\n${rows.length} row(s)`);
}

async function list({ includeInactive = false } = {}) {
  const supabase = client();
  let query = supabase.from('consultants').select(SUMMARY_FIELDS).order('order');
  if (!includeInactive) query = query.eq('is_active', true);
  const { data, error } = await query;
  if (error) fail(`Query failed: ${error.message}`);
  printSummary(data ?? []);
}

async function get(fragment) {
  if (!fragment) fail('Expected a name fragment.');
  const supabase = client();
  const { data, error } = await supabase
    .from('consultants')
    .select(FULL_FIELDS)
    .ilike('name', `%${fragment}%`);
  if (error) fail(`Query failed: ${error.message}`);
  if (!data?.length) fail(`No consultant matches "${fragment}".`);
  console.log(JSON.stringify(data, null, 2));
}

async function resolveByName(supabase, names) {
  const { data, error } = await supabase.from('consultants').select('id, name');
  if (error) fail(`Query failed: ${error.message}`);

  const byLower = new Map((data ?? []).map((c) => [c.name.toLowerCase(), c]));
  const resolved = [];
  const missing = [];

  for (const name of names) {
    const hit = byLower.get(name.toLowerCase());
    if (hit) resolved.push(hit);
    else missing.push(name);
  }

  if (missing.length) fail(`No exact match for: ${missing.join(', ')}`);
  return resolved;
}

async function add(source) {
  const rows = readJsonInput(source);
  if (!Array.isArray(rows) || !rows.length) fail('Expected a non-empty JSON array of rows.');

  const supabase = client({ write: true });
  const { data: existing, error: readErr } = await supabase
    .from('consultants')
    .select('name, order');
  if (readErr) fail(`Query failed: ${readErr.message}`);

  const taken = new Set((existing ?? []).map((c) => c.name.toLowerCase()));
  const dupes = rows.filter((r) => taken.has(String(r.name ?? '').toLowerCase()));
  if (dupes.length) fail(`Already present: ${dupes.map((r) => r.name).join(', ')}`);

  let nextOrder = Math.max(0, ...(existing ?? []).map((c) => c.order ?? 0));
  const prepared = rows.map((r) => ({
    role: 'Educational Consultant',
    photo_url: null,
    is_active: true,
    ...r,
    order: r.order ?? ++nextOrder,
  }));

  const { data, error } = await supabase
    .from('consultants')
    .insert(prepared)
    .select(SUMMARY_FIELDS);
  if (error) fail(`Insert failed: ${error.message}`);

  console.log(`Inserted ${data.length} row(s):`);
  printSummary(data);
}

async function update(source) {
  const entries = readJsonInput(source);
  if (!Array.isArray(entries) || !entries.length) {
    fail('Expected a non-empty JSON array of { name, patch } objects.');
  }

  const supabase = client({ write: true });
  const resolved = await resolveByName(supabase, entries.map((e) => e.name));
  const idByLower = new Map(resolved.map((c) => [c.name.toLowerCase(), c.id]));

  for (const entry of entries) {
    if (!entry.patch || typeof entry.patch !== 'object') {
      fail(`Missing patch object for "${entry.name}".`);
    }
    const id = idByLower.get(entry.name.toLowerCase());
    const { data, error } = await supabase
      .from('consultants')
      .update(entry.patch)
      .eq('id', id)
      .select('name')
      .single();
    if (error) fail(`Update failed for "${entry.name}": ${error.message}`);
    console.log(`Updated ${data.name}: ${Object.keys(entry.patch).join(', ')}`);
  }
}

async function setActive(names, isActive) {
  if (!names.length) fail('Expected at least one consultant name.');

  const supabase = client({ write: true });
  const resolved = await resolveByName(supabase, names);
  const { data, error } = await supabase
    .from('consultants')
    .update({ is_active: isActive })
    .in('id', resolved.map((c) => c.id))
    .select('name, is_active');
  if (error) fail(`Update failed: ${error.message}`);

  for (const c of data) console.log(`${c.name}: is_active=${c.is_active}`);
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case 'list':       await list(); break;
  case 'all':        await list({ includeInactive: true }); break;
  case 'get':        await get(args[0]); break;
  case 'add':        await add(args[0]); break;
  case 'update':     await update(args[0]); break;
  case 'deactivate': await setActive(args, false); break;
  case 'activate':   await setActive(args, true); break;
  default:
    fail('Usage: consultants.mjs <list|all|get|add|update|deactivate|activate> [args]');
}
