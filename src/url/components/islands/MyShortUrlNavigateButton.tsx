import { ExternalLink } from 'lucide-react';
import { Button } from '@/styled-components';
import useIncrementUrlClicks from '@/url/components/islands/hooks/use-increment-url-clicks';

interface Props {
  url: string;
  shortId: string;
  onClick?: () => void;
}

const MyShortUrlNavigateButton = ({ url, shortId, onClick }: Props) => {

  const { incrementUrlClicks } = useIncrementUrlClicks();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    incrementUrlClicks(shortId);
    window.open(url, '_blank');
  };

  return (
    <Button aria-label="Navigate" variant="outline" size="sm" onClick={handleClick}>
      <ExternalLink />
    </Button>
  );

};

export default MyShortUrlNavigateButton;
