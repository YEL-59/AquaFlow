import { containersService } from "./containers.service.js";

export class ContainersController {
  async getCustomerBalance(req, res, next) {
    try {
      const customerId = req.params.customerId || req.user?.id;
      const balance = await containersService.getCustomerBalance(customerId);
      res.status(200).json({
        data: balance,
        message: "Customer container balance retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async recordReturn(req, res, next) {
    try {
      const { customerId, orderId, quantity, hubId, notes } = req.body;
      const agentId = req.user?.id || null;
      const entry = await containersService.recordReturn({
        customerId,
        orderId,
        quantity,
        hubId,
        agentId,
        notes,
      });

      res.status(201).json({
        data: entry,
        message: "Container return recorded successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getLedger(req, res, next) {
    try {
      const { customerId, orderId, eventType, limit } = req.query;
      const entries = await containersService.getLedger({
        customerId,
        orderId,
        eventType,
        limit,
      });

      res.status(200).json({
        data: entries,
        count: entries.length,
        message: "Container ledger entries fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const containersController = new ContainersController();
