import type { Url } from '@/url/entities';
import type { UrlResponseDto } from '@/url/dto';
import { HttpClient } from '@/adapters';
import { UrlMapper } from '@/url/mappers';

export class UrlService {
  static async createUrlAsGuest(originalUrl: string): Promise<Url> {
    const response = await HttpClient.post<UrlResponseDto>('/url/guest', { originalUrl });
    return UrlMapper.urlEntityFromObject(response);
  }
}