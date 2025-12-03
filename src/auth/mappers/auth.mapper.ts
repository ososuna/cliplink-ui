import { AuthTokens } from '@/auth/entities';
import { Messages } from '@/config';
import { UserMapper } from './user.mapper';

export class AuthMapper {
  static authTokensFromObject(object: { [key: string]: any }): AuthTokens {
    const { accessToken, refreshToken, user } = object;

    if (!accessToken) throw new Error(Messages.REQUIRED_FIELD('access token'));
    if (!refreshToken) throw new Error(Messages.REQUIRED_FIELD('refresh token'));
    if (!user) throw new Error(Messages.REQUIRED_FIELD('user'));

    return new AuthTokens(accessToken, refreshToken, UserMapper.userFromObject(user));
  }
}
