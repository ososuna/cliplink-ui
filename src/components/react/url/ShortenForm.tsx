import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { setUiError } from '@/store/ui.store';
import { Messages } from '@/config';
import { makeCreateUrlAsGuest } from '@/lib/client-container';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';


const formSchema = z.object({
  originalUrl: z.string().url({
    message: Messages.VALID_URL
  })
});

const ShortenForm: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { originalUrl } = values;
    setIsLoading(true);

    const createGuestUrlUseCase = makeCreateUrlAsGuest();
    const result = await createGuestUrlUseCase.execute({ originalUrl });

    setIsLoading(false);

    if (result.ok) {
      navigate(`/short/${result.value.shortId}`);
    } else {
      setUiError({
        message: result.error.message,
        type: 'error'
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              {isLoading ? (
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
