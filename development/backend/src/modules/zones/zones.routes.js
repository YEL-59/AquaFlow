import { Router } from "express";
import { ZonesController } from "./zones.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { checkZoneSchema } from "../../schemas/zone.schema.js";

const router = Router();

router.get("/delivery-zones", ZonesController.getZones);
router.post("/delivery-zones/check", validate(checkZoneSchema), ZonesController.checkCoverage);

export default router;
