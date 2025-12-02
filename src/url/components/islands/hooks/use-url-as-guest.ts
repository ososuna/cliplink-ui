import { useState } from "react";
import { setUiError } from "@/stores/ui.store";
import { UrlService } from "@/url/services";
import type { Url } from "@/url/entities";

export default function useUrlAsGuest() {

  const [isLoading, setIsLoading] = useState(false);

  const createUrlAsGuest = async (originalUrl: string): Promise<Url> => {
    try {
      setIsLoading(true);
      const createdUrl = await UrlService.createUrlAsGuest(originalUrl);
      return createdUrl;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create URL';
      setUiError({ message: errorMessage, type: 'error' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createUrlAsGuest
  };
}