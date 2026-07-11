import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, transactionsTable } from "@workspace/db";
import {
  ListTransactionsResponse,
  CreateTransactionBody,
  CreateTransactionResponse,
  DeleteTransactionParams,
} from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.use(requireAuth);

router.get("/transactions", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, req.userId!))
    .orderBy(desc(transactionsTable.occurredAt));

  res.json(ListTransactionsResponse.parse(rows));
});

router.post("/transactions", async (req, res): Promise<void> => {
  const parsed = CreateTransactionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [transaction] = await db
    .insert(transactionsTable)
    .values({
      userId: req.userId!,
      title: parsed.data.title.trim(),
      category: parsed.data.category,
      amount: parsed.data.amount,
      note: parsed.data.note?.trim() || null,
    })
    .returning();

  if (!transaction) {
    req.log.error("Failed to create transaction after insert");
    res.status(500).json({ error: "Failed to create transaction" });
    return;
  }

  res.status(201).json(CreateTransactionResponse.parse(transaction));
});

router.delete("/transactions/:id", async (req, res): Promise<void> => {
  const params = DeleteTransactionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(transactionsTable)
    .where(
      and(
        eq(transactionsTable.id, params.data.id),
        eq(transactionsTable.userId, req.userId!),
      ),
    )
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Transaction not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
