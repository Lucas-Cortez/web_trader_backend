import { StockUser } from "../entities/stock-user";

export interface StockUserRepository {
  update(stockUser: Omit<StockUser, "id">, userId: string): Promise<string>;
}
