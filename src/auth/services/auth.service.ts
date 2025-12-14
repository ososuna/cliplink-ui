import type { AuthTokens, User } from '@/auth/entities';
import type { AuthTokensResponseDto, ForgotPasswordDto, ForgotPasswordResponseDto, MessageResponseDto, RegisterUserDto, ResetPasswordRequestDto, UserDto } from '@/auth/dto';
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

  static async logout(): Promise<HttpResponse<void>> {
    try {
      const response = await HttpClient.post<HttpResponse<void>>(`${this.API_URL}/logout`, {});
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      return {
        ok: true,
        data: null,
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

  static async register(registerData: RegisterUserDto): Promise<HttpResponse<User | null>> {
    try {
      const response = await HttpClient.post<HttpResponse<UserDto>>(`${this.API_URL}/register`, registerData);
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

  static async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<HttpResponse<ForgotPasswordResponseDto>> {
    try {
      const response = await HttpClient.post<ForgotPasswordResponseDto>(`${this.API_URL}/forgot-password`, forgotPasswordDto);
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      return {
        ok: true,
        data: response.data,
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

  static async verifyResetToken(token: string): Promise<HttpResponse<MessageResponseDto>> {
    try {
      const response = await HttpClient.get<MessageResponseDto>(`${this.API_URL}/verify-reset-token/${token}`);
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      return {
        ok: true,
        data: response.data,
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

  static async resetPassword(resetPasswordDto: ResetPasswordRequestDto): Promise<HttpResponse<MessageResponseDto>> {
    try {
      const response = await HttpClient.post<MessageResponseDto>(`${this.API_URL}/reset-password`, resetPasswordDto);
      if (!response.ok) {
        return {
          ok: false,
          data: null,
          status: response.status,
          error: response.error
        };
      }
      return {
        ok: true,
        data: response.data,
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