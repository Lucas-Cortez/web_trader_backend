import { AppError } from "application/errors/app-error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: AppError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server error";

  console.log(error);

  return response.status(statusCode).json({ statusCode, message });
};
