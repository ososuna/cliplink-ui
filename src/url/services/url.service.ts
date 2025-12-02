import type { UrlResponseDto } from '@/url/dto';
import { HttpClient } from '@/adapters';

export const createUrlAsGuest = async (url: string): Promise<UrlResponseDto> => {
  return await HttpClient.post('/urls', { url });
};