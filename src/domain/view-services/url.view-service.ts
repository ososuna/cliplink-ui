import type { Page, Url } from '@/domain';

export interface UrlViewService {
  createUrl(originalUrl: string, name?: string): Promise<Url | undefined>;
  getUrls(page: number, limit: number): Promise<Page<Url>>;
  deleteUrl(urlId: string): Promise<void>;
}
