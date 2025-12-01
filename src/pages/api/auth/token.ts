import type { APIRoute } from 'astro';
import { makeCheckToken } from '@/lib/server-container';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const accessToken = cookies.get('access_token')?.value;

    const checkTokenUseCase = makeCheckToken(accessToken);
    const result = await checkTokenUseCase.execute(accessToken);

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result.value), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
