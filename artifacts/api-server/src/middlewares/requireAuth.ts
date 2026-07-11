import type { NextFunction, Request, Response } from "express";
import { eq, gt, and } from "drizzle-orm";
import { db, authTokensTable } from "@workspace/db";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, value] = header.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !value) return null;
  return value;
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  const [row] = await db
    .select()
    .from(authTokensTable)
    .where(
      and(
        eq(authTokensTable.token, token),
        gt(authTokensTable.expiresAt, new Date()),
      ),
    );

  if (!row) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  req.userId = row.userId;
  next();
}
