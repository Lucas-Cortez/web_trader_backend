import { QueueConsumer } from "core/contracts/queue-consumer";
import { delay } from "utils/helpers/delay";

type EmailConsumerInput = {
  name: string;
};

export class EmailConsumer implements QueueConsumer<EmailConsumerInput> {
  public async handle(input: EmailConsumerInput): Promise<void> {
    // await delay(4000);
    const min = 1000;
    const max = 4000;
    await delay(Math.floor(Math.random() * (max - min + 1)) + min);
    console.log(input);
  }
}
