import { createProfileController } from "application/controllers/create-profile";
import { authMiddleware } from "application/middlewares/auth.middleware";
import { Router } from "express";
import { bindController } from "utils/helpers/bind-controllers";

const profileRoutes = Router();

profileRoutes.post("/", authMiddleware, bindController(createProfileController));

export { profileRoutes };
