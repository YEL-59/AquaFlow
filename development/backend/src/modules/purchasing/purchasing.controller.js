import { purchasingService } from "./purchasing.service.js";

export class PurchasingController {
  async getSuppliers(req, res, next) {
    try {
      const suppliers = await purchasingService.getSuppliers();
      res.status(200).json({
        data: suppliers,
        message: "Suppliers fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPurchaseOrders(req, res, next) {
    try {
      const orders = await purchasingService.getPurchaseOrders();
      res.status(200).json({
        data: orders,
        count: orders.length,
        message: "Purchase orders fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createPurchaseOrder(req, res, next) {
    try {
      const { supplierId, targetLocationId, items } = req.body;
      const order = await purchasingService.createPurchaseOrder({
        supplierId,
        targetLocationId,
        items,
      });

      res.status(201).json({
        data: order,
        message: "Purchase order created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async recordGoodsReceipt(req, res, next) {
    try {
      const {
        poNumber,
        receivedItems,
        inspectorName,
        batchNumber,
        bstiVerified,
      } = req.body;

      const result = await purchasingService.recordGoodsReceipt({
        poNumber,
        receivedItems,
        inspectorName,
        batchNumber,
        bstiVerified,
      });

      res.status(201).json({
        data: result,
        message: "Goods receipt note recorded and stock updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const purchasingController = new PurchasingController();
