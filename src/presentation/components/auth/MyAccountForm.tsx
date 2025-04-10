import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { User } from '@/domain';
import { Messages } from '@/config';
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
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/presentation/styled-components';

interface Props {
  user: User
}

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
  email: z.string().email({
    message: Messages.VALID_EMAIL
  }),
});

const MyAccountForm = ({user: initialUser}: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const authService = useService(AuthRepositoryImpl, AuthServiceImpl);
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
    // Filter modified values
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(values).filter(
        ([key, value]) => value !== initialUser[key as keyof typeof initialUser]
      )
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      toast({
        title: 'No changes detected',
        description: 'Please modify at least one field before updating',
      });
      return;
    }
    setIsLoading(true);
    const user = await authService.update(fieldsToUpdate.name, fieldsToUpdate.lastName, fieldsToUpdate.email);
    if ( user ) {
      await navigate(window.location.href);
      toast({
        title: 'Profile updated 🎉',
        description: 'Your profile has been successfully updated',
      });
    }
    setIsLoading(false);
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