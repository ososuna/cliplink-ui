import { CardTitle } from '@/presentation/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/presentation/components/ui/tooltip';

interface Props {
  name: string;
}

const MyShortUrlNameTooltip = ({ name }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardTitle className="text-lg truncate flex-1">
            {name}
          </CardTitle>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default MyShortUrlNameTooltip;