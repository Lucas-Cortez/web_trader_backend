import { CreateOrderUseCase } from "application/use-cases/create-order";
import { CreateOrderController } from "./create-order.controller";
import { queueService } from "infra/services/queue";
import { prisma } from "infra/config/prisma";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";

const profileRepository = new PrismaProfileRepository(prisma);
const createOrderUseCase = new CreateOrderUseCase(queueService, profileRepository);
const createOrderController = new CreateOrderController(createOrderUseCase);

export { createOrderUseCase, createOrderController };
