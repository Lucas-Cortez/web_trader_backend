import { Router } from "express";
import { registerUserController } from "application/controllers/register-user";
import { signInUserController } from "application/controllers/sign-in-user";
import { createNewPasswordController } from "application/controllers/create-new-password";
import { authMiddleware } from "application/middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/register", registerUserController.inject());
authRoutes.post("/", signInUserController.inject());
authRoutes.post("/new-password", authMiddleware.inject(), createNewPasswordController.inject());

export { authRoutes };
