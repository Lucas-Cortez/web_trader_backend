import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { HashingService } from "core/domain/services/hashing.service";
import { TokenService } from "core/domain/services/token.service";
import { UserRepository } from "core/domain/repositories/user.repository";

type SignInUserInput = { email: string; password: string };
type SignInUserOutput = { accessToken: string; email: string };

export class SignInUserUseCase implements IUseCase<SignInUserInput, SignInUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
  ) {}

  public async execute(input: SignInUserInput): Promise<SignInUserOutput> {
    const user = await this.userRepository.getUserByEmail(input.email);

    const encryptedPassword = user?.password || "";
    // console.log(input);
    // console.log(user);

    const isPasswordCorrect = await this.hashingService.compare(input.password, encryptedPassword);

    if (!user || !isPasswordCorrect)
      throw new AppError({ statusCode: 401, message: "invalid email or password" });

    const { accessToken } = this.tokenService.sign(user);

    return { accessToken, email: user.email };
  }
}
