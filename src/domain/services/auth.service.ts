import { LoginUserDto, RegisterUserDto, ResetPasswordToken, UpdateUserDto, User } from '@/domain';
export interface AuthService {
  login(loginUserDto: LoginUserDto): Promise<User>;
  register(registerUSerDto: RegisterUserDto): Promise<User>;
  checkToken(token?: string): Promise<User>;
  logout(): Promise<void>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  authGithub(): Promise<void>;
  deleteAccount(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  checkPasswordToken(token: string): Promise<ResetPasswordToken>;
}