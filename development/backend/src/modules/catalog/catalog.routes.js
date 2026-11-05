import { Router } from "express";
import { catalogController } from "./catalog.controller.js";

const router = Router();

// PRD Section 12: Catalog Endpoints
router.get("/categories", (req, res, next) => catalogController.getCategories(req, res, next));
router.get("/products", (req, res, next) => catalogController.getProducts(req, res, next));
router.get("/products/:id", (req, res, next) => catalogController.getProductById(req, res, next));
router.post("/products", (req, res, next) => catalogController.createProduct(req, res, next));
router.put("/products/:id", (req, res, next) => catalogController.updateProduct(req, res, next));
router.delete("/products/:id", (req, res, next) => catalogController.deleteProduct(req, res, next));

export default router;
