import { vi } from 'vitest';
import type { AuthRepository, User } from "@/domain";

export class AuthServiceMocks {
  static readonly user: User = {
    id: 'userId',
    name: 'name',
    lastName: 'lastName',
    email: 'test@example.com',
    password: 'hashed-password',
    role: ['role'],
  };

  static createMockAuthRepository(): AuthRepository {
    return {
      login: vi.fn(),
      register: vi.fn(),
      checkToken: vi.fn(),
      refreshToken: vi.fn(),
      logout: vi.fn(),
      update: vi.fn(),
      authGithub: vi.fn(),
      deleteAccount: vi.fn(),
      forgotPassword: vi.fn(),
      checkPasswordToken: vi.fn(),
      updatePassword: vi.fn(),
    };
  }
}