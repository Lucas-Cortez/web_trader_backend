import { RegisterUserUseCase } from "application/use-cases/register-user";
import { RegisterUserController } from "./register-user.controller";
import { JwtTokenService } from "infra/services/jwt-token.service";
import { createUserUseCase } from "../create-user";

const tokenService = new JwtTokenService();
const registerUserUseCase = new RegisterUserUseCase(tokenService, createUserUseCase);
const registerUserController = new RegisterUserController(registerUserUseCase);

export { registerUserUseCase, registerUserController };
