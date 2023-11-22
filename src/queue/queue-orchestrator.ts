import { Consumer } from "./contracts/consumer";
import { QueueFactoryBase } from "./contracts/factory";
import { Queue } from "./contracts/queue";
import { QueueOptions } from "./contracts/queue-options";
import { PQueueQueueFactory } from "./implementation/p-queue/p-queue-queue-factory";
// import { BullQueueFactory } from "./implementation/bull/bullQueueFactory";

export class QueueOrchestrator<T extends Record<string, any>> {
  private queueFactory: QueueFactoryBase;
  private processes: Map<keyof T, Queue> = new Map();

  constructor(queueFactory: QueueFactoryBase) {
    this.queueFactory = queueFactory;
  }

  public addToQueue<K extends keyof T>(key: K, data: T[K]) {
    const queue = this.processes.get(key);

    if (!queue) throw new Error(`Consumer "${key.toString()}" does not exist`);

    queue.add(data);
  }

  public subscribeConsumer(key: keyof T, consumer: Consumer, options?: QueueOptions) {
    const queue = this.queueFactory.createInstance(key.toString(), consumer, options);

    this.processes.set(key, queue);
  }

  public initializeProcesses() {
    console.log("[QUEUE]: initialized");

    Array.from(this.processes.values()).forEach((process) => process.run());
  }
}

type Queues = {
  email: { name: string };
  order: { price: number };
};

export const queueOrchestrator = new QueueOrchestrator<Queues>(new PQueueQueueFactory());
// export const queueOrchestrator = new QueueOrchestrator(new BullQueueFactory());
