import { createProfileController } from "application/controllers/create-profile";
import { authMiddleware } from "application/middlewares/auth.middleware";
import { Router } from "express";

const profileRoutes = Router();

profileRoutes.post("/", authMiddleware.inject(), createProfileController.inject());

export { profileRoutes };
