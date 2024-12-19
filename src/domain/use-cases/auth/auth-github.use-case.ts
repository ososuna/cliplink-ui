import type { AuthService, User } from '@/domain';

interface AuthGithubUseCase {
  execute(): Promise<void>;
}

export class AuthGithub implements AuthGithubUseCase {

  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    await this.authService.authGithub();
  }
}