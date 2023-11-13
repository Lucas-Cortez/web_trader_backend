import { AppError } from "application/errors/app-error";
import { IUseCase } from "core/contracts/usecase";
import { UserRepository } from "core/domain/repositories/user.repository";
import { HashingService } from "core/domain/services/hashing.service";

type CreateNewPasswordInput = { userId: string; oldPassword: string; newPassword: string };
type CreateNewPasswordOutput = { status: string };

export class CreateNewPasswordUseCase implements IUseCase<CreateNewPasswordInput, CreateNewPasswordOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: CreateNewPasswordInput): Promise<CreateNewPasswordOutput> {
    const user = await this.userRepository.getUserById(input.userId);

    const encryptedPassword = user?.password || "";

    const isPasswordCorrect = await this.hashingService.compare(input.oldPassword, encryptedPassword);

    if (!user || !isPasswordCorrect)
      throw new AppError({ statusCode: 401, message: "invalid email or password" });

    const salt = await this.hashingService.generateSalt();
    const passwordHash = await this.hashingService.hash(input.newPassword, salt);

    await this.userRepository.update(user.id, { password: passwordHash, salt });

    return { status: "created" };
  }
}
