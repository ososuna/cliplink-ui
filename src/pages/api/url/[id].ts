import type { APIRoute } from 'astro';
import { makeDeleteUrl, makeRenameUrl } from '@/lib/server-container';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  try {
    const accessToken = cookies.get('access_token')?.value;
    const { id } = params;
    const body = await request.json();
    const { name } = body;

    if (!id || !name) {
      return new Response(JSON.stringify({ error: 'ID and name are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const renameUrlUseCase = makeRenameUrl(accessToken);
    const result = await renameUrlUseCase.execute(id, name);

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
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

export const DELETE: APIRoute = async ({ params, cookies }) => {
  try {
    const accessToken = cookies.get('access_token')?.value;
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deleteUrlUseCase = makeDeleteUrl(accessToken);
    const result = await deleteUrlUseCase.execute(id);

    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
