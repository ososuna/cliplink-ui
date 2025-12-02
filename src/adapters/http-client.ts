import { envs } from '@/adapters';

const API_BASE_URL = envs.PUBLIC_API_BASE_URL;

export class HttpClient {
  
  private static readonly baseURL = API_BASE_URL;

  private static async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': '',
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message);
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