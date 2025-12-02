import type { APIRoute } from 'astro';
import { makeCreateGuestUrl } from '@/lib/server-container';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { originalUrl } = body;

    if (!originalUrl) {
      return new Response(JSON.stringify({ error: 'Original URL is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const createGuestUrlUseCase = makeCreateGuestUrl();
    const result = await createGuestUrlUseCase.execute({ originalUrl });

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result.value), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};