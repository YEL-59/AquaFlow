import { Router } from "express";
import { contentController } from "./content.controller.js";

const router = Router();

router.get("/content", (req, res, next) => contentController.getContent(req, res, next));
router.put("/content", (req, res, next) => contentController.updateContent(req, res, next));

export default router;
