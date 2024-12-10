import CreateShortUrlDialog from '@/presentation/components/url/CreateShortUrlDialog';
import MyShortUrlCard from '@/presentation/components/url/MyShortUrlCard';
import UrlSearchBar from '@/presentation/components/url/UrlSearchBar';

const Dashboard = () => {

  const mockShortUrls = [

  ] as any;

  return (
    <>
      <div className="flex justify-between items-center mb-6 gap-4">
        <UrlSearchBar />
        <CreateShortUrlDialog />
      </div>
      {mockShortUrls.length === 0
        ?
        <p className="px-8 text-center text-sm text-muted-foreground">
          You haven't shortened any URLs yet. Click the <strong>"Shorten URL"</strong> button to shorten your first URL.
        </p>
        :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockShortUrls.map((url: any) => (
            <MyShortUrlCard url={url} />
          ))}
        </div>}
    </>
  );

}

export default Dashboard;