export interface IStrategy {
  readonly id: string;
  readonly tag: string;
  readonly name: string;
  readonly title: string;
  readonly description: string;
}

export class Strategy implements IStrategy {
  public readonly id: string;
  public readonly tag: string;
  public readonly name: string;
  public readonly title: string;
  public readonly description: string;

  constructor(strategy: IStrategy) {
    this.id = strategy.id;
    this.tag = strategy.tag;
    this.name = strategy.name;
    this.title = strategy.title;
    this.description = strategy.description;
  }
}
