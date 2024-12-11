import type { Url, UrlService } from '@/domain';

interface GetUrlsUseCase {
  execute(): Promise<Url[]>;
}

export class GetUrls implements GetUrlsUseCase {

  constructor(private readonly urlService: UrlService) {}

  async execute(): Promise<Url[]> {
    const urls = await this.urlService.getUrls();
    return urls;
  }
}