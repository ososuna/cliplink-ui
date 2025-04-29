import type { AuthRepository, UserToken } from '@/domain';

interface RefreshTokenUse {
  execute(token?: string): Promise<UserToken>;
}

export class RefreshToken implements RefreshTokenUse {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token?: string): Promise<UserToken> {
    const userToken = await this.authRepository.refreshToken(token);
    return userToken;
  }
}