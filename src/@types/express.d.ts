import { DecodedUserToken } from "core/domain/entities/token";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUserToken;
    }
  }
}
