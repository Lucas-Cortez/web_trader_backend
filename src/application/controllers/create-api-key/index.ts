import { CreateApiKeyUseCase } from "application/use-cases/create-api-key";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { CreateApiKeyController } from "./create-api-key.controller";
import { prisma } from "infra/config/prisma";
import { CryptoEncryptionService } from "infra/services/crypto-encryption.service";

const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const encryptionService = new CryptoEncryptionService();
const createApiKeyUseCase = new CreateApiKeyUseCase(apiKeyRepository, encryptionService);
const createApiKeyController = new CreateApiKeyController(createApiKeyUseCase);

export { createApiKeyUseCase, createApiKeyController };
