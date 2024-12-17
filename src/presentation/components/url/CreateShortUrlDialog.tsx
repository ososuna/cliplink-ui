import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { UrlServiceImpl, UrlViewServiceImpl } from '@/infrastructure';

import { useService } from '@/presentation/hooks/use-service';
import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';

const formSchema = z.object({
  name: z.string().max(80).optional(),
  longUrl: z.string().url()
});

const CreateShortUrlDialog = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);

  const onShortenUrl = async (values: z.infer<typeof formSchema>) => {
    const { name, longUrl } = values;
    setIsLoading(true);
    await urlService?.createUrl(longUrl, name);
    setIsLoading(false);
    window.location.href = ('/dashboard');
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
              <Button className="w-full mt-2" type="submit">
                {isLoading ? (
                  <><Loader2 className="animate-spin" /> Loading...</>
                ) : (
                  'Shorten URL'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateShortUrlDialog;