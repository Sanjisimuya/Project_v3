import { setAuthTokenGetter } from '@workspace/api-client-react';

// Replit Autoscale deployments run behind a proxy that strips the app's own
// Set-Cookie header, so cookie-based sessions never reach the browser in
// production. We authenticate with a bearer token instead, persisted in
// localStorage and attached to every API request via setAuthTokenGetter.
const STORAGE_KEY = 'dompetku_token';

let token: string | null = null;
try {
  token = localStorage.getItem(STORAGE_KEY);
} catch {
  token = null;
}

setAuthTokenGetter(() => token);

export function getToken(): string | null {
  return token;
}

export function setToken(newToken: string): void {
  token = newToken;
  try {
    localStorage.setItem(STORAGE_KEY, newToken);
  } catch {
    // ignore storage failures (e.g. private browsing)
  }
}

export function clearToken(): void {
  token = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage failures
  }
}
