import { CreateApiKeyUseCase } from "application/use-cases/create-api-key";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { CreateApiKeyController } from "./create-api-key.controller";
import { prisma } from "infra/config/prisma";

const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const createApiKeyUseCase = new CreateApiKeyUseCase(apiKeyRepository);
const createApiKeyController = new CreateApiKeyController(createApiKeyUseCase);

export { createApiKeyUseCase, createApiKeyController };
