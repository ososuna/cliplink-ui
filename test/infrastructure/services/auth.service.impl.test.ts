import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CustomError, type AuthRepository, type AuthService } from '@/domain';
import { AuthServiceImpl } from '@/infrastructure';
import { Messages } from '@/config';
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

    it('should notify an error if the user is not found', async () => {
      const mockUser = AuthServiceMocks.user;
      vi.mocked(mockAuthRepository.login).mockRejectedValue(CustomError.badRequest(Messages.BAD_CREDENTIALS));
      await authService.loginByEmail(mockUser.email, '12345678');
      expect(notifyUiErrorMock).toHaveBeenCalledWith({
        type: 'error',
        message: Messages.BAD_CREDENTIALS
      });
    });

    it('should notify missing password error', async () => {
      const mockUser = AuthServiceMocks.user;
      await authService.loginByEmail(mockUser.email, '');
      expect(notifyUiErrorMock).toHaveBeenCalledWith({
        type: 'error',
        message: Messages.PASSWORD_REQUIRED
      });
    });

    it('should notify missing email error', async () => {
      await authService.loginByEmail('', '12345678');
      expect(notifyUiErrorMock).toHaveBeenCalledWith({
        type: 'error',
        message: Messages.MISSING_EMAIL
      });
    });
  });
});