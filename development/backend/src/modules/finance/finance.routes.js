import { Router } from "express";
import { financeController } from "./finance.controller.js";
import { authenticateOptional } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.8: Finance, Accounting & Balanced Journals
router.get("/finance/accounts", authenticateOptional, (req, res, next) =>
  financeController.getAccounts(req, res, next)
);
router.post("/finance/journals", authenticateOptional, (req, res, next) =>
  financeController.postJournal(req, res, next)
);
router.get("/finance/journals", authenticateOptional, (req, res, next) =>
  financeController.getJournals(req, res, next)
);
router.post("/finance/expenses", authenticateOptional, (req, res, next) =>
  financeController.recordExpense(req, res, next)
);
router.get("/finance/reports/pnl", authenticateOptional, (req, res, next) =>
  financeController.getProfitAndLoss(req, res, next)
);

export default router;
