export interface IStrategy {
  readonly id: string;
  readonly tag: string;
  readonly name: string;
  readonly title: string;
  readonly description: string;
}

export class Strategy implements IStrategy {
  constructor(
    public readonly id: string,
    public readonly tag: string,
    public readonly name: string,
    public readonly title: string,
    public readonly description: string,
  ) {}
}
