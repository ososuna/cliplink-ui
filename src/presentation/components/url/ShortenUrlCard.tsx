import { useState } from 'react';
import { ExternalLink } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';

import { Label } from '@/presentation/components/ui/label';
import { Input } from '@/presentation/components/ui/input';
import { Button } from '@/presentation/components/ui/button';
import { CopyInput } from '@/presentation/components/ui/copy-input';


const URLShortener = () => {
  const [urlShorten, setUrlShorten] = useState(false);

  const onShortenURL = () => {
    console.log('Button clicked');
    setUrlShorten(!urlShorten);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>URL Shortener</CardTitle>
        { !urlShorten && ( <CardDescription>Enter a long URL to get a shortened version.</CardDescription> )}
        { urlShorten && ( <CardDescription>Shortened version of your long URL.</CardDescription> )}
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            { urlShorten ? (
              <>
                <Label htmlFor="longUrl">Short URL</Label>
                <CopyInput value="https://example.com/very-long-url" />
              </>
            ) : (
              <>
                <Label htmlFor="longUrl">Long URL</Label>
                <Input
                  id="longUrl"
                  placeholder="https://example.com/very/long/url"
                  required
                />
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        { urlShorten ? (
          <div className='flex space-x-4'>
            <Button type="button">
              <ExternalLink /> Open Short URL
            </Button>
            <Button onClick={() => onShortenURL()} type="button">
              Shorten another URL
            </Button>
          </div>
        ) : (
          <Button onClick={() => onShortenURL()} type="button">
            Shorten URL
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default URLShortener;
