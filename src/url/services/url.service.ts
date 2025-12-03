import type { Page } from '@/entities';
import type { Url } from '@/url/entities';
import type { UrlResponseDto } from '@/url/dto';
import { HttpClient, type HttpResponse } from '@/adapters';
import { UrlMapper } from '@/url/mappers';

export class UrlService {

  private static readonly API_URL = '/url';

  /**
   * Creates a shortened URL as a guest user.
   * 
   * @param originalUrl - The original URL to shorten
   * @returns Promise<HttpResponse<Url | null>> - Result containing the shortened URL or error
   */
  static async createUrlAsGuest(originalUrl: string): Promise<HttpResponse<Url | null>> {
    try {
      const response = await HttpClient.post<UrlResponseDto>(`${this.API_URL}/guest`, { originalUrl });
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

  static async createUrlAsUser(originalUrl: string, name?: string): Promise<HttpResponse<Url | null>> {
    try {
      const response = await HttpClient.post<UrlResponseDto>(`${this.API_URL}`, { originalUrl, name });
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

  static async getUrls(pageNumber: number, size: number, search?: string, token?: string): Promise<HttpResponse<Page<Url> | null>> {
    try {
      const response = await HttpClient.get<Page<UrlResponseDto>>(`${this.API_URL}?page=${pageNumber}&size=${size}&search=${search}`, {}, token);
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      return {
        ok: true,
        data: {
          ...response.data!,
          content: response.data!.content.map((url) => UrlMapper.urlEntityFromObject(url))
        },
        status: response.status,
        error: response.error
      }
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