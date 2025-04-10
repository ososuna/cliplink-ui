import {
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/presentation/styled-components';

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