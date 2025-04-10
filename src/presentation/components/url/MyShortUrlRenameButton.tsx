import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextCursorInput } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Messages } from '@/config';
import { UrlRepositoryImpl, UrlServiceImpl } from '@/infrastructure';
import { useToast } from '@/presentation/hooks/use-toast';
import {
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
  Input,
  Button
} from '@/presentation/styled-components';

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: Messages.REQUIRED_FIELD('name')
  }).max(80, {
    message: Messages.STRING_MAX('name', 80)
  })
});

interface Props {
  urlId: string;
  name?: string;
}

const MyShortUrlRenameButton = ({ urlId, name: initialName }: Props) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName ? initialName : ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name } = values;
    if (!name) {
      toast({
        title: 'Name required',
        description: Messages.REQUIRED_FIELD('name')
      });
      return;
    }
    if (name === initialName) {
      toast({
        title: 'No changes detected',
        description: 'Please modify the name before updating',
      });
      return;
    }
    setIsLoading(true);
    const url = await new UrlServiceImpl(new UrlRepositoryImpl()).rename(urlId, name);
    if (url) {
      await navigate(window.location.href);
      toast({
        title: 'URL renamed 🎉',
        description: Messages.RENAME_SUCCESSFUL
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <Button aria-label="Rename" variant="outline" size="sm">
        <TextCursorInput />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename URL</DialogTitle>
        <DialogDescription>Enter your new URL name</DialogDescription>
      </DialogHeader>
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
          <DialogFooter className="sm:justify-start">
            <Button disabled={isLoading} className="mt-2" type="submit">
              { isLoading
                ? 'Loading...'
                : 'Rename'
              }
            </Button>
          </DialogFooter>
        </form>
      </Form>

    </DialogContent>
  </Dialog>
  );
}

export default MyShortUrlRenameButton;