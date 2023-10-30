import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";
import { strategyRoutes } from "./strategy.routes";
import { apiKeyRoutes } from "./api-key.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", profileRoutes);
routes.use("/strategy", strategyRoutes);
routes.use("/api-key", apiKeyRoutes);

export { routes };
