import type { AuthService, User } from '@/domain';

interface CheckTokenUse {
  execute(token?: string): Promise<User>;
}

export class CheckToken implements CheckTokenUse {

  constructor(private readonly authService: AuthService) {}

  async execute(token?: string): Promise<User> {
    const user = await this.authService.checkToken(token);
    return user;
  }
}