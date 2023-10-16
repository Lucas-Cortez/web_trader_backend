import { GetAllStrategiesUseCase } from "application/use-cases/get-all-strategies";
import { prisma } from "infra/config/prisma";
import { PrismaStrategyRepository } from "infra/repositories/prisma/prisma-strategy-repository";
import { GetAllStrategiesController } from "./get-all-strategies.controller";

const strategyRepository = new PrismaStrategyRepository(prisma);
const getAllStrategiesUseCase = new GetAllStrategiesUseCase(strategyRepository);
const getAllStrategiesController = new GetAllStrategiesController(getAllStrategiesUseCase);

export { getAllStrategiesUseCase, getAllStrategiesController };
