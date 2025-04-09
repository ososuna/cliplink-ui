import type { AuthRepository } from '@/domain';

interface AuthGithubUseCase {
  execute(): Promise<void>;
}

export class AuthGithub implements AuthGithubUseCase {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<void> {
    await this.authRepository.authGithub();
  }
}