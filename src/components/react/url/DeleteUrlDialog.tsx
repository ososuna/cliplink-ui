import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';;

import { makeDeleteUrl } from '@/lib/client-container';

interface Props {
  id: string
}

const ConfirmationDialog = ({ id }: Props) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    setIsLoading(true);

    const deleteUrlUseCase = makeDeleteUrl();
    const result = await deleteUrlUseCase.execute(id);

    if (result.ok) {
      navigate(window.location.href);
    } else {
      console.error('Delete URL failed:', result.error.message);
    }
    setIsLoading(false);
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
          <Button disabled={isLoading} variant="destructive" className="mt-2" type="button" onClick={ onConfirm }>
            { isLoading
              ? 'Loading...'
              : 'Delete URL'
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;