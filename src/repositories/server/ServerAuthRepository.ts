import type { IHttpClient } from '@/adapters/http/IHttpClient';
import type { IAuthRepository, LoginRequest, RegisterRequest, UpdateUserRequest } from '@/repositories/interfaces/IAuthRepository';
import type { User } from '@/entities/User';
import type { ResetPasswordToken } from '@/entities/ResetPasswordToken';
import type { Result } from '@/types/Result';
import { success, failure } from '@/types/Result';

export class ServerAuthRepository implements IAuthRepository {
  constructor(private http: IHttpClient) {}

  async login(data: LoginRequest): Promise<Result<User>> {
    try {
      const user = await this.http.post<User>('/auth/login', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Login failed'));
    }
  }

  async register(data: RegisterRequest): Promise<Result<User>> {
    try {
      const user = await this.http.post<User>('/auth/register', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Registration failed'));
    }
  }

  async checkToken(token?: string): Promise<Result<User>> {
    try {
      const user = await this.http.get<User>('/auth/token');
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Token validation failed'));
    }
  }

  async refreshToken(token?: string): Promise<Result<User>> {
    try {
      const user = await this.http.get<User>('/auth/refresh-token');
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Token refresh failed'));
    }
  }

  async logout(): Promise<Result<void>> {
    try {
      await this.http.get<void>('/auth/logout');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Logout failed'));
    }
  }

  async update(data: UpdateUserRequest): Promise<Result<User>> {
    try {
      const user = await this.http.put<User>('/auth', data);
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Update failed'));
    }
  }

  async authGithub(): Promise<Result<void>> {
    try {
      await this.http.get<void>('/auth/github');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('GitHub auth failed'));
    }
  }

  async deleteAccount(): Promise<Result<void>> {
    try {
      await this.http.delete<void>('/auth');
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Account deletion failed'));
    }
  }

  async forgotPassword(email: string): Promise<Result<void>> {
    try {
      await this.http.post<void>('/auth/forgot-password', { email });
      return success(undefined);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Forgot password request failed'));
    }
  }

  async checkPasswordToken(token: string): Promise<Result<ResetPasswordToken>> {
    try {
      const resetToken = await this.http.get<ResetPasswordToken>(`/auth/password-token/${token}`);
      return success(resetToken);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Password token validation failed'));
    }
  }

  async updatePassword(token: string, password: string): Promise<Result<User>> {
    try {
      const user = await this.http.put<User>('/auth/update-password', { token, password });
      return success(user);
    } catch (e) {
      return failure(e instanceof Error ? e : new Error('Password update failed'));
    }
  }
}
