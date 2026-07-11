import session from "express-session";
import createPgSessionStore from "connect-pg-simple";
import { pool } from "@workspace/db";

const PgSessionStore = createPgSessionStore(session);

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error(
    "SESSION_SECRET must be set. Did you forget to configure the secret?",
  );
}

// connect-pg-simple's createTableIfMissing reads a bundled table.sql file by
// relative path, which does not survive esbuild bundling into dist/. Create
// the table ourselves instead so session persistence doesn't silently break.
export async function ensureSessionTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
    );
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
  `);
}

export const sessionMiddleware = session({
  store: new PgSessionStore({
    pool,
    tableName: "session",
    createTableIfMissing: false,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
});

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
