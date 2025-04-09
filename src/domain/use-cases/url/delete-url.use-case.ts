import type { UrlRepository } from '@/domain';

interface DeleteUrlUseCase {
  execute(urlId: string): Promise<void>;
}

export class DeleteUrl implements DeleteUrlUseCase {

  constructor(
    private readonly urlRepository: UrlRepository
  ) {}

  async execute(urlId: string): Promise<void> {
    await this.urlRepository.delete(urlId);
  }
}