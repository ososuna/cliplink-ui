import { CreateUrlDto, Url, type Page } from '@/domain';

export interface UrlService {
  create(createUrlDto: CreateUrlDto): Promise<Url>;
  getUrls(page: number, limit: number): Promise<Page<Url>>;
  delete(urlId: string): Promise<void>;
}