import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication token is required",
        details: {},
      },
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        customerProfile: true,
      },
    });

    if (!user || user.status !== "ACTIVE") {
      return res.status(401).json({
        error: {
          code: "ACCOUNT_INACTIVE",
          message: "User account is suspended or no longer active",
          details: {},
        },
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      customerId: user.customerProfile?.id || null,
      roles: user.userRoles.map((ur) => ur.role.name),
    };

    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Session token is invalid or has expired",
        details: {},
      },
    });
  }
}

export function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
          details: {},
        },
      });
    }

    const hasPermission = req.user.roles.some((role) =>
      allowedRoles.includes(role) || role === "SUPER_ADMIN"
    );

    if (!hasPermission) {
      return res.status(403).json({
        error: {
          code: "FORBIDDEN",
          message: "Insufficient permissions for this operation",
          details: { requiredRoles: allowedRoles },
        },
      });
    }

    next();
  };
}

export const authenticate = authenticateToken;

export async function authenticateOptional(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = {
      id: decoded.userId || decoded.id || "user-demo-1",
      phone: decoded.phone || null,
      roles: decoded.roles || ["CUSTOMER"],
    };
  } catch (err) {
    req.user = null;
  }
  next();
}

