# BladeX Education

## Project

BladeX Education is a React/Vite site for advising Myanmar students who want to
study abroad. The site also includes the BladeX AI & Technology division.

## Development

- Run commands from this directory.
- Use `npm run dev` for local development.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before handing off
  meaningful changes.
- Keep the existing React, Tailwind, and Vite architecture unless a change
  clearly requires otherwise.

## Implementation rules

- Reuse existing components, styles, assets, and page conventions before adding
  new abstractions.
- Keep education-site visuals and BladeX AI visuals intentionally distinct.
- Preserve responsive behavior and accessible labels, links, and controls.
- Do not commit secrets, local environment files, generated build output, or
  credentials. Use `.env.example` when documenting configuration.
- Treat content, external links, contact details, and branding as user-owned
  product decisions; ask Khun before changing them materially.

## Skills

Internal agent skills live in `skills/` at the project root. That directory is
**gitignored** and is not part of the public repo.

- Before BladeX admin or consultant work, inspect local `skills/` and load each
  `SKILL.md` that matches the task.
- Read the complete matching skill and its required scripts or references before
  taking action.
- Do not commit `skills/` or any credentials the wrappers consume from `.env`.

## Verification

For UI changes, verify the affected route in a real browser at desktop and mobile
widths when practical. Check the browser console, navigation, images, and primary
interactions in addition to automated checks.

## Context and memory

Use the surrounding Reinbot workspace for durable user and project context. Keep
project-local notes factual, concise, and free of secrets. Do not write durable
memory or modify unrelated workspace files without Khun's approval.
