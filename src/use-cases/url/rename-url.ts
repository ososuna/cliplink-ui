import type { IUrlRepository } from '@/repositories/interfaces/IUrlRepository';
import type { Result } from '@/types/Result';
import type { Url } from '@/entities/Url';

export class RenameUrlUseCase {
  constructor(private urlRepo: IUrlRepository) {}

  async execute(urlId: string, name: string): Promise<Result<Url>> {
    return this.urlRepo.rename(urlId, name);
  }
}
