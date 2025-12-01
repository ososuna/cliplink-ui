import type { IAuthRepository } from '@/repositories/interfaces/IAuthRepository';
import type { Result } from '@/types/Result';

export class DeleteAccountUseCase {
  constructor(private authRepo: IAuthRepository) {}

  async execute(): Promise<Result<void>> {
    return this.authRepo.deleteAccount();
  }
}
