---
name: manage-consultants
description: Add, update, promote, or deactivate BladeX consultants in the live Supabase consultants table, and verify they are reachable through the site's filter paths. Use when onboarding a new consultant, editing a bio or role, removing someone who left, or when the user mentions the consultants table, consultant titles, or consultant search and filters.
---

# Manage BladeX Consultants

Consultant data is **live in Supabase**, not in the repo. Changes take effect
immediately without a deploy. Some display details are still hardcoded in React,
so a data-only change can leave a consultant partly invisible. Always run the
pre-flight checks below before writing.

## Workflow

```
- [ ] 1. Read current roster with the wrapper
- [ ] 2. Duplicate check by name
- [ ] 3. Map intake fields to real columns
- [ ] 4. Verify filter reachability (all four maps)
- [ ] 5. Apply code fixes for any unreachable path
- [ ] 6. Write via the wrapper
- [ ] 7. Re-query to confirm + browser check
- [ ] 8. lint, typecheck, build if code changed
```

## Credentials

Follow the [safe-secret-task](../safe-secret-task/SKILL.md) skill. Never read,
parse, print, or interpolate `.env` or any key value.

The wrapper takes credentials from `process.env` only. `node --env-file=.env`
loads them internally, so the command you issue stays secret-free:

| Purpose | Variable | Loaded by |
|---|---|---|
| Reads | `VITE_SUPABASE_ANON_KEY` | `--env-file=.env` |
| Writes | `SUPABASE_SERVICE_ROLE_KEY` | `--env-file=.env` |

Never hand-roll a script that does `readFileSync('.env')`. That exposes the key
and will be blocked.

Legacy `eyJ…` JWT keys are disabled on this project; the wrapper detects them
and reports the variable name with remediation, never the value. Writes are
shared-state mutations on production data and will require user approval.

## Wrapper commands

Run from the project root. Prefix every call with `node --env-file=.env`.

```bash
S=skills/manage-consultants/scripts/consultants.mjs

node --env-file=.env $S list                    # active roster
node --env-file=.env $S all                     # includes inactive
node --env-file=.env $S get "Shun Le"           # full rows, JSON
node --env-file=.env $S add rows.json           # insert (also accepts -)
node --env-file=.env $S update patches.json     # patch (also accepts -)
node --env-file=.env $S deactivate "Full Name"  # soft delete
node --env-file=.env $S activate "Full Name"    # restore
```

`add` and `update` accept `-` to read JSON from stdin, which avoids temp files:

```bash
cat <<'JSON' | node --env-file=.env $S add -
[{ "name": "…", "bio": "…" }]
JSON
```

`add` defaults `role` to `Educational Consultant`, `photo_url` to null,
`is_active` to true, and auto-assigns `order` as current max + 1.

`update` takes `[{ "name": "Exact Name", "patch": { … } }]` and resolves names
to ids before writing, so it never updates on a loose filter.

`deactivate` is the only removal path. Never hard delete.

## Real schema

`entities/Consultant.json` is **stale** — trust this list.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `name` | text | Nicknames live inline: `Win Soe Moe @ Dennis` |
| `role` | text | See roles below |
| `bio` | text | Single paragraph, third person |
| `photo_url` | text | Supabase Storage `consultant-photos` bucket |
| `booking_url` | text | Calendly link |
| `current_studies` | text | `University — Degree` |
| `current_occupation` | text | Often null |
| `country_of_expertise` | text | Comma-separated string, drives destination filter |
| `area_of_expertise` | text[] | What they help with |
| `major_subject_expertise` | text[] | Subjects, drives area filter |
| `region` | text | **null on every row** — unused |
| `is_active` | boolean | false = hidden from site |
| `order` | number | Sort order |
| `created_at` | timestamptz | |

**There is no email column and no start-date column.** Intake spreadsheets
usually include both — they have nowhere to go. Do not invent columns.

Roles in use: `Educational Consultant`, `Senior Educational Consultant`,
`Lead Educational Consultant`. Default new hires to `Educational Consultant`
unless told otherwise.

[`src/hooks/useConsultants.js`](../../src/hooks/useConsultants.js) fetches
`is_active = true` ordered by `order` with `.limit(50)`. Raise that limit before
active headcount reaches 50.

## Filter reachability

A consultant can exist, be active, and still be unreachable. Check all four.
The first three live in
[`src/pages/Consultants.jsx`](../../src/pages/Consultants.jsx), the fourth in
[`src/components/consultants/ConsultantCard.jsx`](../../src/components/consultants/ConsultantCard.jsx).

**`DESTINATION_MAP`** — matched against `country_of_expertise` with word-boundary
regex. Because `region` is null everywhere, `country_of_expertise` is the only
input. A country not in the keyword list is invisible under every destination.
Add new countries to the right bucket.

**`AREA_MAP`** — matched against `major_subject_expertise` via
`subjectMatchesStudyKeyword`. Keywords longer than 4 chars use plain
`String.includes`, so **punctuation and phrasing must match exactly**:
`medical related` will not match `Medical-Related`. Either normalize the data or
add the variant keyword. Short keywords (≤4 chars) use word-boundary regex.
`healthcare` requires an exact whole-value match. `engineering` deliberately
excludes `software engineering`, which belongs to Computer Science & IT.

**`DEGREE_TAG_MAP`** — matched against `area_of_expertise` and
`major_subject_expertise` joined together, so phrasing like
`Foundation Program Preparation` satisfies Pre-University here even when it
fails the `AREA_MAP` picker. These two can legitimately disagree.

**`LOCATION_MAP`** — hardcoded object keyed by **lowercase full name**. Controls
the 📍 chip on the card. A missing entry means no location shows. Always add one
for a new consultant.

Also check `AREA_FILTER_EXCLUDES` in `Consultants.jsx` — a per-area name
blocklist that hides someone from a specific area picker while keeping the
subject on their card.

## Verification

After a write, re-run `get` to confirm the value landed. If code changed, run
`npm run lint && npm run typecheck && npm run build`.

For UI-affecting changes, check the live page with the playwright skill: browse
all consultants, search the new name, confirm the card renders with role,
location chip, and bio, then confirm each intended destination and area filter
returns them.

## Gotchas

- Photos are uploaded separately to the `consultant-photos` bucket via the
  [consultant-photos](../consultant-photos/SKILL.md) skill. A row with
  `photo_url: null` still renders — the card falls back gracefully — but every
  existing row has one, so flag it as follow-up rather than silently shipping.
- Names are matched by exact lowercase string in `LOCATION_MAP`, so a later
  rename silently drops the location chip.
- Watch for near-duplicate names before inserting. `Tayza Thiha` and
  `Tay Za Aung` are different people.
- Keep intake bio text verbatim unless the user explicitly approves edits. Ask
  before fixing typos; they may be intentional.
