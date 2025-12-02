import type { IUrlRepository, CreateGuestUrlRequest } from '@/repositories/interfaces/IUrlRepository';
import type { Result } from '@/types/Result';
import type { Url } from '@/entities/Url';

export class CreateGuestUrlUseCase {
  constructor(private urlRepo: IUrlRepository) {}

  async execute(data: CreateGuestUrlRequest): Promise<Result<Url>> {
    return this.urlRepo.createAsGuest(data);
  }
}
