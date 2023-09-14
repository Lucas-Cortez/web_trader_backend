import { Consumer } from "queue/contracts/consumer";

type EmailConsumerInput = {
  name: string;
};

const delay = (ms: number): Promise<void> => new Promise((res) => setTimeout(res, ms));

export class EmailConsumer implements Consumer<EmailConsumerInput> {
  public async handle(input: EmailConsumerInput): Promise<void> {
    await delay(4000);
    console.log(input);
  }
}
