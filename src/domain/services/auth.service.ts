import { User } from '..';
import { LoginUserDto } from '../dtos/auth/login-user.dto';

export interface AuthService {
  login(loginUserDto: LoginUserDto): Promise<User>;
}