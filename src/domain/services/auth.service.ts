import { LoginUserDto, RegisterUserDto, User } from '@/domain';
export interface AuthService {
  login(loginUserDto: LoginUserDto): Promise<User>;
  register(registerUSerDto: RegisterUserDto): Promise<User>;
  checkToken(token?: string): Promise<User>;
  logout(): Promise<void>;
}