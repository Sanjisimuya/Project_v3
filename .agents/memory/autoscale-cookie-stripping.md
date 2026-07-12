---
name: Autoscale strips Set-Cookie (use bearer tokens)
description: Replit Autoscale deployments proxy through infra that strips the app's own Set-Cookie header, breaking cookie-based sessions in production only.
---

Replit **Autoscale** deployments sit behind a proxy (observed as a Google
Frontend layer) that strips the app's own `Set-Cookie` response header
entirely and replaces it with its own `GAESA` session-affinity cookie. The
app's login/auth endpoint returns 200, but the session cookie never reaches
the browser, so any subsequent request that depends on that cookie (e.g.
`/api/auth/me`) comes back unauthenticated. This only reproduces in
production on Autoscale — the same cookie-based flow works fine on the dev
domain and is not documented in Replit's docs.

**Why:** Diagnosed after a user reported "can't log in" only in production
(dev worked). Confirmed via direct curl against the deployed URL: the
`Set-Cookie` header from the app was simply absent in the response actually
received by the client, replaced by `GAESA=...`.

**How to apply:** For any auth that must survive an Autoscale deployment,
do not rely on cookie-based sessions (express-session, connect-pg-simple,
etc.). Use an opaque bearer token instead: issue a token on login/register,
have the client store it (e.g. localStorage) and send it via the
`Authorization: Bearer <token>` header on every request. This travels in a
normal header, not a cookie, so the proxy cannot strip it. Works identically
in dev and prod regardless of deployment target.
