import { envs } from '@/config';

export async function GET({ params }: { params: { shortId: string } }) {
  const { shortId } = params;
  return new Response(null, {
    status: 308,
    headers: {
      Location: `${envs.PUBLIC_API_DOMAIN}/${shortId}`,
    },
  });
}
