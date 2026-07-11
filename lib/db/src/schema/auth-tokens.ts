import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

// Opaque bearer tokens for authentication. We do not rely on cookies for
// session state because Replit Autoscale deployments sit behind a Google
// Frontend proxy that strips the application's own Set-Cookie header and
// replaces it with its own session-affinity cookie (GAESA) -- our cookie
// never reaches the browser in production. Tokens sent via the
// Authorization header are unaffected by that proxy behavior.
export const authTokensTable = pgTable("auth_tokens", {
  token: text("token").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export type AuthToken = typeof authTokensTable.$inferSelect;
