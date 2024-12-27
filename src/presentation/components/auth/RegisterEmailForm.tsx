import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Messages } from '@/config';

import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useService } from '@/presentation/hooks/use-service';
import { navigate } from 'astro:transitions/client';

const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: Messages.STRING_MIN('name', 2)
  }).max(60, {
    message: Messages.STRING_MAX('name', 60)
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

  const [ isLoading, setIsLoading ] = useState(false);
  const emailToRegister = useRef<string | null>('');
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    emailToRegister.current = params.get('email');
  }, []);

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, lastName, password } = values;
    setIsLoading(true);
    const user = await authService?.registerByEmail(emailToRegister.current!, name, lastName, password);
    if (user) {
      await navigate('/dashboard');
      return;
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-2'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
          { isLoading ? 'Registering...' : 'Register' }
        </Button>
      </form>
    </Form>
  );
};

export default RegisterEmailForm;
