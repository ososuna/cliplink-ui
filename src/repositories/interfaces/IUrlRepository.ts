import type { Url } from '@/entities/Url';
import type { Page } from '@/entities/Page';
import type { Result } from '@/types/Result';

export interface CreateUrlRequest {
  originalUrl: string;
  name?: string;
}

export interface CreateGuestUrlRequest {
  originalUrl: string;
}

export interface IUrlRepository {
  createAsGuest(data: CreateGuestUrlRequest): Promise<Result<Url>>;
  create(data: CreateUrlRequest): Promise<Result<Url>>;
  getUrls(page: number, limit: number, search: string, token?: string): Promise<Result<Page<Url>>>;
  delete(urlId: string): Promise<Result<void>>;
  rename(urlId: string, name: string): Promise<Result<Url>>;
}
