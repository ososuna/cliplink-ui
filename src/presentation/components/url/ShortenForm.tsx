import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Loader2 } from 'lucide-react';

import { Button } from '../ui/button';
import { CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  longUrl: z.string().url()
});

const ShortenForm = () => {

  const [ isLoading, setIsLoading ] = useState(false);
  
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: '',
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { longUrl } = values;
    console.log(longUrl);
    setIsLoading(true);
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
                  name="longUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Long URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example/long/url" {...field} />
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
