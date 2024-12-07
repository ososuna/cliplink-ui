import { useState } from 'react';
import { Input } from '@/presentation/components/ui/input';

const UrlSearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-grow">
    <Input
      type="text"
      placeholder="Search URLs..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full"
    />
    </div>
  );

}

export default UrlSearchBar;