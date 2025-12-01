import type { IAuthRepository, UpdateUserRequest } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';
import type { User } from '@/entities/User';

export class UpdateUserUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(data: UpdateUserRequest): Promise<Result<User>> {
    return this.authRepo.update(data);
  }
}
