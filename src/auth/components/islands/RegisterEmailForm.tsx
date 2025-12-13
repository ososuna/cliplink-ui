import { navigate } from 'astro:transitions/client';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Messages } from '@/config';
import useRegister from '@/auth/components/islands/hooks/use-register';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
} from '@/styled-components';

const formSchema = z.object({
  firstName: z.string().trim().min(2, {
    message: Messages.STRING_MIN('first name', 2)
  }).max(60, {
    message: Messages.STRING_MAX('first name', 60)
  }),
  lastName: z.string().trim().min(2, {
    message: Messages.STRING_MIN('last name', 2)
  }).max(120, {
    message: Messages.STRING_MAX('last name', 120)
  }),
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128)
}).refine((values) => values.password === values.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}
);

const RegisterEmailForm = () => {

  const { isLoading, register } = useRegister();
  const emailToRegister = useRef<string | null>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    emailToRegister.current = params.get('email');
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { firstName, lastName, password } = values;

    const { ok, error } = await register({
      email: emailToRegister.current!,
      firstName,
      lastName,
      password
    });

    if (ok) {
      await navigate('/dashboard');
      return;
    }

    toast({
      title: 'Registration failed',
      description: error || Messages.INTERNAL_SERVER_ERROR,
      variant: 'destructive'
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm your password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? 'Registering...' : 'Register'}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterEmailForm;
