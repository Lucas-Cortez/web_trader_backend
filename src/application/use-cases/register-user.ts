import { IUseCase } from "core/contracts/usecase";
import { CreateUserInput, CreateUserUseCase } from "./create-user";
import { TokenService } from "core/domain/services/token.service";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

export type RegisterUserInput = CreateUserInput & { passwordConfirmation: string };
export type RegisterUserOutput = {
  accessToken: string;
  user: { id: string; email: string; name: string; hasKey: boolean };
};

export class RegisterUserUseCase implements IUseCase<RegisterUserInput, RegisterUserOutput> {
  constructor(
    private readonly tokenService: TokenService,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const { email, name, password } = input;

    const user = await this.createUserUseCase.execute({ email, name, password });

    const hasKey = !!(await this.apiKeyRepository.getUserKey(user.id));

    const { accessToken } = this.tokenService.sign(user);

    return { accessToken, user: { id: user.id, name: user.name, email: user.email, hasKey } };
  }
}
