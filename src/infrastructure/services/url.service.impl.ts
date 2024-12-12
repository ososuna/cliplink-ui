import type { CreateUrlDto, Url, UrlService } from '@/domain';
import { HttpClient } from '@/config';

export class UrlServiceImpl implements UrlService {

  create(createUrlDto: CreateUrlDto): Promise<Url> {
    return HttpClient.post<Url>('/url', createUrlDto);
  }

  getUrls(): Promise<Url[]> {
    return HttpClient.get<Url[]>('/url');
  }

  delete(urlId: string): Promise<void> {
    return HttpClient.delete<void>(`/url/${ urlId }`);
  }

}