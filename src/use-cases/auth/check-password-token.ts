import type { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { ResetPasswordToken } from '@/entities/ResetPasswordToken';

export class CheckPasswordTokenUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(token: string): Promise<Result<ResetPasswordToken>> {
    return this.authRepo.checkPasswordToken(token);
  }
}
