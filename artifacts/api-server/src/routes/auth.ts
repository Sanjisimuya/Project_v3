import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db, usersTable, authTokensTable } from "@workspace/db";
import {
  RegisterBody,
  RegisterResponse,
  LoginBody,
  LoginResponse,
  GetCurrentUserResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";
import { generateToken, tokenExpiryDate } from "../lib/tokens";

const router: IRouter = Router();

function toUser(user: { id: number; name: string; email: string }) {
  return { id: user.id, name: user.name, email: user.email };
}

async function issueToken(userId: number): Promise<string> {
  const token = generateToken();
  await db
    .insert(authTokensTable)
    .values({ token, userId, expiresAt: tokenExpiryDate() });
  return token;
}

function extractToken(authorizationHeader: string | undefined): string | null {
  if (!authorizationHeader) return null;
  const [scheme, value] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !value) return null;
  return value;
}

router.post("/auth/register", async (req, res): Promise<void> => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();

  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  const [user] = await db
    .insert(usersTable)
    .values({ name: parsed.data.name.trim(), email, passwordHash })
    .returning();

  if (!user) {
    req.log.error("Failed to create user after insert");
    res.status(500).json({ error: "Failed to create account" });
    return;
  }

  const token = await issueToken(user.id);
  res.status(201).json(RegisterResponse.parse({ ...toUser(user), token }));
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const email = parsed.data.email.trim().toLowerCase();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = await issueToken(user.id);
  res.status(200).json(LoginResponse.parse({ ...toUser(user), token }));
});

router.post("/auth/logout", async (req, res): Promise<void> => {
  const token = extractToken(req.headers.authorization);
  if (token) {
    await db.delete(authTokensTable).where(eq(authTokensTable.token, token));
  }
  res.sendStatus(204);
});

router.get("/auth/me", requireAuth, async (req, res): Promise<void> => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.userId!));

  if (!user) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  res.json(GetCurrentUserResponse.parse(toUser(user)));
});

export default router;
