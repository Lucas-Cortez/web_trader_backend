// import { ErrorTag } from "./error-tag";

type AppErrorsAttributes = {
  statusCode: number;
  message: string;
};

export class AppError extends Error {
  statusCode: number;
  // tag: ErrorTag;

  constructor({ statusCode, message }: AppErrorsAttributes) {
    super(message);
    this.statusCode = statusCode;
  }
}
