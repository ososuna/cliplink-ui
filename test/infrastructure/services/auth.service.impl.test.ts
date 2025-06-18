import { describe, it, expect, beforeEach, vi } from 'vitest';
import { type AuthRepository, type AuthService } from '@/domain';
import { AuthServiceImpl } from '@/infrastructure';
import { AuthServiceMocks } from '@test/test-utils/infrastructure/services/auth.service.mocks';

describe('AuthServiceImpl', () => {

  let authService: AuthService;
  let mockAuthRepository: AuthRepository;
  const navigateToMock = vi.fn();
  const notifyUiErrorMock = vi.fn();

  beforeEach(() => {
    mockAuthRepository = AuthServiceMocks.createMockAuthRepository();
    authService = new AuthServiceImpl(mockAuthRepository, navigateToMock, notifyUiErrorMock);
  });

  describe('loginByEmail', () => {
    it('should login user', async () => {
      const mockUser = AuthServiceMocks.user;
      vi.mocked(mockAuthRepository.login).mockResolvedValue(mockUser);
      const user = await authService.loginByEmail(mockUser.email, '12345678');
      expect(user).toEqual(mockUser);
      expect(mockAuthRepository.login).toHaveBeenCalledWith({
        email: mockUser.email,
        password: '12345678'
      });
    });
  });
});