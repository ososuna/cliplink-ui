export class HttpClient {
  constructor(
    private baseUrl: string,
    private headers: Record<string, string> = {}
  ) {}

  private async request<T>(path: string, method: string, body?: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      credentials: 'include',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `HTTP Error ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, 'GET');
  }

  async post<T>(path: string, body?: any): Promise<T> {
    return this.request<T>(path, 'POST', body);
  }

  async put<T>(path: string, body?: any): Promise<T> {
    return this.request<T>(path, 'PUT', body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, 'DELETE');
  }
}
