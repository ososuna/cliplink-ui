import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { User } from '@/domain';

import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

import { Button } from '@/presentation/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/presentation/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useService } from '@/presentation/hooks/use-service';
import { useToast } from '@/presentation/hooks/use-toast';

interface Props {
  user: User
}

const formSchema = z.object({
  name: z.string().min(2).max(60),
  lastName: z.string().min(2).max(120),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

const MyAccountForm = ({user: initialUser}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);
  const { toast } = useToast();

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('updated') === 'true') {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
      url.searchParams.delete('updated');
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [toast]);

  const defaultValues = {
    name: initialUser.name,
    lastName: initialUser.lastName,
    email: initialUser.email,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
    // Filter modified values
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== initialUser[key as keyof typeof initialUser]
      )
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      toast({
        title: 'No changes detected',
        description: 'Please modify at least one field before updating.',
      });
      return;
    }

    setIsLoading(true);
    const user = await authService.update(fieldsToUpdate.name, fieldsToUpdate.lastName, fieldsToUpdate.email);
    setIsLoading(false);
    if ( user ) {
      const url = new URL(window.location.href);
      url.searchParams.set('updated', 'true');
      window.location.href = url.toString();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default MyAccountForm;