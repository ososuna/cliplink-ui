import type { ResetPasswordToken, User } from '@/domain';

export interface AuthViewService {
  loginByEmail(email: string, password: string): Promise<void>;
  registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void>;
  checkToken(token?: string): Promise<User | void>;
  logout(): Promise<void>;
  update(name?: string, lastName?: string, email?: string): Promise<User | void>;
  authGithub(): void;
  deleteAccount(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  checkPasswordToken(token: string): Promise<ResetPasswordToken | void>;
}