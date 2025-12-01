import type { User } from './User';

export interface Url {
  id: string;
  shortId: string;
  originalUrl: string;
  user: User;
  name?: string;
}
