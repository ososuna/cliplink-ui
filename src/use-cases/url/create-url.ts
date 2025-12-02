import type { Url } from '@/entities/Url';
import type { IUrlRepository, CreateUrlRequest } from '@/repositories/interfaces/IUrlRepository';
import type { Result } from '@/types/Result';

export class CreateUrlUseCase {
  constructor(private urlRepo: IUrlRepository) {}

  async execute(data: CreateUrlRequest): Promise<Result<Url>> {
    return this.urlRepo.create(data);
  }
}
