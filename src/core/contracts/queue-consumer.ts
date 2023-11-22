export interface QueueConsumer<I = any> {
  handle(input: I): Promise<void>;
}
