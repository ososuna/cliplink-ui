import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/presentation/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/presentation/components/ui/dialog';

interface Props {
  button: React.ReactNode;
  action: string;
  isLoading: boolean;
  callback: Function;
}

const ConfirmationDialog = ({ button, action, callback, isLoading }: Props) => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onConfirm = () => {
    callback();
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button variant="destructive" className="mt-2" type="button" onClick={ onConfirm }>
            {isLoading
              ? (<><Loader2 className="animate-spin" /> Loading...</>)
              : (action)
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationDialog;