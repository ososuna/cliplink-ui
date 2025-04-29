import type { AuthRepository, User } from '@/domain';

interface RefreshTokenUse {
  execute(token?: string): Promise<User>;
}

export class RefreshToken implements RefreshTokenUse {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token?: string): Promise<User> {
    const user = await this.authRepository.refreshToken(token);
    return user;
  }
}