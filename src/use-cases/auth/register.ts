import type { IAuthRepository, RegisterRequest } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { User } from '@/entities/User';

export class RegisterUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(data: RegisterRequest): Promise<Result<User>> {
    return this.authRepo.register(data);
  }
}
