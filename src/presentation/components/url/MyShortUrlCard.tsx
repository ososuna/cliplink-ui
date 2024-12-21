import { useState } from 'react';
import { Check, Clipboard, ExternalLink, Trash } from 'lucide-react';

import type { Url } from '@/domain';

import { envs } from '@/config';

import { UrlServiceImpl, UrlViewServiceImpl } from '@/infrastructure';

import { useService } from '@/presentation/hooks/use-service';
import ConfirmationDialog from '@/presentation/components/shared/ConfirmationDialog';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/presentation/components/ui/tooltip";

export interface Props {
  url: Url
}

const MyShortUrlCard: React.FC<Props> = ({ url }) => {

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);

  const onCopy = () => {
    navigator.clipboard.writeText(`${envs.PUBLIC_API_DOMAIN}/${url.shortId}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await urlService?.deleteUrl(url.id);
    setIsLoading(false);
    window.location.href = '/dashboard';
  };

  return (
    <Card key={url.id}>
      <CardHeader>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            {url.name && url.name.length > 30 ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle className="text-lg truncate flex-1">
                      {url.name}
                    </CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{url.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <CardTitle className="text-lg truncate flex-1">
                {url.name || url.shortId}
              </CardTitle>
            )}
            {url.name && (
              <span className="text-sm text-muted-foreground shrink-0">
                {url.shortId}
              </span>
            )}
          </div>
          <CardDescription className="truncate">{url.originalUrl}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCopy}>
            {isCopied ? <Check className="text-green-500" /> : <Clipboard />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open(url.originalUrl, '_blank')}>
            <ExternalLink />
          </Button>
        </div>
        <ConfirmationDialog
          action="Delete URL"
          button={
            <Button className="border-red-500" variant="outline" size="sm">
              <Trash className="text-red-500" />
            </Button>
          }
          callback={onDelete}
          isLoading={isLoading}
        />
      </CardFooter>

    </Card>
  );
}

export default MyShortUrlCard;