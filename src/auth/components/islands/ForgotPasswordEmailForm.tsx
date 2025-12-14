import { navigate } from 'astro:transitions/client';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useForgotPassword from '@/auth/components/islands/hooks/use-forgot-password';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/config';
import {
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/styled-components';

const formSchema = z.object({
  email: z.string().email({
    message: Messages.VALID_EMAIL
  })
});

interface Props {
  buttonText: string;
}

const ForgotPasswordEmailForm = ({ buttonText }: Props) => {

  const { toast } = useToast();
  const { isLoading, sendForgotPasswordEmail } = useForgotPassword();

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values;

    const response = await sendForgotPasswordEmail({ email });

    if (!response) {
      toast({
        title: 'Something went wrong',
        description: Messages.INTERNAL_SERVER_ERROR,
        variant: 'destructive'
      });
    } else {
      navigate(`/auth/forgot-password/confirm?email=${encodeURIComponent(email)}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button disabled={isLoading} className="w-full mt-2" type="submit">
          {isLoading ? 'Sending email...' : buttonText}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordEmailForm;
