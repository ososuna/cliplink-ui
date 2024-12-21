import type { AuthService } from '@/domain';

interface DeleteAccountUseCase {
  execute(): Promise<void>;
}

export class DeleteAccount implements DeleteAccountUseCase {
  constructor(
    private readonly authService: AuthService
  ) {}

  async execute(): Promise<void> {
    await this.authService.deleteAccount();
  }
}