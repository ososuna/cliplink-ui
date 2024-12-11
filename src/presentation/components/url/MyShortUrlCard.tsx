import type { Url } from '@/domain';
import { Button } from '@/presentation/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/presentation/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/presentation/components/ui/tooltip"

export interface Props {
  url: Url
}

const ShortUrlCard: React.FC<Props> = ({ url }) => {

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
      <CardContent>
        <p className="text-sm text-muted-foreground">Clicks: 4</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(url.shortId)}>
          Copy
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.open(url.shortId, '_blank')}>
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ShortUrlCard;