# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClipLink is a URL shortener frontend built with Astro, React, and TailwindCSS. It follows a **Pragmatic Clean Architecture with BFF (Backend-For-Frontend) Pattern** to solve cookie handling issues between server and client components.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production (runs type checking + build)
pnpm run build

# Preview production build
pnpm run preview

# Lint/type check
pnpm run lint
```

## Environment Variables

Required environment variables in `.env`:
```env
PUBLIC_API_BASE_URL=     # Backend API URL (Java REST API)
PUBLIC_API_DOMAIN=       # API domain
PUBLIC_APP_NAME=         # Application name
```

## Architecture: Pragmatic Clean Architecture + BFF

### Key Architectural Decision: BFF Pattern

**Problem Solved**: Cookies behave differently in server components (Astro) vs client components (React Islands). HTTP-only cookies cannot be accessed properly from client-side JavaScript.

**Solution**: Backend-For-Frontend (BFF) pattern:
- **Server components** (Astro pages) → Use `server-container` → Call external API directly with cookies
- **Client components** (React islands) → Use `client-container` → Call local `/api/*` endpoints (BFF)
- **BFF endpoints** (`/api/*`) → Run server-side → Call external API with proper cookie access

### Directory Structure

```
src/
├── adapters/              # Infrastructure adapters
│   └── http/              # HTTP client abstraction
│
├── entities/              # Domain entities (interfaces)
│   ├── User.ts, Url.ts, Page.ts
│   └── errors.ts
│
├── repositories/          # Data access layer
│   ├── interfaces/        # Repository contracts
│   ├── server/            # 🔒 Server-side repos (use cookies)
│   └── client/            # 🌐 Client-side repos (call /api/*)
│
├── use-cases/             # Business logic (thin wrappers)
│   ├── auth/              # Authentication use cases
│   └── url/               # URL management use cases
│
├── lib/                   # Dependency injection
│   ├── server-container.ts   # Factory for server-side
│   └── client-container.ts   # Singleton for client-side
│
├── types/                 # Shared types
│   └── Result.ts          # Result<T, E> pattern
│
├── pages/                 # Astro pages and API routes
│   ├── api/               # 🎯 BFF Layer
│   │   ├── auth/          # Auth endpoints
│   │   └── urls/          # URL endpoints
│   └── *.astro            # Page routes
│
├── components/            # UI components
│   ├── ui/                # Generic UI components
│   ├── features/          # Feature-specific components
│   └── react/             # React islands
│
├── layouts/               # Page layouts
└── middleware.ts          # Authentication middleware
```

### Core Patterns

**1. Result Pattern**
All operations return `Result<T, E>` instead of throwing exceptions:
```typescript
const result = await useCase.execute(data);
if (!result.ok) {
  // Handle error: result.error
  return;
}
// Success: result.value
```

**2. Factory Pattern (Server-Side)**
Server-side use cases are created per-request with the user's token:
```typescript
const loginUseCase = makeLogin(accessToken);
```

**3. Singleton Pattern (Client-Side)**
Client-side repositories are singletons since they just call BFF endpoints:
```typescript
const loginUseCase = makeLogin(); // No token needed
```

**4. BFF Pattern**
Client components never call external API directly:
```
React Component → /api/auth/login (BFF) → Server Repository → External API
                                              ↓
                                         Accesses cookies properly
```

### Important Implementation Details

#### Server-Side Usage (Astro Pages)
```typescript
---
import { makeCheckToken } from '@/lib/server-container';

const token = Astro.cookies.get('access_token')?.value;
const checkTokenUseCase = makeCheckToken(token);
const result = await checkTokenUseCase.execute(token);

if (!result.ok) {
  return Astro.redirect('/login');
}

const user = result.value;
---
```

#### Client-Side Usage (React Components)
```typescript
import { makeLogin } from '@/lib/client-container';

const loginUseCase = makeLogin();
const result = await loginUseCase.execute({ email, password });

if (!result.ok) {
  setError(result.error.message);
  return;
}

// Success: result.value
```

#### BFF Endpoint Pattern
```typescript
// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { makeLogin } from '@/lib/server-container';

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json();
  const loginUseCase = makeLogin();
  const result = await loginUseCase.execute(body);

  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error.message }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(result.value), { status: 200 });
};
```

### Authentication Flow

1. **Login**: User submits credentials → BFF endpoint → Server repository → External API → Returns tokens
2. **Middleware**:
   - Runs on protected routes (`/dashboard`, `/my-account`, `/`)
   - Checks `access_token` cookie
   - Auto-refreshes using `refresh_token` if access token expired
   - Sets `locals.user` for downstream use
3. **Token Storage**: Tokens stored as HTTP-only cookies (secure, not accessible from JavaScript)
4. **Token Refresh**: Automatic in middleware when access token (1hr) expires, using refresh token (7 days)

### HTTP Client

All external API calls use the `FetchHttpClient` adapter:
- Implements `IHttpClient` interface
- Automatically adds credentials and headers
- Converts HTTP errors to Error instances
- Base URL from `PUBLIC_API_BASE_URL` environment variable

### Use Case Structure

Use cases are thin wrappers that:
1. Receive validated data
2. Call repository methods
3. Return Results

They do NOT:
- Validate input (should be done before calling)
- Handle navigation
- Directly manipulate UI state

### Repository Split

**Server Repositories** (`repositories/server/`):
- Used by Astro pages and BFF API endpoints
- Accept optional token parameter
- Call external API directly with cookies
- Return `Result<T>` types

**Client Repositories** (`repositories/client/`):
- Used by React islands/client components
- Call local `/api/*` BFF endpoints
- No token parameter needed (handled server-side)
- Return `Result<T>` types

## Critical Rules

### ❌ DON'T

1. **Don't call external API directly from React components**
   ```typescript
   // ❌ Bad - cookies won't work
   fetch('https://external-api.com/auth/login', { credentials: 'include' })
   ```

2. **Don't mix server and client containers**
   ```typescript
   // ❌ Bad - wrong container in React component
   import { makeLogin } from '@/lib/server-container';
   ```

3. **Don't use old domain/infrastructure imports**
   ```typescript
   // ❌ Bad - old architecture
   import { AuthServiceImpl } from '@/infrastructure';
   ```

### ✅ DO

1. **Use server-container in Astro pages and API endpoints**
   ```typescript
   import { makeLogin } from '@/lib/server-container';
   const loginUseCase = makeLogin(accessToken);
   ```

2. **Use client-container in React components**
   ```typescript
   import { makeLogin } from '@/lib/client-container';
   const loginUseCase = makeLogin(); // BFF handles auth
   ```

3. **Always handle Results properly**
   ```typescript
   const result = await useCase.execute(data);
   if (!result.ok) {
     // Handle error
     return;
   }
   // Use result.value
   ```

## Migration from Previous Architecture

See `MIGRATION_GUIDE.md` for detailed migration instructions from the old Clean Architecture.

Key changes:
- `domain/` → `entities/` + `use-cases/`
- `infrastructure/repositories/` → `repositories/server/`
- New: `repositories/client/` for client-side
- New: `pages/api/` for BFF layer
- DTOs removed (validation should happen at API boundary)
- Services removed (use cases handle business logic)
- Result pattern instead of exceptions

## Testing

Currently no test suite configured. When adding tests:
- Mock `IHttpClient` for repository tests
- Mock repositories for use case tests
- Test BFF endpoints with Astro's test utilities
- Test React components with React Testing Library

## Deployment

- Platform: Vercel
- Adapter: `@astrojs/vercel`
- Mode: SSR (Server-Side Rendering)
- Image service: Passthrough

## Common Tasks

### Adding a New Feature

1. Create entity interface in `entities/`
2. Create repository interface in `repositories/interfaces/`
3. Implement server repository in `repositories/server/`
4. Implement client repository in `repositories/client/`
5. Create use case(s) in `use-cases/`
6. Add factory functions to containers (`lib/`)
7. Create BFF API endpoints in `pages/api/`
8. Use in Astro pages or React components

### Adding New API Endpoint

1. Create file in `pages/api/`
2. Import use case factory from `@/lib/server-container`
3. Get cookies from Astro context
4. Create use case with token
5. Execute and return Result as JSON

## References

- `ARCHITECTURE.md` - Detailed architecture explanation with examples
- `MIGRATION_GUIDE.md` - Migration guide from previous architecture
- Backend API: https://github.com/ososuna/cliplink-rest (Java Spring Boot)
