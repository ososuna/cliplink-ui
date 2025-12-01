import type { IUrlRepository, CreateUrlRequest } from '@/repositories/interfaces/IUrlRepository';
import type { Url } from '@/entities/Url';
import type { Page } from '@/entities/Page';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';

export class ClientUrlRepository implements IUrlRepository {
  private async request<T>(url: string, options: RequestInit = {}): Promise<Result<T>> {
    try {
      const res = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP Error ${res.status}`);
      }

      // Handle void responses
      if (res.status === 204 || res.headers.get('content-length') === '0') {
        return success(undefined as T);
      }

      const data = await res.json();
      return success(data as T);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Request failed'));
    }
  }

  async create(data: CreateUrlRequest): Promise<Result<Url>> {
    return this.request<Url>('/api/urls', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUrls(page: number, limit: number, search: string, token?: string): Promise<Result<Page<Url>>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
    });
    return this.request<Page<Url>>(`/api/urls?${params}`);
  }

  async delete(urlId: string): Promise<Result<void>> {
    return this.request<void>(`/api/urls/${urlId}`, {
      method: 'DELETE',
    });
  }

  async rename(urlId: string, name: string): Promise<Result<Url>> {
    return this.request<Url>(`/api/urls/${urlId}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  }
}
