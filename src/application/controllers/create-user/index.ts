import { CreateUserUseCase } from "application/use-cases/create-user";
import { CreateUserController } from "./create-user.controller";
import { PrismaUserRepository } from "infra/repositories/prisma/prisma-user-repository";
import { BcryptHashingProvider } from "infra/providers/bcrypt-hashing.provider";
import { prisma } from "infra/config/prisma";

const userRepository = new PrismaUserRepository(prisma);
const hashingProvider = new BcryptHashingProvider();
const createUserUseCase = new CreateUserUseCase(userRepository, hashingProvider);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
