import { LoginUserDto, RegisterUserDto, UpdateUserDto, User } from '@/domain';
export interface AuthService {
  login(loginUserDto: LoginUserDto): Promise<User>;
  register(registerUSerDto: RegisterUserDto): Promise<User>;
  checkToken(token?: string): Promise<User>;
  logout(): Promise<void>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  authGithub(): Promise<void>;
}