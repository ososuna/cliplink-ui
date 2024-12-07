import { HttpClient } from '@/config';
import type { AuthService, LoginUserDto, User } from '@/domain';

export class AuthServiceImpl implements AuthService {

  login(loginUserDto: LoginUserDto): Promise<User> {
    return HttpClient.post<User>('/auth/login', loginUserDto);
  }

  checkToken(): Promise<User> {
    return HttpClient.get<User>('/auth/token');
  }

  logout(): Promise<void> {
    return HttpClient.get<void>('/auth/logout');
  }

}