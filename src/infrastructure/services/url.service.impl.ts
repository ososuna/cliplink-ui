import {  } from './../../domain/repositories/url.repository';
import {
  CreateUrl,
  CreateUrlDto,
  CustomError,
  DeleteUrl,
  GetUrls,
  Url,
  RenameUrl,
  type Page,
  type UrlRepository,
  type UrlService
} from '@/domain';
import { Messages } from '@/config';
import { setUiError } from '@/infrastructure';

export class UrlServiceImpl implements UrlService {
    
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly notifyUiError: (error: {message: string, type: string}) => void = setUiError
  ) {}

  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      this.notifyUiError({ type: 'error', message: error.message });
      return;
    }
    this.notifyUiError({ type: 'error', message: Messages.INTERNAL_SERVER_ERROR });
  }

  async createUrl(originalUrl: string, name?: string): Promise<Url | undefined> {
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl, name });
    if (error) {
      this.notifyUiError({ type: 'error', message: error });
      return;
    }
    return new CreateUrl(this.urlRepository)
      .execute(createUrlDto!)
      .then(data => data)
      .catch(error => {
        this.handleError(error);
        return undefined;
      });
  }

  async getUrls(page: number, limit: number, search: string = '', token?: string): Promise<Page<Url> | void> {
    return new GetUrls(this.urlRepository)
      .execute(page, limit, search, token)
      .then(data => data)
      .catch(this.handleError);
  }

  async deleteUrl(urlId: string): Promise<void> {
    return new DeleteUrl(this.urlRepository)
      .execute(urlId)
      .catch(this.handleError);
  }

  async rename(urlId: string, name: string): Promise<void | Url> {
    return new RenameUrl(this.urlRepository)
      .execute(urlId, name)
      .catch(this.handleError);
  }
}