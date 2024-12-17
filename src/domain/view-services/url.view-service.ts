import type { Url } from '@/domain';

export interface UrlViewService {
  createUrl(originalUrl: string, name?: string): Promise<Url | undefined>;
  getUrls(): Promise<Url[]>;
  deleteUrl(urlId: string): Promise<void>;
}
