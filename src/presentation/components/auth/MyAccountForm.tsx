import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
    const { name, lastName, email } = values;

    const fieldsToUpdate: {name: string | undefined, lastName: string | undefined, email: string | undefined}
      = {name: undefined, lastName: undefined, email: undefined};

    if (name !== initialUser.name) {
      fieldsToUpdate.name = name;
    }

    if (lastName !== initialUser.lastName) {
      fieldsToUpdate.lastName = lastName;
    }

    if (email !== initialUser.email) {
      fieldsToUpdate.email = email;
    }

    setIsLoading(true);
    const user = await authService.update(fieldsToUpdate.name, fieldsToUpdate.lastName, fieldsToUpdate.email);
    setIsLoading(false);
    if ( user ) {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
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