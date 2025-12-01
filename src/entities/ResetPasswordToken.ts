import type { User } from './User';

export interface ResetPasswordToken {
  id: string;
  token: string;
  expiresAt: Date;
  user: User;
}
