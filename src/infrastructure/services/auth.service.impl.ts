import { HttpClient } from '@/config';
import type { AuthService, LoginUserDto, User } from '@/domain';

export class AuthServiceImpl implements AuthService {

  login(loginUserDto: LoginUserDto): Promise<User> {
    return HttpClient.post<User>('/auth/login', loginUserDto);
  }

}