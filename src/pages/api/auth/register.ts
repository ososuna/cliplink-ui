import type { APIRoute } from 'astro';
import { makeRegister } from '@/lib/server-container';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email, name, lastName, password } = body;

    if (!email || !name || !lastName || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const registerUseCase = makeRegister();
    const result = await registerUseCase.execute({ email, name, lastName, password });

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
