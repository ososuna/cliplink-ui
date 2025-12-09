import type { User } from '@/auth/entities';

export class Url {
  constructor(
    public id: string,
    public shortId: string,
    public originalUrl: string,
    public user: User,
    public name?: string,
    public clicks?: number,
  ) {}
}