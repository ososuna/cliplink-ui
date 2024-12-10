import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AuthServiceImpl } from '@/infrastructure';

import { AuthViewService } from '@/presentation';
import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';

const formSchema = z.object({
  password: z.string()
});

const PasswordForm = () => {

  const [ isLoading, setIsLoading ] = useState(false);

  const emailToLogin = useRef<string | null>('');
  
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

  const viewService = new AuthViewService(new AuthServiceImpl(), setIsLoading);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;
    await viewService.loginByEmail(emailToLogin.current!, password);
  }

  return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) }>
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
        <Button className="w-full mt-2" type="submit">
          { isLoading ? (
            <><Loader2 className="animate-spin" /> Loading...</>
          ) : (
            'Log in'
          )}
        </Button>
      </form>
    </Form>    
  );
};

export default PasswordForm;
