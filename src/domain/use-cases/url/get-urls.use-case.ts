import type { Page, Url, UrlRepository } from '@/domain';

interface GetUrlsUseCase {
  execute(page: number, limit: number, search: string, token?: string): Promise<Page<Url>>;
}

export class GetUrls implements GetUrlsUseCase {

  constructor(private readonly urlRepository: UrlRepository) {}

  async execute(page: number, limit: number, search: string, token?: string): Promise<Page<Url>> {
    const data = await this.urlRepository.getUrls(page, limit, search, token);
    return data;
  }
}