import { SignInUserUseCase } from "application/use-cases/sign-in-user";
import { SignInUserController } from "./sign-in-user.controller";
import { PrismaUserRepository } from "infra/repositories/prisma/prisma-user-repository";
import { JwtTokenService } from "infra/services/jwt-token.service";
import { BcryptHashingService } from "infra/services/bcrypt-hashing.service";
import { prisma } from "infra/config/prisma";

const userRepository = new PrismaUserRepository(prisma);
const hashingService = new BcryptHashingService();
const tokenService = new JwtTokenService();
const signInUserUseCase = new SignInUserUseCase(userRepository, hashingService, tokenService);
const signInUserController = new SignInUserController(signInUserUseCase);

export { signInUserUseCase, signInUserController };
