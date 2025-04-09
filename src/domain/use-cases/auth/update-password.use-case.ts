import type { AuthRepository, User } from '@/domain';

interface UpdatePasswordUseCase {
  execute(token: string, password: string): Promise<User>;
}

export class UpdatePassword implements UpdatePasswordUseCase {

  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string, password: string): Promise<User> {
    const user = await this.authRepository.updatePassword(token, password);
    return user;
  }

}