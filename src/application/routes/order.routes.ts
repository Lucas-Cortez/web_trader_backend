import { createOrderController } from "application/controllers/create-order";
import { getProfileOrdersController } from "application/controllers/get-profile-orders";
import { getUserOrdersController } from "application/controllers/get-user-orders";
import { authMiddleware } from "application/middlewares/auth.middleware";
import { Router } from "express";

const orderRoutes = Router();

orderRoutes.get("/profile/:profileId", authMiddleware.inject(), getProfileOrdersController.inject());
orderRoutes.get("/user", authMiddleware.inject(), getUserOrdersController.inject());
orderRoutes.post("/:profileId", authMiddleware.inject(), createOrderController.inject());

export { orderRoutes };
