import { ordersService } from "./orders.service.js";

export class OrdersController {
  async calculateQuote(req, res, next) {
    try {
      const { items, zoneId, emptyJarsToReturn, promoCode } = req.body;
      const quote = await ordersService.calculateQuote({
        items,
        zoneId,
        emptyJarsToReturn,
        promoCode,
      });

      res.status(200).json({
        data: quote,
        message: "Order quote calculated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const {
        items,
        zoneId,
        emptyJarsToReturn,
        promoCode,
        deliveryAddress,
        deliveryFloor,
        contactPhone,
        deliverySlot,
        paymentMethod,
      } = req.body;

      const idempotencyKey =
        req.headers["x-idempotency-key"] || req.body.idempotencyKey;
      const userId = req.user?.id || null;

      const order = await ordersService.createOrder({
        userId,
        items,
        zoneId,
        emptyJarsToReturn,
        promoCode,
        deliveryAddress,
        deliveryFloor,
        contactPhone,
        deliverySlot,
        paymentMethod,
        idempotencyKey,
      });

      res.status(201).json({
        data: order,
        message: "Order created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await ordersService.getOrderById(id);
      res.status(200).json({
        data: order,
        message: "Order details retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const userId = req.user?.id || null;
      const orders = await ordersService.getUserOrders(userId);
      res.status(200).json({
        data: orders,
        count: orders.length,
        message: "User orders retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const order = await ordersService.cancelOrder(id, reason);
      res.status(200).json({
        data: order,
        message: "Order cancelled successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getLiveTracking(req, res, next) {
    try {
      const { id } = req.params;
      const tracking = await ordersService.getLiveTracking(id);
      res.status(200).json({
        data: tracking,
        message: "Live order tracking telemetry retrieved",
      });
    } catch (error) {
      next(error);
    }
  }

  async getFleetTracking(req, res, next) {
    try {
      const fleet = await ordersService.getFleetTracking();
      res.status(200).json({
        data: fleet,
        message: "Dhaka fleet tracking telemetry retrieved",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const ordersController = new OrdersController();
