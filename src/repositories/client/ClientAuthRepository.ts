import type { IAuthRepository, LoginRequest, RegisterRequest, UpdateUserRequest } from '@/repositories/interfaces/IAuthRepository';
import type { User } from '@/entities/User';
import type { ResetPasswordToken } from '@/entities/ResetPasswordToken';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';
import { HttpClient } from '@/adapters/http-client';

export class ClientAuthRepository implements IAuthRepository {
  constructor(private httpClient: HttpClient) {}

  async login(data: LoginRequest): Promise<Result<User>> {
    try {
      const user = await this.httpClient.post<User>('/api/auth/login', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Login failed'));
    }
  }

  async register(data: RegisterRequest): Promise<Result<User>> {
    try {
      const user = await this.httpClient.post<User>('/api/auth/register', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Registration failed'));
    }
  }

  async checkToken(token?: string): Promise<Result<User>> {
    try {
      const user = await this.httpClient.get<User>('/api/auth/token');
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Token check failed'));
    }
  }

  async refreshToken(token?: string): Promise<Result<User>> {
    try {
      const user = await this.httpClient.get<User>('/api/auth/refresh-token');
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Token refresh failed'));
    }
  }

  async logout(): Promise<Result<void>> {
    try {
      await this.httpClient.get<void>('/api/auth/logout');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Logout failed'));
    }
  }

  async update(data: UpdateUserRequest): Promise<Result<User>> {
    try {
      const user = await this.httpClient.put<User>('/api/auth', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Update failed'));
    }
  }

  async authGithub(): Promise<Result<void>> {
    try {
      await this.httpClient.get<void>('/api/auth/github');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('GitHub auth failed'));
    }
  }

  async deleteAccount(): Promise<Result<void>> {
    try {
      await this.httpClient.delete<void>('/api/auth');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Account deletion failed'));
    }
  }

  async forgotPassword(email: string): Promise<Result<void>> {
    try {
      await this.httpClient.post<void>('/api/auth/forgot-password', { email });
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Forgot password failed'));
    }
  }

  async checkPasswordToken(token: string): Promise<Result<ResetPasswordToken>> {
    try {
      const resetToken = await this.httpClient.get<ResetPasswordToken>(`/api/auth/password-token/${token}`);
      return success(resetToken);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Password token check failed'));
    }
  }

  async updatePassword(token: string, password: string): Promise<Result<User>> {
    try {
      const user = await this.httpClient.put<User>('/api/auth/update-password', { token, password });
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Password update failed'));
    }
  }
}
