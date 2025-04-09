import type { AuthRepository, UpdateUserDto, User } from '@/domain';

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async execute(updateUserDto: UpdateUserDto) {
    const user = await this.authRepository.update(updateUserDto);
    return user;
  }
}