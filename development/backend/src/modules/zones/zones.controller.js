import { ZonesService } from "./zones.service.js";

export class ZonesController {
  static async getZones(req, res, next) {
    try {
      const zones = await ZonesService.getAllZones();
      res.status(200).json({
        success: true,
        data: zones,
      });
    } catch (err) {
      next(err);
    }
  }

  static async checkCoverage(req, res, next) {
    try {
      const result = await ZonesService.checkCoverage(req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}
