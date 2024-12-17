import { CreateUrl, CreateUrlDto, CustomError, DeleteUrl, GetUrls, Url, type UrlService } from '@/domain';

export class UrlViewServiceImpl {
    
  constructor(
    private readonly urlService: UrlService,
  ) {}

  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      // this.uiErrorHandler({ type: 'error', message: error.message });
      return;
    }
    // this.uiErrorHandler({ type: 'error', message: 'Please try again later. If the issue persists talk to the admin.' });
  }

  async createUrl(originalUrl: string, name?: string): Promise<Url | undefined> {
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl, name });
    if (error) {
      // this.uiErrorHandler({ type: 'error', message: error });
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

  async getUrls(): Promise<Url[]> {
    return new GetUrls(this.urlService)
      .execute()
      .then(data => data)
      .catch(error => {
        this.handleError(error);
        return [];
      });
  }

  async deleteUrl(urlId: string): Promise<void> {
    return new DeleteUrl(this.urlService)
      .execute(urlId)
      .catch(this.handleError);
  }
}