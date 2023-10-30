export interface ApiKeyRepository {
  getUserKey(userId: string): Promise<string | null>;
  create(key: string, userId: string): Promise<string>;
  delete(userId: string): Promise<string>;
}
