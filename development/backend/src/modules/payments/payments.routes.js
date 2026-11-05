import { Router } from "express";
import { paymentsController } from "./payments.controller.js";

export const paymentsRoutes = Router();

// bKash Merchant APIs
paymentsRoutes.post("/bkash/create", (req, res, next) =>
  paymentsController.createBkash(req, res, next)
);
paymentsRoutes.post("/bkash/execute", (req, res, next) =>
  paymentsController.executeBkash(req, res, next)
);
paymentsRoutes.post("/bkash/query", (req, res, next) =>
  paymentsController.queryBkash(req, res, next)
);

// SSLCOMMERZ Gateway APIs
paymentsRoutes.post("/sslcommerz/init", (req, res, next) =>
  paymentsController.initSslcommerz(req, res, next)
);
paymentsRoutes.post("/sslcommerz/validate", (req, res, next) =>
  paymentsController.validateSslcommerz(req, res, next)
);
paymentsRoutes.post("/sslcommerz/ipn", (req, res, next) =>
  paymentsController.handleSslcommerzIpn(req, res, next)
);

export default paymentsRoutes;
