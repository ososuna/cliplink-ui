import type { Url } from '@/url/entities';
import type { UrlResponseDto } from '@/url/dto';
import { HttpClient, type HttpResponse } from '@/adapters';
import { UrlMapper } from '@/url/mappers';

export class UrlService {
  /**
   * Creates a shortened URL as a guest user.
   * 
   * @param originalUrl - The original URL to shorten
   * @returns Promise<HttpResponse<Url | null>> - Result containing the shortened URL or error
   */
  static async createUrlAsGuest(originalUrl: string): Promise<HttpResponse<Url | null>> {
    try {
      const response = await HttpClient.post<HttpResponse<UrlResponseDto>>('/url/guest', { originalUrl });
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      const url = UrlMapper.urlEntityFromObject(response.data!);
      return {
        ok: true,
        data: url,
        status: response.status
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Error processing response'
      };
    }
  }
}