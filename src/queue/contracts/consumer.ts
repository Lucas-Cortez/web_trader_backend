export interface Consumer<I = any> {
  handle(input: I): Promise<void>;
}
