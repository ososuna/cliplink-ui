import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import type { User } from '@/domain';

import { Messages } from '@/config';

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

const MyAccountFormPreview = ({user: initialUser}: Props) => {

  const defaultValues = {
    name: initialUser.name,
    lastName: initialUser.lastName,
    email: initialUser.email,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
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
                    <Input disabled {...field} />
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
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled>
              Loading...
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default MyAccountFormPreview;