import type { AuthRepository, User } from '@/domain';

interface CheckTokenUse {
  execute(token?: string): Promise<User>;
}

export class CheckToken implements CheckTokenUse {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token?: string): Promise<User> {
    const user = await this.authRepository.checkToken(token);
    return user;
  }
}