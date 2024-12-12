import { Check, Clipboard, ExternalLink, Trash } from 'lucide-react';
import { useState } from 'react';

import type { Url } from '@/domain';

import { getUrlViewService } from '@/infrastructure';

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

  const onCopy = () => {
    navigator.clipboard.writeText(`localhost:3000/${url.shortId}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const onDelete = async () => {
    setIsLoading(true);
    await getUrlViewService().deleteUrl(url.id);
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
      <CardFooter className="grid grid-cols-3 justify-items-start">
        <Button className="columns-2" variant="outline" size="sm" onClick={onCopy}>
          {
            isCopied ? <><Check className="text-green-500" /> Copied </> : <><Clipboard /> Copy</>
          }
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(url.originalUrl, '_blank')}>
          <ExternalLink /> Visit
        </Button>
        <ConfirmationDialog
          action='Delete URL'
          button={<Button className="justify-self-end" variant="destructive" size="sm"><Trash /></Button>}
          callback={onDelete}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
}

export default MyShortUrlCard;