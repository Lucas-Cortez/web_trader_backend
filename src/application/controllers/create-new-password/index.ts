import { CreateNewPasswordUseCase } from "application/use-cases/create-new-password";
import { CreateNewPasswordController } from "./create-new-password.controller";
import { PrismaUserRepository } from "infra/repositories/prisma/prisma-user-repository";
import { BcryptHashingService } from "infra/services/bcrypt-hashing.service";
import { prisma } from "infra/config/prisma";

const userRepository = new PrismaUserRepository(prisma);
const hashingService = new BcryptHashingService();
const createNewPasswordUseCase = new CreateNewPasswordUseCase(userRepository, hashingService);
const createNewPasswordController = new CreateNewPasswordController(createNewPasswordUseCase);

export { createNewPasswordUseCase, createNewPasswordController };
