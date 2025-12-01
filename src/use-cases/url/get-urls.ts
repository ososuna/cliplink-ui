import type { IUrlRepository } from '@/repositories/interfaces/IUrlRepository';
import type { Result } from '@/types/Result';
import type { Url } from '@/entities/Url';
import type { Page } from '@/entities/Page';

export class GetUrlsUseCase {
  constructor(private urlRepo: IUrlRepository) {}

  async execute(page: number, limit: number, search: string): Promise<Result<Page<Url>>> {
    return this.urlRepo.getUrls(page, limit, search);
  }
}
