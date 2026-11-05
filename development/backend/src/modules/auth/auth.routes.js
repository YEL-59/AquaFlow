import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticateToken } from "../../middleware/auth.middleware.js";
import { registerSchema, loginSchema } from "../../schemas/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);
router.get("/me", authenticateToken, AuthController.me);

export default router;
