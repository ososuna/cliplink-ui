import { Input } from '@/presentation/components/ui/input';

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const UrlSearchBar = ({ searchTerm, setSearchTerm }: Props) => {
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