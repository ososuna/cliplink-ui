import { useState } from "react";
import { setUiError } from "@/stores/ui.store";
import { UrlService } from "@/url/services";

export default function useCreateUrl() {
  const [isLoading, setIsLoading] = useState(false);
  const createUrl = async (originalUrl: string, name?: string) => {
    setIsLoading(true);
    const response = await UrlService.createUrlAsUser(originalUrl, name);
    if (!response.ok) {
      setUiError({ message: response.error || 'Failed to shorten URL', type: 'error' });
    }
    setIsLoading(false);
    return response.data;
  }

  return {
    isLoading,
    createUrl
  };
}