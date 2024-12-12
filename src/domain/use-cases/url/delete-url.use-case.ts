import type { UrlService } from '@/domain';

interface DeleteUrlUseCase {
  execute(urlId: string): Promise<void>;
}

export class DeleteUrl implements DeleteUrlUseCase {

  constructor(
    private readonly urlService: UrlService
  ) {}

  async execute(urlId: string): Promise<void> {
    await this.urlService.delete(urlId);
  }
}