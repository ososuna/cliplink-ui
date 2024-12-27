import type { Page, Url } from '@/domain';

export interface UrlViewService {
  createUrl(originalUrl: string, name?: string): Promise<Url | undefined>;
  getUrls(page: number, limit: number, search: string, token?: string): Promise<Page<Url> | void>;
  deleteUrl(urlId: string): Promise<void>;
}
