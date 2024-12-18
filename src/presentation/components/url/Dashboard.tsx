import { useEffect, useState } from 'react';

import type { Page, Url } from '@/domain';

import { UrlServiceImpl, UrlViewServiceImpl } from '@/infrastructure';

import { useService } from '@/presentation/hooks/use-service';
import CreateShortUrlDialog from '@/presentation/components/url/CreateShortUrlDialog';
import MyShortUrlCard from '@/presentation/components/url/MyShortUrlCard';
import UrlSearchBar from '@/presentation/components/url/UrlSearchBar';
import CardsPagination from '@/presentation/components/url/CardsPagination';

interface Props {
  page: Page<Url>;
}

const Dashboard = ({ page: initialPage }: Props) => {

  const [urls, setUrls] = useState<Url[]>(initialPage.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUrls, setFilteredUrls] = useState<Url[]>(initialPage.items);
  const [currentPage, setCurrentPage] = useState(initialPage.page);
  const [totalPages, setTotalPages] = useState(initialPage.totalPages);
  const urlService = useService(UrlServiceImpl, UrlViewServiceImpl);

  const itemsPerPage = 9;

  // Fetch URLs for the current page
  const fetchUrls = async (page: number) => {
    const data = await urlService.getUrls(page, itemsPerPage);
    if (data) {
      setUrls(data.items);
      setTotalPages(data.totalPages);
    }
  };

  // Filter URLs based on the search term
  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    setFilteredUrls(
      urls.filter(
        (url) =>
          url.name?.toLowerCase().includes(lowerSearchTerm) ||
          url.shortId?.toLowerCase().includes(lowerSearchTerm) ||
          url.originalUrl?.toLowerCase().includes(lowerSearchTerm)
      )
    );
  }, [searchTerm, urls]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchUrls(page);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6 gap-4">
        <UrlSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CreateShortUrlDialog />
      </div>

      {filteredUrls.length === 0 ? (
        searchTerm && urls.length > 0 ? (
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
            {filteredUrls.map((url: Url) => (
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
