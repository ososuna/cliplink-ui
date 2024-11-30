import type { CreateUrlDto, Url, UrlService } from '@/domain';
import { HttpClient } from '@/config/http-client';

export class UrlServiceImpl implements UrlService {

  async create(createUrlDto: CreateUrlDto): Promise<Url> {
    try {
      const url = await HttpClient.post<Url>('/url', createUrlDto);
      return url;
    } catch (error) {
      throw error;
    }
  }
}