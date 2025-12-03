import { navigate } from 'astro:transitions/client';
import { useState, type ChangeEvent } from 'react';
import { Input } from '@/styled-components';

interface Props {
  searchTerm: string;
  pageNumber: number;
  size: number;
}

const UrlSearchBar = ({ searchTerm: initialSearchTerm, pageNumber, size }: Props) => {

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    navigate(`/dashboard?page=${pageNumber}&size=${size}&search=${event.target.value}`);
  }

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