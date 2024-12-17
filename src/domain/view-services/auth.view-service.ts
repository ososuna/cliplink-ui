import type { User } from '@/domain';

export interface AuthViewService {
  loginByEmail(email: string, password: string): Promise<void>;
  registerByEmail(email: string, name: string, lastName: string, password: string): Promise<User | void>;
  checkToken(token?: string): Promise<User | void>;
  logout(): Promise<void>;
}