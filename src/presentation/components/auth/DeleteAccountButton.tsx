import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Messages } from '@/config';
import { AuthRepositoryImpl, AuthServiceImpl } from '@/infrastructure';
import { useService } from '@/presentation/hooks/use-service';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/presentation/styled-components';

const confirmPhrase = 'Delete my account';

const formSchema = z.object({
  confirm: z.string().refine((value) => value.toLowerCase() === confirmPhrase.toLowerCase(), {
    message: Messages.CONFIRM_PHRASE(confirmPhrase)
  }),
});

const DeleteAccountButton = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: '',
    }
  });

  const authService = useService(AuthRepositoryImpl, AuthServiceImpl);

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