import { UrlService } from "@/url/services";

export default function useIncrementUrlClicks() {

  const incrementUrlClicks = async (shortId: string) => {
    const url = await UrlService.incrementUrlClicks(shortId);
    if (!url.ok) {
      console.error('Error incrementing url clicks');
      return;
    }
    return url.data;
  }
  
  return {
    incrementUrlClicks
  }

}