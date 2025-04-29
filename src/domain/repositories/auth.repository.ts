import { LoginUserDto, RegisterUserDto, ResetPasswordToken, UpdateUserDto, User } from '@/domain';
export interface AuthRepository {
  login(loginUserDto: LoginUserDto): Promise<User>;
  register(registerUSerDto: RegisterUserDto): Promise<User>;
  checkToken(token?: string): Promise<User>;
  refreshToken(token?: string): Promise<User>;
  logout(): Promise<void>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  authGithub(): Promise<void>;
  deleteAccount(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  checkPasswordToken(token: string): Promise<ResetPasswordToken>;
  updatePassword(token: string, password: string): Promise<User>;
}