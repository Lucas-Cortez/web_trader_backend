import { Router } from "express";
import { bindController } from "utils/helpers/bind-controllers";
import { registerUserController } from "application/controllers/register-user";
import { signInUserController } from "application/controllers/sign-in-user";

const authRoutes = Router();

authRoutes.post("/register", bindController(registerUserController));
authRoutes.post("/", bindController(signInUserController));

export { authRoutes };
