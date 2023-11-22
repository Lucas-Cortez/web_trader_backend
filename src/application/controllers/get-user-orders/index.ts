import { prisma } from "infra/config/prisma";
import { PrismaOrderRepository } from "infra/repositories/prisma/prisma-order.repository";
import { GetUserOrdersController } from "./get-user-orders.controller";
import { GetUserOrdersUseCase } from "application/use-cases/get-user-orders";

const orderRepository = new PrismaOrderRepository(prisma);
const getUserOrdersUseCase = new GetUserOrdersUseCase(orderRepository);
const getUserOrdersController = new GetUserOrdersController(getUserOrdersUseCase);

export { getUserOrdersUseCase, getUserOrdersController };
