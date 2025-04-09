import type { AuthRepository, LoginUserDto, User } from '@/domain';

interface LoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<User>;
}

export class Login implements LoginUseCase {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.authRepository.login(loginUserDto);
    return user;
  }
}