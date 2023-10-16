import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";
import { strategyRoutes } from "./strategy.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", profileRoutes);
routes.use("/strategy", strategyRoutes);

export { routes };
