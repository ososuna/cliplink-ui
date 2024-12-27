import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { navigate } from 'astro:transitions/client';

import { Messages } from '@/config';

import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useToast } from '@/presentation/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({
    message: Messages.VALID_EMAIL
  })
});

interface Props {
  buttonText: string;
  location: string;
}

const EmailForm = ({ buttonText, location }: Props) => {

  const { toast } = useToast();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('error')) {
      toast({
        title: 'Something went wrong',
        description: url.searchParams.get('error'),
        variant: 'destructive'
      });
      url.searchParams.delete('error');
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
 
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email } = values;
    navigate(`${location}?email=${encodeURIComponent(email)}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) }>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" autoComplete='off' placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-2" type="submit">
          { buttonText }
        </Button>
      </form>
    </Form>
  );
};

export default EmailForm;
