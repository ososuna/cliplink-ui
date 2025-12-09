import { useState } from "react";
import { UrlService } from "@/url/services";

type Result = {
  ok: boolean;
  error?: string;
}

export default function useDeleteUrl() {

  const [isLoading, setIsLoading] = useState(false);

  const deleteUrl = async (urlId: string): Promise<Result> => {
    setIsLoading(true);
    const result = await UrlService.deleteUrl(urlId);
    setIsLoading(false);
    return {
      ok: result.ok,
      error: result.error
    }
  };

  return {
    isLoading,
    deleteUrl
  }
}