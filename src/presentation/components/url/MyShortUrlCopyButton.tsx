import { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { envs } from '@/config';
import { Button } from '@/presentation/components/ui/button';
import { useToast } from '@/presentation/hooks/use-toast';

interface Props {
  id: string;
}

const MyShortUrlCopyButton = ({ id }: Props) => {

  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const onCopy = () => {
    const domain = envs.PUBLIC_APP_DOMAIN || window.location.hostname;
    navigator.clipboard.writeText(`${domain}/${id}`).then(() => {
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
    <Button aria-label="Copy" variant="outline" size="sm" onClick={onCopy}>
      {isCopied ? <Check className="text-green-500" /> : <Clipboard />}
    </Button>
  );

};

export default MyShortUrlCopyButton;
