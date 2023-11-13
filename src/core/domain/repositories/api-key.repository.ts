export interface ApiKeyRepository {
  getUserKey(userId: string): Promise<string | null>;
  create(api: { key: string; secret: string }, userId: string): Promise<string>;
  delete(userId: string): Promise<string>;
}
