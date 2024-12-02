import { CreateUrl, CreateUrlDto, type UrlService } from '@/domain';
import { setUiError } from '@/infrastructure/store/ui.store';

export class UrlViewService {
    
  constructor(
    private readonly urlService: UrlService,
    private readonly setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) {}

  async createUrl(originalUrl: string): Promise<void> {
    this.setIsLoading(true);
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl });
    if (error) {
      setUiError({ type: 'error', message: error });
      this.setIsLoading(false);
      return;
    }
    new CreateUrl(this.urlService)
      .execute(createUrlDto!)
      .then(data => {
        window.location.href = `/short/${data.shortId}`;
        console.log('created url!!');
        console.log(data);
      })
      .catch(error => {
        const message = error.message || 'Please try again later';
        setUiError({ type: 'error', message: message });
        this.setIsLoading(false);
      });
  }

}