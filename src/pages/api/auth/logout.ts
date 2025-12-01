import type { APIRoute } from 'astro';
import { makeLogout } from '@/lib/server-container';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const accessToken = cookies.get('access_token')?.value;

    const logoutUseCase = makeLogout(accessToken);
    const result = await logoutUseCase.execute();

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Clear cookies
    cookies.delete('access_token');
    cookies.delete('refresh_token');

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
