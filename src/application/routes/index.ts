import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { profileRoutes } from "./profile.routes";
import { strategyRoutes } from "./strategy.routes";
import { apiKeyRoutes } from "./api-key.routes";
import { orderRoutes } from "./order.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/profile", profileRoutes);
routes.use("/strategy", strategyRoutes);
routes.use("/api-key", apiKeyRoutes);
routes.use("/order", orderRoutes);

export { routes };
