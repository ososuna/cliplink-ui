import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import useDeleteUrl from '@/url/components/islands/hooks/use-delete-url';
import { Trash } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styled-components';
import { useToast } from '@/hooks/use-toast';

interface Props {
  id: string
}

const DeleteUrlDialog = ({ id }: Props) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteUrl, isLoading } = useDeleteUrl();
  const { toast } = useToast();

  const onConfirm = async () => {
    const result = await deleteUrl(id);
    if (result.ok) {
      navigate(window.location.href);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to delete URL',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Delete" className="border-red-500" variant="outline" size="sm">
          <Trash className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this short URL?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button disabled={isLoading} variant="destructive" className="mt-2" type="button" onClick={onConfirm}>
            {isLoading
              ? 'Loading...'
              : 'Delete URL'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUrlDialog;