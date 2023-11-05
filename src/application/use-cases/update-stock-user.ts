import { IUseCase } from "core/contracts/usecase";
import { StockUser } from "core/domain/entities/stock-user";
import { StockUserRepository } from "core/domain/repositories/stock-user.repository";

type UpdateStockUserInput = { stockUser: Omit<StockUser, "id">; userId: string };
type UpdateStockUserOutput = { status: string };

export class UpdateStockUserUseCase implements IUseCase<UpdateStockUserInput, UpdateStockUserOutput> {
  constructor(private readonly stockUserRepository: StockUserRepository) {}

  async execute(input: UpdateStockUserInput): Promise<UpdateStockUserOutput> {
    const data = await this.stockUserRepository.update(input.stockUser, input.userId);
    return { status: data };
  }
}
