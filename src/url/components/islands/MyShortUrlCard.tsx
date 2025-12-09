import { useState } from 'react';
import type { Url } from '@/url/entities';
import DeleteUrlDialog from '@/url/components/islands/DeleteUrlDialog';
import MyShortUrlCopyButton from '@/url/components/islands/MyShortUrlCopyButton';
import MyShortUrlNameTooltip from '@/url/components/islands/MyShortUrlNameTooltip';
import MyShortUrlNavigateButton from '@/url/components/islands/MyShortUrlNavigateButton';
import MyShortUrlRenameDialog from '@/url/components/islands/MyShortUrlRenameDialog';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styled-components';

interface Props {
  url: Url;
}

const MyShortUrlCard = ({ url }: Props) => {
  const [clicks, setClicks] = useState(url.clicks ?? 0);

  const handleNavigate = () => {
    setClicks(prev => prev + 1);
  };

  return (
    <Card key={url.id}>
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            {url.name && url.name.length > 30 ? (
              <MyShortUrlNameTooltip name={url.name}>
                <CardTitle className="text-lg truncate flex-1">
                  {url.name || `/${url.shortId}`}
                </CardTitle>
              </MyShortUrlNameTooltip>
            ) : (
              <CardTitle className="text-lg truncate flex-1">
                {url.name || `/${url.shortId}`}
              </CardTitle>
            )}
            {url.name && (
              <span className="text-sm text-muted-foreground shrink-0">
                {`/${url.shortId}`}
              </span>
            )}
          </div>
          <CardDescription className="truncate">{url.originalUrl}</CardDescription>
        </div>
      </CardHeader>
      <div className="px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Clicks:</span>
          <span className="text-sm font-semibold">{clicks}</span>
        </div>
      </div>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <MyShortUrlCopyButton id={url.shortId} />
          <MyShortUrlNavigateButton
            url={url.originalUrl}
            shortId={url.shortId}
            onClick={handleNavigate}
          />
          <MyShortUrlRenameDialog urlId={url.id} name={url.name} />
        </div>
        <DeleteUrlDialog id={url.id} />
      </CardFooter>
    </Card>
  );
};

export default MyShortUrlCard;
