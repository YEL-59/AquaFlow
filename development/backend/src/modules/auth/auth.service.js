import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";

function normalizePhone(phone) {
  let cleaned = phone.replace(/[\s-]/g, "");
  if (cleaned.startsWith("01")) {
    cleaned = "+88" + cleaned;
  }
  return cleaned;
}

export class AuthService {
  static async register({ name, phone, email, password, preferredLanguage = "bn" }) {
    const normalizedPhone = normalizePhone(phone);

    // Check existing phone
    const existingUser = await prisma.user.findUnique({
      where: { phone: normalizedPhone },
    });

    if (existingUser) {
      const error = new Error("An account with this phone number already exists");
      error.statusCode = 409;
      error.code = "PHONE_ALREADY_EXISTS";
      throw error;
    }

    // Check existing email if provided
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        const error = new Error("An account with this email address already exists");
        error.statusCode = 409;
        error.code = "EMAIL_ALREADY_EXISTS";
        throw error;
      }
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customerCode = "AQ-" + Math.floor(100000 + Math.random() * 900000);

    // Atomic transaction creating User, Customer profile, and Customer Role
    const user = await prisma.$transaction(async (tx) => {
      // Find or create CUSTOMER role
      let customerRole = await tx.role.findUnique({
        where: { name: "CUSTOMER" },
      });
      if (!customerRole) {
        customerRole = await tx.role.create({
          data: {
            name: "CUSTOMER",
            description: "Standard residential and commercial water customer",
          },
        });
      }

      const newUser = await tx.user.create({
        data: {
          name,
          phone: normalizedPhone,
          email: email || null,
          passwordHash,
          preferredLanguage,
          phoneVerifiedAt: env.NODE_ENV === "development" ? new Date() : null, // auto-verify in dev
          customerProfile: {
            create: {
              customerCode,
              displayName: name,
              customerType: "HOUSEHOLD",
            },
          },
          userRoles: {
            create: {
              roleId: customerRole.id,
            },
          },
        },
        include: {
          customerProfile: true,
          userRoles: {
            include: { role: true },
          },
        },
      });

      return newUser;
    });

    const tokens = this.generateTokens(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        customerId: user.customerProfile?.id,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
      ...tokens,
    };
  }

  static async login({ identifier, password }) {
    const isPhone = identifier.includes("+") || /^[0-9]+$/.test(identifier);
    const normalizedIdentifier = isPhone ? normalizePhone(identifier) : identifier.toLowerCase();

    const user = await prisma.user.findFirst({
      where: isPhone
        ? { phone: normalizedIdentifier }
        : { email: normalizedIdentifier },
      include: {
        customerProfile: true,
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user || !user.passwordHash) {
      const error = new Error("Invalid phone/email or password");
      error.statusCode = 401;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      const error = new Error("Invalid phone/email or password");
      error.statusCode = 401;
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    if (user.status !== "ACTIVE") {
      const error = new Error("Account has been deactivated. Please contact support.");
      error.statusCode = 403;
      error.code = "ACCOUNT_SUSPENDED";
      throw error;
    }

    // Update lastLoginAt
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = this.generateTokens(user);
    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        customerId: user.customerProfile?.id,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
      ...tokens,
    };
  }

  static generateTokens(user) {
    const payload = {
      userId: user.id,
      phone: user.phone,
      roles: user.userRoles ? user.userRoles.map((ur) => ur.role.name) : ["CUSTOMER"],
    };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ userId: user.id }, env.REFRESH_SECRET, {
      expiresIn: env.REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  static async refresh(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          customerProfile: true,
          userRoles: { include: { role: true } },
        },
      });

      if (!user || user.status !== "ACTIVE") {
        const error = new Error("User session no longer valid");
        error.statusCode = 401;
        throw error;
      }

      return this.generateTokens(user);
    } catch (err) {
      const error = new Error("Invalid or expired refresh token");
      error.statusCode = 401;
      error.code = "INVALID_REFRESH_TOKEN";
      throw error;
    }
  }
}
