import type { IUrlRepository } from '@/repositories/interfaces/IUrlRepository';
import type { Result } from '@/types/Result';

export class DeleteUrlUseCase {
  constructor(private urlRepo: IUrlRepository) {}

  async execute(urlId: string): Promise<Result<void>> {
    return this.urlRepo.delete(urlId);
  }
}
