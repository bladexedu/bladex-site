---
name: consultant-photos
description: Convert, compress, upload, and attach BladeX consultant headshots to the Supabase consultant-photos bucket and consultants.photo_url. Use when adding or replacing consultant photos, preparing images for the consultants page, or when the user mentions consultant headshots, photo uploads, or the consultant-photos storage folder.
---

# Consultant Photos

Photos live in the public Supabase Storage bucket **`consultant-photos`**, not in
the repo. Each active consultant’s `photo_url` points at
`{SUPABASE_URL}/storage/v1/object/public/consultant-photos/{order}.jpg`.

## Workflow

```
- [ ] 1. Confirm consultant name + order via manage-consultants get
- [ ] 2. Confirm which source file belongs to which person
- [ ] 3. prepare → compressed JPEG named {order}.jpg
- [ ] 4. upload with --name so photo_url is set
- [ ] 5. Re-get the row; curl -sI the public URL (expect 200 image/jpeg)
- [ ] 6. Browser-check /consultants for that card’s photo
```

## Bucket convention

| Rule | Value |
|---|---|
| Bucket | `consultant-photos` (public) |
| Object name | `{order}.jpg` — matches `consultants.order` |
| Format | **JPEG only** (not webp/png in this bucket) |
| Target size | longest edge ≤ 900px, roughly **80–170 KB** |
| Content-Type | `image/jpeg` |

Do not convert to webp. Existing objects are JPEG; the UI and optional
transforms expect that path shape.

## Credentials

Follow [safe-secret-task](../safe-secret-task/SKILL.md). Never read, parse,
print, or interpolate `.env` or any key value.

| Purpose | Variable | Loaded by |
|---|---|---|
| Project URL | `VITE_SUPABASE_URL` | `--env-file=.env` |
| Uploads + `photo_url` writes | `SUPABASE_SERVICE_ROLE_KEY` | `--env-file=.env` |

Roster reads/updates for non-photo fields still use
[manage-consultants](../manage-consultants/SKILL.md).

## Wrapper commands

Run from the project root:

```bash
P=skills/consultant-photos/scripts/photos.mjs
S=skills/manage-consultants/scripts/consultants.mjs

# Look up order + current photo_url
node --env-file=.env $S get "Exact Name"

# Convert + compress any source image → bucket-ready JPEG
node --env-file=.env $P prepare ./raw/photo.png ./tmp/45.jpg
# optional: maxEdge (default 900), ffmpeg -q:v (default 4)
node --env-file=.env $P prepare ./raw/photo.png ./tmp/45.jpg 900 4

# Upload and attach to the row
node --env-file=.env $P upload ./tmp/45.jpg 45.jpg --name "Exact Name"

# Or batch
cat <<'JSON' | node --env-file=.env $P upload-batch -
[
  { "file": "./tmp/45.jpg", "object": "45.jpg", "name": "Manead Khin" },
  { "file": "./tmp/46.jpg", "object": "46.jpg", "name": "Shwe Wady" }
]
JSON
```

`prepare` prefers **ffmpeg**; falls back to **sips** on macOS. `upload` upserts
the object and, when `--name` is set, patches `consultants.photo_url` to the
public URL.

## Naming

Object names follow **`order`**, not a slug of the person’s name:

| Example | order | object |
|---|---|---|
| Manead Khin | 45 | `45.jpg` |
| Shwe Wady | 46 | `46.jpg` |
| Tay Za Aung | 47 | `47.jpg` |

Always confirm `order` with `get` before uploading. Replacing a photo: prepare
again and `upload` the same `{order}.jpg` (upsert) — `photo_url` can stay as-is
if it already points at that object.

## Verification

```bash
node --env-file=.env $S get "Exact Name"
curl -sI "$PHOTO_URL" | head -5   # 200 + content-type: image/jpeg
```

On `/consultants`, search the name and confirm the avatar loads (card + profile
dialog). No React change is required when only `photo_url` changes.

## Gotchas

- A row with `photo_url: null` still renders (fallback), but every established
  consultant should have a photo — treat missing photos as incomplete onboarding.
- `Tayza Thiha` and `Tay Za Aung` are different people; match names exactly.
- Keep prepared files out of git (`tmp/` is fine as a local staging area).
- Warn if a prepared file exceeds ~400 KB before upload.
- Photo work is separate from filter maps (`LOCATION_MAP`, etc.); those still
  belong to manage-consultants.
