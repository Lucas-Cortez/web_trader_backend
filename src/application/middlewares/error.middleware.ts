import { AppError } from "application/errors/app-error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(error);

  if (!(error instanceof AppError))
    return response.status(500).json({ statusCode: 500, message: "internal server error" });

  const { statusCode, message } = error;

  return response.status(statusCode).json({ statusCode, message });
};
