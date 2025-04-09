import type { AuthRepository } from '@/domain';

interface LogoutUseCase {
  execute(): Promise<void>;
}

export class Logout implements LogoutUseCase {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
  }
}