import { Router } from "express";
import { ordersController } from "./orders.controller.js";
import { authenticateOptional, authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.3: Order Lifecycle Endpoints
router.post("/orders/quote", (req, res, next) => ordersController.calculateQuote(req, res, next));
router.post("/orders", authenticateOptional, (req, res, next) => ordersController.createOrder(req, res, next));
router.get("/orders", authenticateOptional, (req, res, next) => ordersController.getUserOrders(req, res, next));
router.get("/orders/:id", authenticateOptional, (req, res, next) => ordersController.getOrderById(req, res, next));
router.get("/orders/:id/live-tracking", (req, res, next) => ordersController.getLiveTracking(req, res, next));
router.get("/fleet/live-tracking", (req, res, next) => ordersController.getFleetTracking(req, res, next));
router.post("/orders/:id/cancel", authenticateOptional, (req, res, next) => ordersController.cancelOrder(req, res, next));

export default router;
