import { AuthService } from "./auth.service.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export class AuthController {
  static async register(req, res, next) {
    try {
      const result = await AuthService.register(req.body);
      res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
      res.status(201).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
        message: "Customer registered successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await AuthService.login(req.body);
      res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
        message: "Logged in successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          error: {
            code: "NO_REFRESH_TOKEN",
            message: "Refresh token is missing",
            details: {},
          },
        });
      }

      const result = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", result.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res) {
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Session ended successfully",
    });
  }

  static async me(req, res) {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }
}
