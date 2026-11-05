import { catalogService } from "./catalog.service.js";

export class CatalogController {
  async getCategories(req, res, next) {
    try {
      const categories = await catalogService.getCategories();
      res.status(200).json({
        data: categories,
        message: "Categories fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const { category, search, subscriptionOnly } = req.query;
      const products = await catalogService.getProducts({
        category,
        search,
        subscriptionOnly,
      });
      res.status(200).json({
        data: products,
        count: products.length,
        message: "Products fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await catalogService.getProductById(id);
      res.status(200).json({
        data: product,
        message: "Product details fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await catalogService.createProduct(req.body);
      res.status(201).json({
        data: newProduct,
        message: "Product created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await catalogService.updateProduct(id, req.body);
      res.status(200).json({
        data: updated,
        message: "Product updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await catalogService.deleteProduct(id);
      res.status(200).json({
        data: result,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const catalogController = new CatalogController();
