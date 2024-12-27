import { zodResolver } from '@hookform/resolvers/zod';
import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Messages } from '@/config';

import { UrlServiceImpl, UrlViewServiceImpl } from '@/infrastructure';

import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';

const formSchema = z.object({
  name: z.string().trim().max(80, {
    message: Messages.STRING_MAX('name', 80)
  }).optional(),
  longUrl: z.string().url({
    message: Messages.VALID_URL
  })
});

const CreateShortUrlDialog = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onShortenUrl = async (values: z.infer<typeof formSchema>) => {
    const { name, longUrl } = values;
    setIsLoading(true);
    await new UrlViewServiceImpl(new UrlServiceImpl()).createUrl(longUrl, name);
    navigate(window.location.href);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      longUrl: ''
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="whitespace-nowrap">Shorten URL</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Shorten URL</DialogTitle>
          <DialogDescription>Enter a long URL to get a shortened version.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onShortenUrl)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input type="text" autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading} className="w-full mt-2" type="submit">
                { isLoading
                  ? 'Loading...'
                  : 'Shorten URL'
                } 
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateShortUrlDialog;