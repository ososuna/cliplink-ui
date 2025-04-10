import { useEffect, useState } from 'react';
import { envs } from '@/config';
import { CopyInput } from '@/presentation/styled-components';

interface Props {
  shortId: string;
}

const ShortUrlCopyInput = ({ shortId }: Props) => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      const domain = envs.PUBLIC_APP_DOMAIN || window.location.origin;
      setShortUrl(`${domain}/${shortId}`);
    }
  }, [shortId]); // Recalculate shortUrl when shortId changes

  // Fallback value when window is not available (during SSR)
  if (shortUrl === null) {
    return <CopyInput value="Loading..." />;
  }

  return <CopyInput value={shortUrl} />;
};

export default ShortUrlCopyInput;
