import { ProcessOrderUseCase } from "application/use-cases/process-order";
import { prisma } from "infra/config/prisma";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { PrismaOrderRepository } from "infra/repositories/prisma/prisma-order.repository";
import { PrismaProfileRepository } from "infra/repositories/prisma/prisma-profile-repository";
import { BinanceBrokerService } from "infra/services/binance-broker.service";
import { CryptoEncryptionService } from "infra/services/crypto-encryption.service";

const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const profileRepository = new PrismaProfileRepository(prisma);
const orderRepository = new PrismaOrderRepository(prisma);
const encryptionService = new CryptoEncryptionService();
const brokerService = new BinanceBrokerService();
const processOrderUseCase = new ProcessOrderUseCase(
  apiKeyRepository,
  profileRepository,
  orderRepository,
  encryptionService,
  brokerService,
);

export { processOrderUseCase };
