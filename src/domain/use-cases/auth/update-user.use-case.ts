import type { AuthService, UpdateUserDto } from '@/domain';

interface User {
  id: string,
  name: string,
  email: string,
  role: string[],
  img?: string,
}

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<User | void>
}

export class UpdateUser implements UpdateUserUseCase {

  constructor(
    private readonly authService: AuthService
  ) {}

  async execute(updateUserDto: UpdateUserDto) {
    const user = await this.authService.update(updateUserDto);
    return user;
  }
}