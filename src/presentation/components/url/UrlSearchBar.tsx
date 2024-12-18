import type { ChangeEvent } from 'react';
import { Input } from '@/presentation/components/ui/input';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const UrlSearchBar = ({ searchTerm, handleSearchChange }: Props) => {
  return (
    <div className="flex-grow">
    <Input
      type="text"
      placeholder="Search URLs..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="w-full"
    />
    </div>
  );

}

export default UrlSearchBar;