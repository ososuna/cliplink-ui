import type { AuthTokens, User } from '@/auth/entities';
import type { AuthTokensResponseDto, UserDto } from '@/auth/dto';
import { HttpClient, type HttpResponse } from '@/adapters';
import { AuthMapper, UserMapper } from '@/auth/mappers';

export class AuthService {

  private static readonly API_URL = '/auth';

  static async refreshToken(refreshToken: string): Promise<HttpResponse<AuthTokens | null>> {
    try {
      const response = await HttpClient.post<HttpResponse<AuthTokensResponseDto>>(`${this.API_URL}/refresh`, { refreshToken });
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      const authTokens = AuthMapper.authTokensFromObject(response.data!);
      return {
        ok: true,
        data: authTokens,
        status: response.status
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Error processing response'
      };
    }
  }

  static async login(email: string, password: string): Promise<HttpResponse<User | null>> {
    try {
      const response = await HttpClient.post<HttpResponse<UserDto>>(`${this.API_URL}/login`, { email, password });
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      const user = UserMapper.userFromObject(response.data!);
      return {
        ok: true,
        data: user,
        status: response.status
      };
    } catch (error) {
      return {
        ok: false,
        data: null,
        status: 500,
        error: error instanceof Error ? error.message : 'Error processing response'
      };
    }
  }
}