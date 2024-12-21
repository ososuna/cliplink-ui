import { CustomError } from '@/domain';

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

export class HttpClient {
  
  public static accessToken = '';
  private static readonly baseURL = API_BASE_URL;

  private static async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': '',
      ...options.headers,
    };

    if (this.accessToken) {
      headers.Cookie = `access_token=${this.accessToken}`
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CustomError(response.status, error.error || error.message);
    }

    return response.json();
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
