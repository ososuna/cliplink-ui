import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { useService } from '@/presentation/hooks/use-service';
import { AuthServiceImpl, AuthViewServiceImpl } from '@/infrastructure';

const confirmPhrase = 'Delete my account';

const formSchema = z.object({
  confirm: z.string().refine((value) => value.toLowerCase() === confirmPhrase.toLowerCase(), {
    message: `Please type "${confirmPhrase}" to confirm`,
  }),
});

const DeleteAccountButton = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: '',
    }
  });

  const authService = useService(AuthServiceImpl, AuthViewServiceImpl);

  const onSubmit = async() => {
    await authService.deleteAccount(); 
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-red-500 mt-5" variant="outline">
          <Trash2Icon className="mr-2 h-4 w-4 text-red-500" /><span className='text-red-500'>Delete Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            Type <strong>"{confirmPhrase}"</strong> to confirm.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type to confirm</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button variant="destructive" className="mt-2" type="submit">
                Delete Account
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountButton;