import type { Url, UrlService } from '@/domain';

export interface RenameUrlUseCase {
  execute(urlId: string, name: string): Promise<Url>;
}

export class RenameUrl implements RenameUrlUseCase {
  
  constructor( private readonly urlService: UrlService ) {}
  
  async execute(urlId: string, name: string): Promise<Url> {
    return await this.urlService.rename(urlId, name);
  }
}