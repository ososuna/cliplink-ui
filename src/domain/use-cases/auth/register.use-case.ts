import type { AuthService, RegisterUserDto, User } from '@/domain';

interface RegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<User>;
}

export class Register implements RegisterUseCase {

  constructor(private readonly authService: AuthService) {}

  async execute(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.authService.register(registerUserDto);
    return user;
  }
}