import { DecodedUserToken } from "core/domain/entities/token";
import { UserEntity } from "core/domain/entities/user";
import { TokenService } from "core/domain/services/token.service";
import jwt from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  private readonly secretKey: string = process.env.JWT_SECRET || "";

  verify(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  decode(token: string): DecodedUserToken {
    return jwt.decode(token) as DecodedUserToken;
  }

  sign(user: UserEntity): { accessToken: string } {
    const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
      expiresIn: "1d",
      subject: user.id,
    });

    return { accessToken: token };
  }
}
