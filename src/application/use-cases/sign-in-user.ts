import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { HashingService } from "core/domain/services/hashing.service";
import { TokenService } from "core/domain/services/token.service";
import { UserRepository } from "core/domain/repositories/user.repository";
import { ApiKeyRepository } from "core/domain/repositories/api-key.repository";

type SignInUserInput = { email: string; password: string };
type SignInUserOutput = {
  accessToken: string;
  user: { id: string; email: string; name: string; hasKey: boolean };
};

export class SignInUserUseCase implements IUseCase<SignInUserInput, SignInUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
    private readonly apiKeyRepository: ApiKeyRepository,
  ) {}

  public async execute(input: SignInUserInput): Promise<SignInUserOutput> {
    const user = await this.userRepository.getUserByEmail(input.email);

    const encryptedPassword = user?.password || "";
    const isPasswordCorrect = await this.hashingService.compare(input.password, encryptedPassword);

    if (!user || !isPasswordCorrect)
      throw new AppError({ statusCode: 401, message: "invalid email or password" });

    const hasKey = !!(await this.apiKeyRepository.getUserKey(user.id));

    const { accessToken } = this.tokenService.sign(user);

    return { accessToken, user: { id: user.id, name: user.name, email: user.email, hasKey } };
  }
}
