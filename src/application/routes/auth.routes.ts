import { Router } from "express";
import { registerUserController } from "application/controllers/register-user";
import { signInUserController } from "application/controllers/sign-in-user";

const authRoutes = Router();

authRoutes.post("/register", registerUserController.inject());
authRoutes.post("/", signInUserController.inject());

export { authRoutes };
