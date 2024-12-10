import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/presentation/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';

const formSchema = z.object({
  email: z.string().email()
});

interface Props {
  buttonText: string;
  location: string;
}

const EmailForm = ({ buttonText, location }: Props) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
 
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email } = values;
    window.location.href = `${location}?email=${encodeURIComponent(email)}`;
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
