import type { UrlService, Url, CreateUrlDto } from '@/domain';

interface CreateUrlUseCase {
  execute(createUrlDto: CreateUrlDto): Promise<Url>;
}

export class CreateUrl implements CreateUrlUseCase {

  constructor(private urlService: UrlService) {}

  async execute(createUrlDto: CreateUrlDto): Promise<Url> {
    const url = await this.urlService.create(createUrlDto);
    return url;
  }
}