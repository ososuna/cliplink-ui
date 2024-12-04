import type { AuthService, LoginUserDto, User } from '@/domain';

interface LoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<User>;
}

export class Login implements LoginUseCase {

  constructor(private readonly authService: AuthService) {}

  async execute(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.authService.login(loginUserDto);
    return user;
  }
}