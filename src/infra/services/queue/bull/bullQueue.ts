// import Bull, { Queue as QueueType } from "bull";
// import { Queue } from "core/contracts/queue";
// import { QueueConsumer } from "core/contracts/queue-consumer";
// import { QueueOptions } from "core/contracts/queue-options";

// export class BullQueue implements Queue<QueueType> {
//   public readonly key: string;
//   public readonly queue: QueueType;
//   public readonly consumer: QueueConsumer;

//   constructor(key: string, consumer: QueueConsumer, options?: QueueOptions) {
//     this.key = key;
//     this.consumer = consumer;

//     this.queue = options
//       ? new Bull(key, { limiter: { max: options.concurrency, duration: options.delay } })
//       : new Bull(key);
//   }

//   public run() {
//     console.log(`running ${this.key}`);
//     // console.log(this.queue.);
//     this.consumer.handle({ name: "lucas" });

//     // this.queue.process(this.consumer.handle);
//     this.queue.process(async (job) => {
//       console.log(job);
//       process.stdout.write("job");
//     });
//   }

//   public add(data: any) {}
// }
