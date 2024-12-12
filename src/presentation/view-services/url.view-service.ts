import { CreateUrl, CreateUrlDto, CustomError, GetUrls, Url, type UrlService } from '@/domain';
import { setUiError } from '@/infrastructure/store/ui.store';

export class UrlViewService {
    
  constructor(
    private readonly urlService: UrlService,
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>> = () => null,
  ) {}

  private handleError = (error: unknown) => {
    if (error instanceof CustomError) {
      setUiError({ type: 'error', message: error.message });
      return;
    }
    setUiError({ type: 'error', message: 'Please try again later. If the issue persists talk to the admin.' });
  }

  async createUrl(originalUrl: string, name?: string): Promise<Url | undefined> {
    this.setIsLoading(true);
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl, name });
    if (error) {
      setUiError({ type: 'error', message: error });
      this.setIsLoading(false);
      return;
    }
    return new CreateUrl(this.urlService)
      .execute(createUrlDto!)
      .then(data => data)
      .catch(error => {
        this.handleError(error);
        this.setIsLoading(false);
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
}