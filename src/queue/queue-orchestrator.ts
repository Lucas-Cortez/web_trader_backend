import { Consumer } from "./contracts/consumer";
import { QueueFactoryBase } from "./contracts/factory";
import { Queue } from "./contracts/queue";
import { QueueOptions } from "./contracts/queue-options";
import { PQueueQueueFactory } from "./implementation/p-queue/p-queue-queue-factory";
// import { BullQueueFactory } from "./implementation/bull/bullQueueFactory";

export class QueueOrchestrator {
  private queueFactory: QueueFactoryBase;
  private processes: Map<string, Queue> = new Map();

  constructor(queueFactory: QueueFactoryBase) {
    this.queueFactory = queueFactory;
  }

  public addToQueue(key: string, data: any) {
    this.processes.get(key)?.add(data);
  }

  public initializeProcesses() {
    console.log("[QUEUE]: initialized");

    Array.from(this.processes.values()).forEach((process) => process.run());
  }

  public subscribeConsumer(key: string, consumer: Consumer, options?: QueueOptions) {
    const queue = this.queueFactory.createInstance(key, consumer, options);

    this.processes.set(key, queue);
  }
}

export const queueOrchestrator = new QueueOrchestrator(new PQueueQueueFactory());
// export const queueOrchestrator = new QueueOrchestrator(new BullQueueFactory());
