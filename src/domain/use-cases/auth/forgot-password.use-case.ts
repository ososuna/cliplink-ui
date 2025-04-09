import type { AuthRepository } from '@/domain';

interface ForgotPasswordUseCase {
  execute(email: string): Promise<void>;
}

export class ForgotPassword implements ForgotPasswordUseCase {
  
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string): Promise<void>{
    await this.authRepository.forgotPassword(email);
  }

}