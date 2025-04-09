import type { AuthRepository } from '@/domain';

interface DeleteAccountUseCase {
  execute(): Promise<void>;
}

export class DeleteAccount implements DeleteAccountUseCase {
  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async execute(): Promise<void> {
    await this.authRepository.deleteAccount();
  }
}