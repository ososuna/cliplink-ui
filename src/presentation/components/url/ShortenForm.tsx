import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from 'lucide-react';

import { CreateUrlDto, CreateUrl } from '@/domain';
import { UrlServiceImpl } from '@/infrastructure';

import { Button } from '../ui/button';
import { CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

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
  })
 
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { originalUrl } = values;
    const [error, createUrlDto] = CreateUrlDto.create({ originalUrl });
    if (error) {
      // Show alert to the user
      console.log(error);
      setIsLoading(false);
      return;
    }
    // create use case instance
    new CreateUrl(new UrlServiceImpl())
      .execute(createUrlDto!)
      .then(data => {
        console.log('created url !!');
        console.log(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
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
