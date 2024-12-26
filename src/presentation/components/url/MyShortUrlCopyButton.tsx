import { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { useToast } from '@/presentation/hooks/use-toast';

interface Props {
  id: string;
}

const MyShortUrlCopyButton = ({ id }: Props) => {

  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    navigator.clipboard.writeText(`${window.location.hostname}/${id}`).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    })
    .catch(() => {
      toast({
        title: 'Something went wrong',
        description: 'Failed to copy URL',
        variant: 'destructive'
      });
    })
  };

  return (
    <Button variant="outline" size="sm" onClick={onCopy}>
      {isCopied ? <Check className="text-green-500" /> : <Clipboard />}
    </Button>
  );

};

export default MyShortUrlCopyButton;