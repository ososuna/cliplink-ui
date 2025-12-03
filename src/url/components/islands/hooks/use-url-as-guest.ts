import { useState } from "react";
import type { Url } from "@/url/entities";
import { setUiError } from "@/stores/ui.store";
import { UrlService } from "@/url/services";

export default function useUrlAsGuest() {

  const [isLoading, setIsLoading] = useState(false);

  const createUrlAsGuest = async (originalUrl: string): Promise<Url | null> => {
    setIsLoading(true);
    const response = await UrlService.createUrlAsGuest(originalUrl);
    if (!response.ok) {
      setUiError({ message: response.error || 'Failed to create URL', type: 'error' });
    }
    setIsLoading(false);
    return response.data;
  };

  return {
    isLoading,
    createUrlAsGuest
  };
}