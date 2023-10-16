import { createProfileController } from "application/controllers/create-profile";
import { getProfilesController } from "application/controllers/get-profiles";
import { authMiddleware } from "application/middlewares/auth.middleware";
import { Router } from "express";

const profileRoutes = Router();

profileRoutes.post("/", authMiddleware.inject(), createProfileController.inject());
profileRoutes.get("/", authMiddleware.inject(), getProfilesController.inject());

export { profileRoutes };
