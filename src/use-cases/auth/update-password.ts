import type { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { User } from '@/entities/User';

export class UpdatePasswordUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(token: string, password: string): Promise<Result<User>> {
    return this.authRepo.updatePassword(token, password);
  }
}
