import { z } from "zod";

export const createExpenseSchema = z.object({
  categoryId: z.string().uuid("Invalid expense category ID"),
  amount: z.number().positive("Expense amount must be positive"),
  currency: z.literal("BDT").default("BDT"),
  expenseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  supplierId: z.string().uuid().optional().nullable(),
  description: z.string().min(3, "Description is required"),
});

export const journalLineSchema = z.object({
  financialAccountId: z.string().uuid("Invalid financial account ID"),
  debit: z.number().nonnegative().default(0),
  credit: z.number().nonnegative().default(0),
});

export const postJournalEntrySchema = z
  .object({
    entryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
    referenceType: z.enum(["ORDER", "EXPENSE", "DEPOSIT", "REVERSAL", "MANUAL"]),
    referenceId: z.string().optional().nullable(),
    description: z.string().min(5, "Description is required"),
    lines: z.array(journalLineSchema).min(2, "Journal entry requires at least two lines"),
  })
  .refine(
    (data) => {
      const totalDebit = data.lines.reduce((sum, line) => sum + (line.debit || 0), 0);
      const totalCredit = data.lines.reduce((sum, line) => sum + (line.credit || 0), 0);
      return Math.abs(totalDebit - totalCredit) < 0.001;
    },
    {
      message: "Balanced Journal Error: Total debits must equal total credits",
      path: ["lines"],
    }
  );

export const reconcileCashSchema = z.object({
  driverUserId: z.string().uuid("Invalid driver user ID"),
  shiftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  expectedAmount: z.number().nonnegative(),
  collectedAmount: z.number().nonnegative(),
  notes: z.string().optional().nullable(),
});
