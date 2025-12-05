import { navigate } from 'astro:transitions/client';
import { useState, useEffect, type ChangeEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/styled-components';

interface Props {
  searchTerm: string;
  pageNumber: number;
  size: number;
}

const UrlSearchBar = ({ searchTerm: initialSearchTerm, pageNumber, size }: Props) => {

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm === initialSearchTerm) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const timeoutId = setTimeout(() => {
      navigate(`/dashboard?page=${pageNumber}&size=${size}&search=${searchTerm}`);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, pageNumber, size, initialSearchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="flex-grow relative">
      <Input
        type="text"
        placeholder="Search URLs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

export default UrlSearchBar;