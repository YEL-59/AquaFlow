import { inventoryService } from "./inventory.service.js";

export class InventoryController {
  async getLocations(req, res, next) {
    try {
      const locations = await inventoryService.getLocations();
      res.status(200).json({
        data: locations,
        message: "Inventory locations fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getStock(req, res, next) {
    try {
      const { locationId, productId } = req.query;
      const stock = await inventoryService.getStock({ locationId, productId });
      res.status(200).json({
        data: stock,
        count: stock.length,
        message: "Stock levels fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async transferStock(req, res, next) {
    try {
      const {
        sourceLocationId,
        destinationLocationId,
        productId,
        quantity,
        stockType,
        referenceNote,
      } = req.body;

      const result = await inventoryService.transferStock({
        sourceLocationId,
        destinationLocationId,
        productId,
        quantity,
        stockType,
        referenceNote,
      });

      res.status(200).json({
        data: result,
        message: "Stock transferred successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getMovements(req, res, next) {
    try {
      const { locationId, limit } = req.query;
      const movements = await inventoryService.getMovements({
        locationId,
        limit,
      });
      res.status(200).json({
        data: movements,
        count: movements.length,
        message: "Stock movements fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const inventoryController = new InventoryController();
