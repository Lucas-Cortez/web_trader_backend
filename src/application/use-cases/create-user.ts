import { IUseCase } from "core/contracts/usecase";
import { UserEntity } from "core/domain/entities/user";
import { AppError } from "application/errors/app-error";
import { UserRepository } from "core/domain/repositories/user.repository";
import { HashingService } from "core/domain/services/hashing.service";

export type CreateUserInput = { email: string; name: string; password: string };
export type CreateUserOutput = UserEntity;

export class CreateUserUseCase implements IUseCase<CreateUserInput, CreateUserOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
  ) {}

  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userRepository.getUserByEmail(input.email);

    const salt = await this.hashingService.generateSalt();

    const hashedPassword = await this.hashingService.hash(input.password, salt);

    if (existingUser) throw new AppError({ statusCode: 400, message: "error creating user" });

    const userEntity = UserEntity.create(input.email, input.name, salt, hashedPassword);

    const user = await this.userRepository.createUser(userEntity);

    return user;
  }
}
