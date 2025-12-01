import type { IHttpClient } from '@/adapters/http/IHttpClient';
import type { IUrlRepository, CreateUrlRequest } from '@/repositories/interfaces/IUrlRepository';
import type { Url } from '@/entities/Url';
import type { Page } from '@/entities/Page';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';

export class ServerUrlRepository implements IUrlRepository {
  constructor(private http: IHttpClient) {}

  async create(data: CreateUrlRequest): Promise<Result<Url>> {
    try {
      const url = await this.http.post<Url>('/urls', data);
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
      const urls = await this.http.get<Page<Url>>(`/urls?${params}`);
      return success(urls);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Failed to fetch URLs'));
    }
  }

  async delete(urlId: string): Promise<Result<void>> {
    try {
      await this.http.delete<void>(`/urls/${urlId}`);
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('URL deletion failed'));
    }
  }

  async rename(urlId: string, name: string): Promise<Result<Url>> {
    try {
      const url = await this.http.put<Url>(`/urls/${urlId}`, { name });
      return success(url);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('URL rename failed'));
    }
  }
}
