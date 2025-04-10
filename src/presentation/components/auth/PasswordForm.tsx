import { zodResolver } from '@hookform/resolvers/zod';
import { navigate } from 'astro:transitions/client';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Messages } from '@/config';

import { AuthRepositoryImpl, AuthServiceImpl } from '@/infrastructure';


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Button
} from '@/presentation/styled-components';

import { useService } from '@/presentation/hooks/use-service';

const formSchema = z.object({
  password: z.string().nonempty({
    message: Messages.PASSWORD_REQUIRED
  })
});

const PasswordForm = () => {

  const [isLoading, setIsLoading] = useState(false);  
  const emailToLogin = useRef<string | null>('');
  const authService = useService(AuthRepositoryImpl, AuthServiceImpl);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    emailToLogin.current = params.get('email');
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;
    setIsLoading(true);
    const user = await authService?.loginByEmail(emailToLogin.current!, password);
    if (user) {
      navigate('/dashboard');
      return;
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" autoComplete='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full mt-2" type="submit">
          { isLoading ? 'Logging in...' : 'Log in' }
        </Button>
      </form>
    </Form>
  );
};

export default PasswordForm;
