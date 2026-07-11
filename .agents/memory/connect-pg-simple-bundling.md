---
name: connect-pg-simple + esbuild bundling
description: createTableIfMissing silently fails when the server is bundled with esbuild, breaking all session persistence.
---

When using `connect-pg-simple` as an Express session store in a service whose build step bundles with esbuild (e.g. this project's api-server `build.mjs`), do not rely on the package's `createTableIfMissing: true` option.

**Why:** `connect-pg-simple` reads a bundled `table.sql` asset file by relative path at runtime. esbuild bundles the JS but does not copy that non-JS asset into `dist/`, so the read throws `ENOENT` on every session store operation. The failure is silent from the HTTP client's point of view — register/login endpoints still return 200/201 because the app code doesn't await/check the store error — but the session is never actually persisted, so every subsequent request (e.g. `GET /me`) looks logged-out. This is a nasty one to diagnose because typecheck, build, and the auth endpoints all appear to succeed.

**How to apply:** In `session.ts`, set `createTableIfMissing: false` and instead run the store's `table.sql` CREATE TABLE statement yourself against the pg pool at startup (idempotent `CREATE TABLE IF NOT EXISTS "session" (...)` + `CREATE INDEX IF NOT EXISTS`), awaited before `app.listen`. Applies to any esbuild-bundled Node service using this pattern, not just this specific app.
