import type { Url } from '@/domain';
import CreateShortUrlDialog from '@/presentation/components/url/CreateShortUrlDialog';
import MyShortUrlCard from '@/presentation/components/url/MyShortUrlCard';
import UrlSearchBar from '@/presentation/components/url/UrlSearchBar';

interface Props {
  urls: Url[]
}

const Dashboard = ({ urls }: Props) => {

  return (
    <>
      <div className="flex justify-between items-center mb-6 gap-4">
        <UrlSearchBar />
        <CreateShortUrlDialog />
      </div>
      {urls.length === 0
        ?
        <p className="px-8 text-center text-sm text-muted-foreground">
          You haven't shortened any URLs yet. Click the <strong>"Shorten URL"</strong> button to shorten your first URL.
        </p>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urls.map((url: Url) => (
            <MyShortUrlCard key={url.id} url={url} />
          ))}
        </div>}
    </>
  );

}

export default Dashboard;