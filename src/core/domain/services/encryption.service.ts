export interface EncryptionService {
  encrypt(value: string): string;
  decrypt(encryptedValue: string): string;
}
