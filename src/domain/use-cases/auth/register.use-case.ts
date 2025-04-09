import type { AuthRepository, RegisterUserDto, User } from '@/domain';

interface RegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<User>;
}

export class Register implements RegisterUseCase {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.authRepository.register(registerUserDto);
    return user;
  }
}