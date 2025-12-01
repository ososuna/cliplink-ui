import type { User } from '@/entities/User';
import type { ResetPasswordToken } from '@/entities/ResetPasswordToken';
import type { Result } from '@/types/Result';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  lastName: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  lastName?: string;
  email?: string;
}

export interface IAuthRepository {
  login(data: LoginRequest): Promise<Result<User>>;
  register(data: RegisterRequest): Promise<Result<User>>;
  checkToken(token?: string): Promise<Result<User>>;
  refreshToken(token?: string): Promise<Result<User>>;
  logout(): Promise<Result<void>>;
  update(data: UpdateUserRequest): Promise<Result<User>>;
  authGithub(): Promise<Result<void>>;
  deleteAccount(): Promise<Result<void>>;
  forgotPassword(email: string): Promise<Result<void>>;
  checkPasswordToken(token: string): Promise<Result<ResetPasswordToken>>;
  updatePassword(token: string, password: string): Promise<Result<User>>;
}
