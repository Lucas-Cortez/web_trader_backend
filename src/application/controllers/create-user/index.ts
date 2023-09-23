import { CreateUserUseCase } from "application/use-cases/create-user";
import { CreateUserController } from "./create-user.controller";
import { PrismaUserRepository } from "infra/repositories/prisma/prisma-user-repository";
import { BcryptHashingService } from "infra/services/bcrypt-hashing.service";
import { prisma } from "infra/config/prisma";

const userRepository = new PrismaUserRepository(prisma);
const hashingService = new BcryptHashingService();
const createUserUseCase = new CreateUserUseCase(userRepository, hashingService);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
