import { AppError } from "application/errors/app-error";
import { Middleware } from "core/contracts/middleware";
import { TokenService } from "core/domain/services/token.service";
import { NextFunction, Request, Response } from "express";
import { JwtTokenService } from "infra/services/jwt-token.service";

export class AuthMiddleware extends Middleware {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    const bearerToken = request.headers.authorization;

    if (!bearerToken) throw new AppError({ statusCode: 401, message: "not allowed" });

    const token = bearerToken.split(" ")[1];

    const isAuthenticated = this.tokenService.verify(token);

    if (!isAuthenticated) throw new AppError({ statusCode: 401, message: "not allowed" });

    const decodedToken = this.tokenService.decode(token);

    request.user = { ...decodedToken };

    next();
  }
}

export const authMiddleware = new AuthMiddleware(new JwtTokenService());
