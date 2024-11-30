import { CreateUrlDto, Url } from '..';

export interface UrlService {
  create(createUrlDto: CreateUrlDto): Promise<Url>;
}