import type { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { User } from '@/entities/User';

export class CheckTokenUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(token?: string): Promise<Result<User>> {
    return this.authRepo.checkToken(token);
  }
}
