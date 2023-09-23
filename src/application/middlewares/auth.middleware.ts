import { AppError } from "application/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { JwtTokenService } from "infra/services/jwt-token.service";

const tokenService = new JwtTokenService();

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const bearerToken = request.headers.authorization;

  if (!bearerToken) throw new AppError({ statusCode: 401, message: "not allowed" });

  const token = bearerToken.split(" ")[1];

  const isAuthenticated = tokenService.verify(token);

  if (!isAuthenticated) throw new AppError({ statusCode: 401, message: "not allowed" });

  const decodedToken = tokenService.decode(token) as { id: string };

  request.userId = decodedToken.id;

  next();
};
