import type { IAuthRepository, LoginRequest } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { User } from '@/entities/User';

export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(data: LoginRequest): Promise<Result<User>> {
    return this.authRepo.login(data);
  }
}
