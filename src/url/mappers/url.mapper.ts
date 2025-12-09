import { Url } from '@/url/entities';
import { Messages } from '@/config';

export class UrlMapper {
  static urlEntityFromObject(object: { [key: string]: any }): Url {
    const { id, _id, name, originalUrl, shortId, user, clicks } = object;

    if (!(_id || id)) throw new Error(Messages.REQUIRED_FIELD('ID'));
    if (!originalUrl) throw new Error(Messages.REQUIRED_FIELD('original URL'));
    if (!shortId) throw new Error(Messages.REQUIRED_FIELD('short ID'));

    return new Url(_id || id, shortId, originalUrl, user, name, clicks);
  }
}