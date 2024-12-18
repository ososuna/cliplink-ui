import type { CreateUrlDto, Page, Url, UrlService } from '@/domain';
import { HttpClient } from '@/config';

export class UrlServiceImpl implements UrlService {

  create(createUrlDto: CreateUrlDto): Promise<Url> {
    return HttpClient.post<Url>('/url', createUrlDto);
  }

  getUrls(page: number, limit: number, search: string): Promise<Page<Url>> {
    return HttpClient.get<Page<Url>>(`/url?page=${page}&limit=${limit}&search=${search}`);
  }

  delete(urlId: string): Promise<void> {
    return HttpClient.delete<void>(`/url/${ urlId }`);
  }

}