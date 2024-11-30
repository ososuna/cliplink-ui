import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import { useForm } from '@/infrastructure/hooks/useForm';

const ShortenForm = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const { form, onChange } = useForm({ longUrl: '' });
  const { longUrl } = form;
  
  const handleClick = () => {
    setIsLoading(true);
    // todo: http call
    window.location.href = '/short/asd';
    setIsLoading(false);
  };

  return (
    <>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">          
            <Label htmlFor="longUrl">Long URL</Label>
            <Input
              type="text"
              autoComplete="off"
              id="longUrl"
              placeholder="https://example.com/very/long/url"
              required
              value={ longUrl }
              onChange={ (event) => onChange(event, 'longUrl') }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={ handleClick } type="button">
          { isLoading ? (
            <><Loader2 className="animate-spin" /> Loading</>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </CardFooter>
    </>
  );
};

export default ShortenForm;
