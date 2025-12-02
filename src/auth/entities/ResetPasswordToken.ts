import type { User } from '../auth/entities/User';

export interface ResetPasswordToken {
  id: string;
  token: string;
  expiresAt: Date;
  user: User;
}
