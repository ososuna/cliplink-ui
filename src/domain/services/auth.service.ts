import { LoginUserDto, User } from '@/domain';
export interface AuthService {
  login(loginUserDto: LoginUserDto): Promise<User>;
  checkToken(): Promise<User>;
  logout(): Promise<void>;
}