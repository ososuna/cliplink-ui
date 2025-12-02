import type { User } from './user.entity';

export interface ResetPasswordToken {
  id: string;
  token: string;
  expiresAt: Date;
  user: User;
}
