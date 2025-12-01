import type { IAuthRepository, LoginRequest, RegisterRequest, UpdateUserRequest } from '@/repositories/interfaces/IAuthRepository';
import type { User } from '@/entities/User';
import type { ResetPasswordToken } from '@/entities/ResetPasswordToken';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';

export class ClientAuthRepository implements IAuthRepository {
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

  async login(data: LoginRequest): Promise<Result<User>> {
    return this.request<User>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest): Promise<Result<User>> {
    return this.request<User>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async checkToken(token?: string): Promise<Result<User>> {
    return this.request<User>('/api/auth/token');
  }

  async refreshToken(token?: string): Promise<Result<User>> {
    return this.request<User>('/api/auth/refresh-token');
  }

  async logout(): Promise<Result<void>> {
    return this.request<void>('/api/auth/logout');
  }

  async update(data: UpdateUserRequest): Promise<Result<User>> {
    return this.request<User>('/api/auth', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async authGithub(): Promise<Result<void>> {
    return this.request<void>('/api/auth/github');
  }

  async deleteAccount(): Promise<Result<void>> {
    return this.request<void>('/api/auth', {
      method: 'DELETE',
    });
  }

  async forgotPassword(email: string): Promise<Result<void>> {
    return this.request<void>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async checkPasswordToken(token: string): Promise<Result<ResetPasswordToken>> {
    return this.request<ResetPasswordToken>(`/api/auth/password-token/${token}`);
  }

  async updatePassword(token: string, password: string): Promise<Result<User>> {
    return this.request<User>('/api/auth/update-password', {
      method: 'PUT',
      body: JSON.stringify({ token, password }),
    });
  }
}
