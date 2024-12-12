import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { getAuthViewService } from '@/presentation/store/service-store';

const formSchema = z.object({
  name: z.string().min(2).max(60),
  lastName: z.string().min(2).max(120),
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
    await getAuthViewService().registerByEmail(emailToRegister.current!, name, lastName, password);
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
        <Button className="w-full" type="submit">
          { isLoading ? (
            <><Loader2 className="animate-spin" /> Loading...</>
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Form>    
  );
};

export default RegisterEmailForm;
