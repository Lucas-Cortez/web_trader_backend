import * as crypto from "crypto";
import { EncryptionService } from "core/domain/services/encryption.service";

export class CryptoEncryptionService implements EncryptionService {
  private readonly secretKey = process.env.ENCRYPTION_SECRET as string;
  private readonly algorithm = "aes-256-cbc";

  public encrypt(value: string): string {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey, "hex"), iv);

    const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  }

  public decrypt(encryptedValue: string): string {
    const [ivString, encryptedString] = encryptedValue.split(":");

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.secretKey, "hex"),
      Buffer.from(ivString, "hex"),
    );

    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedString, "hex")), decipher.final()]);

    return decrypted.toString();
  }
}
