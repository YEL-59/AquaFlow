import { Router } from "express";
import { subscriptionsController } from "./subscriptions.controller.js";
import { authenticateOptional } from "../../middleware/auth.middleware.js";

const router = Router();

// PRD Section 12.4: Subscriptions Engine Endpoints
router.post("/subscriptions", authenticateOptional, (req, res, next) =>
  subscriptionsController.createSubscription(req, res, next)
);
router.get("/subscriptions", authenticateOptional, (req, res, next) =>
  subscriptionsController.getUserSubscriptions(req, res, next)
);
router.get("/subscriptions/:id", authenticateOptional, (req, res, next) =>
  subscriptionsController.getSubscriptionById(req, res, next)
);
router.post("/subscriptions/:id/pause", authenticateOptional, (req, res, next) =>
  subscriptionsController.pauseSubscription(req, res, next)
);
router.post("/subscriptions/:id/resume", authenticateOptional, (req, res, next) =>
  subscriptionsController.resumeSubscription(req, res, next)
);
router.post("/subscriptions/:id/cancel", authenticateOptional, (req, res, next) =>
  subscriptionsController.cancelSubscription(req, res, next)
);
router.post("/subscriptions/worker/trigger", (req, res, next) =>
  subscriptionsController.triggerWorker(req, res, next)
);

export default router;
