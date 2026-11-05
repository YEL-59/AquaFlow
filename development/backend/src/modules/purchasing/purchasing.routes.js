import { Router } from "express";
import { purchasingController } from "./purchasing.controller.js";
import { authenticateOptional } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.7: Purchasing & Goods Receipt Endpoints
router.get("/suppliers", authenticateOptional, (req, res, next) =>
  purchasingController.getSuppliers(req, res, next)
);
router.get("/purchasing/orders", authenticateOptional, (req, res, next) =>
  purchasingController.getPurchaseOrders(req, res, next)
);
router.post("/purchasing/orders", authenticateOptional, (req, res, next) =>
  purchasingController.createPurchaseOrder(req, res, next)
);
router.post("/purchasing/grn", authenticateOptional, (req, res, next) =>
  purchasingController.recordGoodsReceipt(req, res, next)
);

export default router;
