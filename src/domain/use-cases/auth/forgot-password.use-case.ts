import type { AuthService } from '@/domain';

interface ForgotPasswordUseCase {
  execute(email: string): Promise<void>;
}

export class ForgotPassword implements ForgotPasswordUseCase {
  
  constructor(private readonly authService: AuthService) {}

  async execute(email: string): Promise<void>{
    await this.authService.forgotPassword(email);
  }

}