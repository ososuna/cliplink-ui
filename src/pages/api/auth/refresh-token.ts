import type { APIRoute } from 'astro';
import { makeRefreshToken } from '@/lib/server-container';

export const GET: APIRoute = async ({ cookies }) => {
  try {
    const refreshToken = cookies.get('refresh_token')?.value;

    const refreshTokenUseCase = makeRefreshToken(refreshToken);
    const result = await refreshTokenUseCase.execute(refreshToken);

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
