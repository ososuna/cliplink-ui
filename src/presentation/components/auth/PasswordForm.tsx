import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useService } from '@/presentation/hooks/use-service';
import { navigate } from 'astro:transitions/client';

const formSchema = z.object({
  password: z.string()
});

const PasswordForm = () => {

  const [isLoading, setIsLoading] = useState(false);  
  const emailToLogin = useRef<string | null>('');
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);

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
