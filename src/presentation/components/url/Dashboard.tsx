import { useState, type ChangeEvent } from 'react';

import type { Page, Url } from '@/domain';

import { UrlServiceImpl, UrlViewServiceImpl } from '@/infrastructure';

import CardsPagination from '@/presentation/components/url/CardsPagination';
import CreateShortUrlDialog from '@/presentation/components/url/CreateShortUrlDialog';
import MyShortUrlCard from '@/presentation/components/url/MyShortUrlCard';
import UrlSearchBar from '@/presentation/components/url/UrlSearchBar';
import { useService } from '@/presentation/hooks/use-service';

interface Props {
  page: Page<Url>;
}

const Dashboard = ({ page: initialPage }: Props) => {

  const [urls, setUrls] = useState<Url[]>(initialPage.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage.page);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);

  const itemsPerPage = 9;

  const fetchUrls = async (page: number, term: string) => {
    const data = await urlService.getUrls(page, itemsPerPage, term);
    if (data) {
      setUrls(data.items);
      setTotalPages(data.totalPages);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    if (initialPage.total > 0) {
      fetchUrls(1, event.target.value);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUrls(page, searchTerm);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 gap-4">
        <UrlSearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <CreateShortUrlDialog />
      </div>

      {urls.length === 0 ? (
        searchTerm && initialPage.total > 0 ? (
          <p className="px-8 text-center text-sm text-muted-foreground">
            No URLs found matching "<strong>{searchTerm}</strong>". Please try a
            different search term.
          </p>
        ) : (
          <p className="px-8 text-center text-sm text-muted-foreground">
            You haven't shortened any URLs yet. Click the <strong>"Shorten
              URL"</strong> button to shorten your first URL.
          </p>
        )
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urls.map((url: Url) => (
              <MyShortUrlCard key={url.id} url={url} />
            ))}
          </div>
          <div className="mt-6">
            <CardsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
