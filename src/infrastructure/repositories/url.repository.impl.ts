import type { CreateUrlDto, Page, Url, UrlRepository } from '@/domain';
import { HttpClient } from '@/config';

export class UrlRepositoryImpl implements UrlRepository {

  create(createUrlDto: CreateUrlDto): Promise<Url> {
    return HttpClient.post<Url>('/url', createUrlDto);
  }

  getUrls(page: number, limit: number, search: string, token?: string): Promise<Page<Url>> {
    if (token) {
      return HttpClient.get<Page<Url>>(`/url?page=${page}&limit=${limit}&search=${search}`, {
        headers: {
          'Cookie': `access_token=${token}`
        }
      });
    }
    return HttpClient.get<Page<Url>>(`/url?page=${page}&limit=${limit}&search=${search}`);
  }

  delete(urlId: string): Promise<void> {
    return HttpClient.delete<void>(`/url/${ urlId }`);
  }

  rename(urlId: string, name: string): Promise<Url> {
    return HttpClient.put<Url>(`/url/${ urlId }`, { name });
  }

}