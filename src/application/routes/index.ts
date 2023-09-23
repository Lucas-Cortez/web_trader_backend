import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", profileRoutes);

export { routes };
