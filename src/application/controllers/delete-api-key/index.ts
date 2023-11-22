import { DeleteApiKeyUseCase } from "application/use-cases/delete-api-key";
import { DeleteApiKeyController } from "./delete-api-key.controller";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { prisma } from "infra/config/prisma";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";

const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const profileRepository = new PrismaProfileRepository(prisma);
const deleteApiKeyUseCase = new DeleteApiKeyUseCase(apiKeyRepository, profileRepository);
const deleteApiKeyController = new DeleteApiKeyController(deleteApiKeyUseCase);

export { deleteApiKeyUseCase, deleteApiKeyController };
