import { useState } from "react";
import { UrlService } from "@/url/services";
import type { Url } from "@/url/entities";

export function useUpdateUrl() {
 
  const [isLoading, setIsLoading] = useState(false);

  const renameUrl = async (urlId: string, name: string): Promise<Url | null> => {
    setIsLoading(true);
    const { data: updatedUrl } = await UrlService.updateUrl(urlId, name);
    setIsLoading(false);
    return updatedUrl;
  };
  
  return {
    renameUrl,
    isLoading
  }
}