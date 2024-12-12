import { CreateUrlDto, Url } from '..';

export interface UrlService {
  create(createUrlDto: CreateUrlDto): Promise<Url>;
  getUrls(): Promise<Url[]>;
  delete(urlId: string): Promise<void>;
}