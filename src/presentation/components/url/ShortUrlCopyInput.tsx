import { CopyInput } from '@/presentation/components/ui/copy-input';
import React, { useEffect, useState } from 'react';

interface Props {
  shortId: string;
}

const ShortUrlCopyInput = ({ shortId }: Props) => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      setShortUrl(`${window.location.origin}/${shortId}`);
    }
  }, [shortId]); // Recalculate shortUrl when shortId changes

  // Fallback value when window is not available (during SSR)
  if (shortUrl === null) {
    return <CopyInput value="Loading..." />;
  }

  return <CopyInput value={shortUrl} />;
};

export default ShortUrlCopyInput;
