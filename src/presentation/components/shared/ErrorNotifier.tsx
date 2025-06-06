import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { setUiError, uiError } from '@/infrastructure';
import { useToast } from '@/presentation/hooks/use-toast';
import { Toaster } from '@/presentation/styled-components';

const ErrorNotifier = () => {

  const { toast, dismiss } = useToast();
  const $uiError = useStore(uiError);

  useEffect(() => {
    const handleBeforeSwap = () => {
      setUiError({ message: '', type: '' });
      dismiss();
    };
    document.addEventListener('astro:before-swap', handleBeforeSwap);
    return () => {
      document.removeEventListener('astro:before-swap', handleBeforeSwap);
    };
  }, []);

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
