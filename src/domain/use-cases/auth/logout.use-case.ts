import type { AuthService } from '@/domain';

interface LogoutUseCase {
  execute(): Promise<void>;
}

export class Logout implements LogoutUseCase {

  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<void> {
    await this.authService.logout();
  }
}