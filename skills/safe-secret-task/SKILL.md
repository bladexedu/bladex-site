---
name: safe-secret-task
description: Run development or administrative tasks that require an existing secret or service-role credential without reading, displaying, logging, or embedding its value. Use when a task depends on credentials stored in .env or an environment variable and a reviewed wrapper can consume them opaquely.
---

# Safe Secret Task

Treat every credential as an opaque runtime dependency. Complete the requested task without bringing secret values into model context, tool output, command text, logs, generated files, or chat responses.

## Boundaries

- Never open, read, search, parse, print, echo, copy, summarize, modify, or display `.env` files or secret values.
- Never use commands that expose secret-bearing files or variables, including `cat .env`, `grep` against `.env`, `env`, `printenv`, `set`, shell tracing, or `echo "$SECRET"`.
- Never interpolate a secret into a command, URL, header, process argument, generated source file, patch, test fixture, or diagnostic message.
- Do not ask the user to paste a credential into chat.
- Do not weaken repository protections, ignore rules, or application authorization to gain access to a secret.
- Do not claim that prompting alone creates a security boundary. Prefer least-privilege credentials and a narrow, reviewed execution wrapper.

## Workflow

1. Identify the requested operation and the name of the required environment variable from source code, documentation, or an example file that contains placeholders only. Do not inspect the real secret-bearing file.
2. Look for an existing reviewed command or wrapper that performs only the required operation and loads credentials internally at runtime.
3. Inspect the wrapper's source code without accessing its environment. Confirm that it:
   - reads the credential from the process environment;
   - fails with a generic missing-credential message;
   - never logs, serializes, returns, or includes the credential in errors;
   - avoids shell tracing and verbose HTTP output;
   - performs only the authorized operation.
4. If the wrapper is safe, invoke only its stable entry command, such as `npm run perform-admin-task`. Evaluate its exit status and redacted output.
5. If no wrapper exists and the user asked for implementation, create a narrowly scoped wrapper without reading or testing with the real secret. Have the application load the environment internally; keep the credential out of command arguments.
6. If execution cannot proceed without inspecting or exposing the credential, stop. Tell the user to run the reviewed command from a trusted local terminal and return only the expected non-secret result or redacted failure details.

## Safe implementation shape

Prefer a stable package command:

```json
{
  "scripts": {
    "perform-admin-task": "node --env-file=.env scripts/perform-admin-task.js"
  }
}
```

The application may consume the variable internally:

```js
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error("Required credential is unavailable.");
  process.exit(1);
}

// Use serviceRoleKey internally. Never print or return it.
```

Invoke the wrapper without mentioning the variable value:

```bash
npm run perform-admin-task
```

Avoid shell patterns that read or expand credentials in the agent-controlled command:

```bash
source .env
export $(cat .env | xargs)
echo "$SUPABASE_SERVICE_ROLE_KEY"
node script.js --key="$SUPABASE_SERVICE_ROLE_KEY"
```

## Failure handling

- Report missing credentials by variable name only, never by value.
- Keep HTTP bodies, headers, stack traces, and debug logs redacted when they could contain credentials.
- Do not retry authentication failures repeatedly. Make at most one safe retry when the failure is clearly transient and the retry cannot create duplicate external effects.
- If output unexpectedly contains a credential, do not repeat it. Warn the user that exposure may have occurred and recommend rotating the credential.
- A service-role or administrative key may bypass ordinary authorization controls. Use a narrower credential or backend endpoint when one can perform the requested operation.

## User-facing handoff

State which wrapper command was used, whether the requested operation succeeded, and any non-secret result. If execution was deferred, provide the exact reviewed command for the user to run locally. Never include environment contents or credential values.
