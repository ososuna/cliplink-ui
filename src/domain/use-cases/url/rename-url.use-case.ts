import type { Url, UrlRepository } from '@/domain';

export interface RenameUrlUseCase {
  execute(urlId: string, name: string): Promise<Url>;
}

export class RenameUrl implements RenameUrlUseCase {
  
  constructor( private readonly urlRepository: UrlRepository ) {}
  
  async execute(urlId: string, name: string): Promise<Url> {
    return await this.urlRepository.rename(urlId, name);
  }
}