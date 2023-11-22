import { GetProfileOrdersUseCase } from "application/use-cases/get-profile-orders";
import { GetProfileOrdersController } from "./get-profile-orders.controller";
import { PrismaOrderRepository } from "infra/repositories/prisma/prisma-order.repository";
import { prisma } from "infra/config/prisma";

const orderRepository = new PrismaOrderRepository(prisma);
const getProfileOrdersUseCase = new GetProfileOrdersUseCase(orderRepository);
const getProfileOrdersController = new GetProfileOrdersController(getProfileOrdersUseCase);

export { getProfileOrdersUseCase, getProfileOrdersController };
