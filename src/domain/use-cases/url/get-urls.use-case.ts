import type { Page, Url, UrlService } from '@/domain';

interface GetUrlsUseCase {
  execute(page: number, limit: number, search: string, token?: string): Promise<Page<Url>>;
}

export class GetUrls implements GetUrlsUseCase {

  constructor(private readonly urlService: UrlService) {}

  async execute(page: number, limit: number, search: string, token?: string): Promise<Page<Url>> {
    const data = await this.urlService.getUrls(page, limit, search, token);
    return data;
  }
}