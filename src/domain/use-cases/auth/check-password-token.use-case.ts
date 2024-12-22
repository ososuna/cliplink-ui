import type { AuthService, ResetPasswordToken } from '@/domain';

interface CheckPasswordTokenUseCase {
  execute(token: string): Promise<ResetPasswordToken>;
}

export class CheckPasswordToken implements CheckPasswordTokenUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(token: string): Promise<ResetPasswordToken> {
    return await this.authService.checkPasswordToken(token);
  }
}