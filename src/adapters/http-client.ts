export type HttpResponse<T> = {
  ok: boolean;
  data: T | null;
  status: number;
  error?: string;
};

export class HttpClient {

  private static getBaseURL(): string {
    return import.meta.env.PUBLIC_API_BASE_URL;
  }

  private static async request<T>(url: string, options: RequestInit = {}): Promise<HttpResponse<T>> {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Cookie': '',
        ...options.headers,
      };

      const response = await fetch(`${this.getBaseURL()}${url}`, {
        ...options,
        credentials: 'include',
        headers
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        return {
          ok: false,
          data: null as any,
          status: response.status,
          error: errorData.message || JSON.stringify(errorData)
        };
      }

      const data = await response.json();
      return { ok: true, data, status: response.status };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: 0,
        error: error instanceof Error ? error.message : 'Network error'
      };
    }
  }

  static async get<T>(url: string, options: RequestInit = {}) {
    return this.request<T>(url, { ...options, method: 'GET' });
  };

  static async post<T>(url: string, body: any, options: RequestInit = {}) {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  };

  static async put<T>(url: string, body: any, options: RequestInit = {}) {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  };

  static async delete<T>(url: string, options: RequestInit = {}) {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  };

};