import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { navigate } from 'astro:transitions/client';
import { AuthRepositoryImpl, AuthServiceImpl } from '@/infrastructure';
import { useService } from '@/presentation/hooks/use-service';
import { useToast } from '@/presentation/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button
} from '@/presentation/styled-components';

const formSchema = z.object({
  password: z.string().min(8).max(128),
  confirmPassword: z.string().min(8).max(128)
}).refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

interface Props {
  token: string;
}

const ResetPasswordForm = ({ token }: Props) => {

  const [ isLoading, setIsLoading ] = useState(false);
  const authService = useService(AuthRepositoryImpl, AuthServiceImpl);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;
    setIsLoading(true);
    const user = await authService.updatePassword(token, password);
    if ( user ) {
      await navigate('/dashboard');
      toast({
        title: 'Password updated 🎉',
        description: 'Your password has been successfully updated',
      });
      return;
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={ form.handleSubmit(onSubmit) } className='space-y-2'>
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
            'Reset password'
          )}
        </Button>
      </form>
    </Form>    
  );
};

export default ResetPasswordForm;
