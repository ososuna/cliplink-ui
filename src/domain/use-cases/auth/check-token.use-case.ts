import type { AuthService, User } from '@/domain';

interface CheckTokenUse {
  execute(): Promise<User>;
}

export class CheckToken implements CheckTokenUse {

  constructor(private readonly authService: AuthService) {}

  async execute(): Promise<User> {
    const user = await this.authService.checkToken();
    return user;
  }
}