import { Router } from "express";
import { inventoryController } from "./inventory.controller.js";
import { authenticateOptional } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.6: Multi-Location Inventory Endpoints
router.get("/inventory/locations", authenticateOptional, (req, res, next) =>
  inventoryController.getLocations(req, res, next)
);
router.get("/inventory/stock", authenticateOptional, (req, res, next) =>
  inventoryController.getStock(req, res, next)
);
router.post("/inventory/transfer", authenticateOptional, (req, res, next) =>
  inventoryController.transferStock(req, res, next)
);
router.get("/inventory/movements", authenticateOptional, (req, res, next) =>
  inventoryController.getMovements(req, res, next)
);

export default router;
