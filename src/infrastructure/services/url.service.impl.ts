import type { CreateUrlDto, Url, UrlService } from '@/domain';
import { HttpClient } from '@/config';

export class UrlServiceImpl implements UrlService {

  create(createUrlDto: CreateUrlDto): Promise<Url> {
    return HttpClient.post<Url>("/url", createUrlDto);
  }

}