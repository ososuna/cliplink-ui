import type { AuthService, LoginUserDto, RegisterUserDto, UpdateUserDto, User } from '@/domain';
import { HttpClient } from '@/config';

export class AuthServiceImpl implements AuthService {

  login(loginUserDto: LoginUserDto): Promise<User> {
    return HttpClient.post<User>('/auth/login', loginUserDto);
  }

  register(registerUserDto: RegisterUserDto): Promise<User> {
    return HttpClient.post<User>('/auth/register', registerUserDto);
  }

  checkToken(token?: string): Promise<User> {
    if (token) {
      return HttpClient.get<User>('/auth/token', { headers: {
        Cookie: `access_token=${token}`
      }});
    } else {
      return HttpClient.get<User>('/auth/token');
    }
  }

  logout(): Promise<void> {
    HttpClient.accessToken = '';
    return HttpClient.get<void>('/auth/logout');
  }

  update(updateUserDto: UpdateUserDto): Promise<User> {
    return HttpClient.put<User>('/auth', updateUserDto);
  }

}