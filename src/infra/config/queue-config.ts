import { QueueConsumer } from "core/contracts/queue-consumer";
import { QueueOptions } from "core/contracts/queue-options";
import { QueueService } from "core/domain/services/queue.service";

export class QueueConfig<T extends Record<string, any>> extends QueueService<T> {
  public subscribe(key: keyof T, consumer: QueueConsumer, options?: QueueOptions) {
    this.subscribeConsumer(key, consumer, options);
  }

  public init() {
    this.initializeProcesses();
  }
}
