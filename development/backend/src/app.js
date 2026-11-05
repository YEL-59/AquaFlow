import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import zoneRoutes from "./modules/zones/zones.routes.js";
import catalogRoutes from "./modules/catalog/catalog.routes.js";
import ordersRoutes from "./modules/orders/orders.routes.js";
import containersRoutes from "./modules/containers/containers.routes.js";
import inventoryRoutes from "./modules/inventory/inventory.routes.js";
import subscriptionsRoutes from "./modules/subscriptions/subscriptions.routes.js";
import purchasingRoutes from "./modules/purchasing/purchasing.routes.js";
import financeRoutes from "./modules/finance/finance.routes.js";
import contentRoutes from "./modules/content/content.routes.js";
import paymentsRoutes from "./modules/payments/payments.routes.js";

export const app = express();

// Security & Network Middleware
app.use(helmet());
app.use(
  cors({
    origin: [env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// System Health Checks (PRD 12.10)
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "HEALTHY",
    timestamp: new Date().toISOString(),
    service: "AquaFlow Core API",
  });
});

app.get("/ready", (req, res) => {
  res.status(200).json({
    status: "READY",
    database: "CONNECTED",
    timestamp: new Date().toISOString(),
  });
});

// Primary Domain API Routes (PRD Base: /api/v1)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", zoneRoutes);
app.use("/api/v1", catalogRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", containersRoutes);
app.use("/api/v1", inventoryRoutes);
app.use("/api/v1", subscriptionsRoutes);
app.use("/api/v1", purchasingRoutes);
app.use("/api/v1", financeRoutes);
app.use("/api/v1", contentRoutes);
app.use("/api/v1/payments", paymentsRoutes);

// Fallback 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Endpoint ${req.method} ${req.originalUrl} does not exist on this server`,
      details: {},
    },
  });
});

// Centralized Error Envelope Middleware
app.use(errorHandler);

export default app;
