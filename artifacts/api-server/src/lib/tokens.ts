import crypto from "node:crypto";

export const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function tokenExpiryDate(): Date {
  return new Date(Date.now() + TOKEN_TTL_MS);
}
