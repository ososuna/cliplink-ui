import type { ResetPasswordToken, User, UserToken } from '@/domain';

export interface AuthService {
  loginByEmail(email: string, password: string): Promise<void | User>;
  registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void>;
  checkToken(token?: string): Promise<User | void>;
  refreshToken(token?: string): Promise<UserToken | void>;
  logout(): Promise<void>;
  update(name?: string, lastName?: string, email?: string): Promise<User | void>;
  authGithub(): void;
  deleteAccount(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  checkPasswordToken(token: string): Promise<ResetPasswordToken | void>;
  updatePassword(token: string, password: string): Promise<User | void>;
}