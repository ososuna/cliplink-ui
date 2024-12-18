import type { Page, Url, UrlService } from '@/domain';

interface GetUrlsUseCase {
  execute(page: number, limit: number): Promise<Page<Url>>;
}

export class GetUrls implements GetUrlsUseCase {

  constructor(private readonly urlService: UrlService) {}

  async execute(page: number, limit: number): Promise<Page<Url>> {
    const data = await this.urlService.getUrls(page, limit);
    return data;
  }
}