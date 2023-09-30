import { IUseCase } from "core/contracts/usecase";
import { CreateUserInput, CreateUserUseCase } from "./create-user";
import { TokenService } from "core/domain/services/token.service";

export type RegisterUserInput = CreateUserInput & { passwordConfirmation: string };
export type RegisterUserOutput = { accessToken: string; user: { id: string; email: string; name: string } };

export class RegisterUserUseCase implements IUseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const { email, name, password } = input;

    const user = await this.createUserUseCase.execute({ email, name, password });

    const { accessToken } = this.tokenService.sign(user);

    return { accessToken, user: { id: user.id, name: user.name, email: user.email } };
  }
}
