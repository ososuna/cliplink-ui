import { H as HttpClient, C as CustomError } from './auth.view-service.impl_4eB7NGm5.mjs';
import { s as setUiError } from './ui.store_QvZKQ_iI.mjs';

class CreateUrlDto {
  constructor(name, originalUrl, userId) {
    this.name = name;
    this.originalUrl = originalUrl;
    this.userId = userId;
  }
  static create(object) {
    const { name, originalUrl, userId } = object;
    if (!originalUrl) return ["missing original url", void 0];
    return [void 0, new CreateUrlDto(name, originalUrl, userId)];
  }
}

class CreateUrl {
  constructor(urlService) {
    this.urlService = urlService;
  }
  async execute(createUrlDto) {
    const url = await this.urlService.create(createUrlDto);
    return url;
  }
}

class GetUrls {
  constructor(urlService) {
    this.urlService = urlService;
  }
  async execute(page, limit, search) {
    const data = await this.urlService.getUrls(page, limit, search);
    return data;
  }
}

class DeleteUrl {
  constructor(urlService) {
    this.urlService = urlService;
  }
  async execute(urlId) {
    await this.urlService.delete(urlId);
  }
}

class UrlServiceImpl {
  create(createUrlDto) {
    return HttpClient.post("/url", createUrlDto);
  }
  getUrls(page, limit, search) {
    return HttpClient.get(`/url?page=${page}&limit=${limit}&search=${search}`);
  }
  delete(urlId) {
    return HttpClient.delete(`/url/${urlId}`);
  }
}

class UrlViewServiceImpl {
  constructor(urlService, notifyUiError = setUiError) {
    this.urlService = urlService;
    this.notifyUiError = notifyUiError;
  }
  handleError = (error) => {
    if (error instanceof CustomError) {
      this.notifyUiError({ type: "error", message: error.message });
    }
    this.notifyUiError({ type: "error", message: "Please try again later. If the issue persists talk to the admin." });
  };
  async createUrl(originalUrl, name) {
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl, name });
    if (error) {
      return;
    }
    return new CreateUrl(this.urlService).execute(createUrlDto).then((data) => data).catch((error2) => {
      this.handleError(error2);
      return void 0;
    });
  }
  async getUrls(page, limit, search = "") {
    return new GetUrls(this.urlService).execute(page, limit, search).then((data) => data).catch(this.handleError);
  }
  async deleteUrl(urlId) {
    return new DeleteUrl(this.urlService).execute(urlId).catch(this.handleError);
  }
}

export { UrlViewServiceImpl as U, UrlServiceImpl as a };
