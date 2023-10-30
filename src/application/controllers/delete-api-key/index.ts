import { DeleteApiKeyUseCase } from "application/use-cases/delete-api-key";
import { DeleteApiKeyController } from "./delete-api-key.controller";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { prisma } from "infra/config/prisma";

const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const deleteApiKeyUseCase = new DeleteApiKeyUseCase(apiKeyRepository);
const deleteApiKeyController = new DeleteApiKeyController(deleteApiKeyUseCase);

export { deleteApiKeyUseCase, deleteApiKeyController };
