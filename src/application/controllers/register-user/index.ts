import { RegisterUserUseCase } from "application/use-cases/register-user";
import { RegisterUserController } from "./register-user.controller";
import { JwtTokenService } from "infra/services/jwt-token.service";
import { createUserUseCase } from "../create-user";
import { PrismaApiKeyRepository } from "infra/repositories/prisma/prisma-api-key.repository";
import { prisma } from "infra/config/prisma";

const tokenService = new JwtTokenService();
const apiKeyRepository = new PrismaApiKeyRepository(prisma);
const registerUserUseCase = new RegisterUserUseCase(tokenService, createUserUseCase, apiKeyRepository);
const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserUseCase, registerUserController };
