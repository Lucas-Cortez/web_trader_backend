import { Trade } from "application/enums/trade";
import { generateObjectId } from "utils/helpers/generateObjectId";

export interface IOrder {
  readonly id: string;
  readonly value: number;
  readonly trade: Trade;
  readonly symbol: string;
  readonly profileId: string;
  readonly profileName: string;
  readonly createdAt: Date;
}

export class Order implements IOrder {
  public readonly id: string;
  public readonly value: number;
  public readonly trade: Trade;
  public readonly symbol: string;
  public readonly profileName: string;
  public readonly createdAt: Date;
  public readonly profileId: string;

  constructor(order: IOrder) {
    this.id = order.id;
    this.value = order.value;
    this.trade = order.trade;
    this.symbol = order.symbol;
    this.profileName = order.profileName;
    this.profileId = order.profileId;
    this.createdAt = order.createdAt;
  }

  public static restore(order: IOrder) {
    return new Order({ ...order });
  }

  public static create(order: Omit<IOrder, "id" | "createdAt">) {
    return new Order({ id: generateObjectId(), createdAt: new Date(), ...order });
  }
}
