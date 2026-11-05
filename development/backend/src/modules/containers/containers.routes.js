import { Router } from "express";
import { containersController } from "./containers.controller.js";
import { authenticateOptional } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.5: Reusable Container Ledger Endpoints
router.get("/containers/balance/:customerId", authenticateOptional, (req, res, next) =>
  containersController.getCustomerBalance(req, res, next)
);
router.post("/containers/return", authenticateOptional, (req, res, next) =>
  containersController.recordReturn(req, res, next)
);
router.get("/containers/ledger", authenticateOptional, (req, res, next) =>
  containersController.getLedger(req, res, next)
);

export default router;
