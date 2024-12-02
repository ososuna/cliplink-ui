import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import { uiError } from '@/infrastructure/store/ui.store';

import { Toaster } from '@/presentation/components/ui/toaster';
import { useToast } from '@/presentation/hooks/use-toast';

const ErrorNotifier = () => {

  const { toast } = useToast();
  const $uiError = useStore(uiError);

  useEffect(() => {
    const { type, message } = $uiError;
    if (type && message) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: message
      });
    }
  }, [$uiError]);

  return (
    <Toaster />
  );
};

export default ErrorNotifier;
