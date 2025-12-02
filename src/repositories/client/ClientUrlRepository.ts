import type { IUrlRepository, CreateUrlRequest, CreateGuestUrlRequest } from '@/repositories/interfaces/IUrlRepository';
import type { Url } from '@/entities/Url';
import type { Page } from '@/entities/Page';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';
import { HttpClient } from '@/adapters/http/HttpClient';

export class ClientUrlRepository implements IUrlRepository {
  constructor(private httpClient: HttpClient) {}

  async createGuest(data: CreateGuestUrlRequest): Promise<Result<Url>> {
    try {
      const url = await this.httpClient.post<Url>('/api/url/guest', data);
      return success(url);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('URL creation failed'));
    }
  }

  async getUrls(page: number, limit: number, search: string, token?: string): Promise<Result<Page<Url>>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });
      const urls = await this.httpClient.get<Page<Url>>(`/api/url?${params}`);
      return success(urls);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Failed to fetch URLs'));
    }
  }

  async delete(urlId: string): Promise<Result<void>> {
    try {
      await this.httpClient.delete<void>(`/api/url/${urlId}`);
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('URL deletion failed'));
    }
  }

  async rename(urlId: string, name: string): Promise<Result<Url>> {
    try {
      const url = await this.httpClient.put<Url>(`/api/url/${urlId}`, { name });
      return success(url);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('URL rename failed'));
    }
  }
}
