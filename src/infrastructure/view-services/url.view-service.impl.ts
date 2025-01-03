import {
  CreateUrl,
  CreateUrlDto,
  CustomError,
  DeleteUrl,
  GetUrls,
  Url,
  RenameUrl,
  type Page,
  type UrlService,
  type UrlViewService
} from '@/domain';
import { Messages } from '@/config';
import { setUiError } from '@/infrastructure';

export class UrlViewServiceImpl implements UrlViewService {
    
  constructor(
    private readonly urlService: UrlService,
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
    return new CreateUrl(this.urlService)
      .execute(createUrlDto!)
      .then(data => data)
      .catch(error => {
        this.handleError(error);
        return undefined;
      });
  }

  async getUrls(page: number, limit: number, search: string = '', token?: string): Promise<Page<Url> | void> {
    return new GetUrls(this.urlService)
      .execute(page, limit, search, token)
      .then(data => data)
      .catch(this.handleError);
  }

  async deleteUrl(urlId: string): Promise<void> {
    return new DeleteUrl(this.urlService)
      .execute(urlId)
      .catch(this.handleError);
  }

  async rename(urlId: string, name: string): Promise<void | Url> {
    return new RenameUrl(this.urlService)
      .execute(urlId, name)
      .catch(this.handleError);
  }
}