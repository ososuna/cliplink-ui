import type { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';

export class ForgotPasswordUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(email: string): Promise<Result<void>> {
    return this.authRepo.forgotPassword(email);
  }
}
