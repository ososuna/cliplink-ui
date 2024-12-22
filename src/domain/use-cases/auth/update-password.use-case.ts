import type { AuthService, User } from '@/domain';

interface UpdatePasswordUseCase {
  execute(token: string, password: string): Promise<User>;
}

export class UpdatePassword implements UpdatePasswordUseCase {

  constructor(private readonly authService: AuthService) {}

  async execute(token: string, password: string): Promise<User> {
    return await this.authService.updatePassword(token, password);
  }

}