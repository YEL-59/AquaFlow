import { subscriptionsService } from "./subscriptions.service.js";

export class SubscriptionsController {
  async createSubscription(req, res, next) {
    try {
      const userId = req.user?.id || null;
      const sub = await subscriptionsService.createSubscription({
        ...req.body,
        userId,
      });

      res.status(201).json({
        data: sub,
        message: "Recurring subscription created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserSubscriptions(req, res, next) {
    try {
      const userId = req.user?.id || null;
      const subs = await subscriptionsService.getUserSubscriptions(userId);
      res.status(200).json({
        data: subs,
        count: subs.length,
        message: "Subscriptions retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getSubscriptionById(req, res, next) {
    try {
      const { id } = req.params;
      const sub = await subscriptionsService.getSubscriptionById(id);
      res.status(200).json({
        data: sub,
        message: "Subscription details retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async pauseSubscription(req, res, next) {
    try {
      const { id } = req.params;
      const { pauseStartDate, pauseEndDate, reason } = req.body;
      const sub = await subscriptionsService.pauseSubscription(id, {
        pauseStartDate,
        pauseEndDate,
        reason,
      });
      res.status(200).json({
        data: sub,
        message: "Subscription paused successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resumeSubscription(req, res, next) {
    try {
      const { id } = req.params;
      const sub = await subscriptionsService.resumeSubscription(id);
      res.status(200).json({
        data: sub,
        message: "Subscription resumed successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const sub = await subscriptionsService.cancelSubscription(id, reason);
      res.status(200).json({
        data: sub,
        message: "Subscription cancelled successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async triggerWorker(req, res, next) {
    try {
      const { targetDate } = req.body;
      const result = await subscriptionsService.runDailyGenerationWorker(targetDate);
      res.status(200).json({
        data: result,
        message: "Daily recurring orders generation worker executed successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const subscriptionsController = new SubscriptionsController();
