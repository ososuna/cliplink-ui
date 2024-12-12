import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getUrlViewService } from '@/presentation/store/service-store';
import { Button } from '@/presentation/components/ui/button';
import { CardContent, CardFooter } from '@/presentation/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';

const formSchema = z.object({
  originalUrl: z.string().url()
});

const ShortenForm = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: '',
    },
  });
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { originalUrl } = values;
    setIsLoading(true);
    const url = await getUrlViewService().createUrl(originalUrl);
    setIsLoading(false);
    if ( url ) window.location.href = `/short/${url.shortId}`;
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={ form.handleSubmit(onSubmit) }>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col">          
                <FormField
                  control={form.control}
                  name="originalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long URL</FormLabel>
                      <FormControl>
                        <Input autoComplete='off' placeholder="https://example/long/url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              { isLoading ? (
                <><Loader2 className="animate-spin" /> Shortening...</>
              ) : (
                'Shorten URL'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

export default ShortenForm;
