import { Consumer } from "queue/contracts/consumer";
import { delay } from "utils/helpers/delay";

type EmailConsumerInput = {
  name: string;
};

export class EmailConsumer implements Consumer<EmailConsumerInput> {
  public async handle(input: EmailConsumerInput): Promise<void> {
    await delay(4000);
    console.log(input);
  }
}
