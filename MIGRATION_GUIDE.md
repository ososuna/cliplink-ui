# ClipLink UI - Migration Guide

## Overview

This document explains the migration from the previous Clean Architecture to the new **Pragmatic Clean Architecture with BFF (Backend-For-Frontend) Pattern**.

## What Changed

### Architecture Evolution

**Before:**
- Traditional Clean Architecture with domain/infrastructure/presentation layers
- Direct API calls from both server and client components
- Cookie handling inconsistencies between server and client
- Manual error handling with try-catch blocks
- DTOs with validation mixed into the flow

**After:**
- Pragmatic Clean Architecture with flattened directory structure
- BFF Pattern: Client components call local API endpoints, which then call the external API
- Consistent cookie handling (all external API calls happen server-side)
- Result pattern for functional error handling
- Simplified use cases focused on business logic

## Key Benefits

### 1. **Solved Cookie Problem**
- **Problem**: Cookies behaved differently in server components (Astro) vs client components (React Islands)
- **Solution**: All external API calls now happen server-side. Client components call `/api/*` endpoints (BFF), which run server-side and have proper access to HTTP-only cookies.

### 2. **Better Separation of Concerns**
```
Client Component → BFF API Endpoint → Server Repository → External API
                                        ↓
                                   Uses cookies properly
```

### 3. **Result Pattern**
No more try-catch hell. Instead of:
```typescript
try {
  const user = await authService.login(email, password);
  // success
} catch (error) {
  // handle error
}
```

Now:
```typescript
const result = await loginUseCase.execute({ email, password });
if (!result.ok) {
  // Handle error: result.error
  return;
}
// Success: result.value
```

## New Directory Structure

```
src/
├── adapters/              # Infrastructure adapters
│   └── http/
│       ├── IHttpClient.ts      # Interface
│       └── FetchHttpClient.ts  # Implementation
│
├── entities/              # Domain entities (interfaces)
│   ├── User.ts
│   ├── Url.ts
│   ├── Page.ts
│   └── errors.ts
│
├── repositories/          # Data access layer
│   ├── interfaces/        # Contracts
│   │   ├── IAuthRepository.ts
│   │   └── IUrlRepository.ts
│   ├── server/            # 🔒 Server-side (uses cookies)
│   │   ├── ServerAuthRepository.ts
│   │   └── ServerUrlRepository.ts
│   └── client/            # 🌐 Client-side (calls /api/*)
│       ├── ClientAuthRepository.ts
│       └── ClientUrlRepository.ts
│
├── use-cases/             # Business logic
│   ├── auth/
│   │   ├── login.ts
│   │   ├── register.ts
│   │   └── ...
│   └── url/
│       ├── create-url.ts
│       └── ...
│
├── lib/                   # Dependency injection
│   ├── server-container.ts   # Factory for server-side
│   └── client-container.ts   # Singleton for client-side
│
├── types/                 # Shared types
│   └── Result.ts          # Result<T, E> pattern
│
├── pages/                 # Routes
│   ├── index.astro
│   ├── dashboard/
│   └── api/               # 🎯 BFF Layer
│       ├── auth/
│       │   ├── login.ts
│       │   ├── register.ts
│       │   └── ...
│       └── urls/
│           └── index.ts
│
├── components/            # UI components
│   ├── ui/                # Generic UI
│   ├── features/          # Feature-specific
│   └── react/             # React islands
│
├── layouts/               # Page layouts
└── middleware.ts          # Authentication middleware
```

## How to Use the New Architecture

### For Server-Side Pages (Astro)

```typescript
---
// src/pages/profile.astro
import { makeCheckToken } from '@/lib/server-container';
import ProfileCard from '@/components/features/ProfileCard.astro';

// 1. Get token from cookies
const accessToken = Astro.cookies.get('access_token')?.value;

// 2. Create use case with token
const checkTokenUseCase = makeCheckToken(accessToken);

// 3. Execute and handle result
const result = await checkTokenUseCase.execute(accessToken);

if (!result.ok) {
  return Astro.redirect('/auth/login');
}

const user = result.value;
---

<Layout title="Profile">
  <h1>Welcome, {user.name}!</h1>
  <ProfileCard {user} />
</Layout>
```

### For Client Components (React Islands)

```typescript
// src/components/react/LoginForm.tsx
import { useState } from 'react';
import { makeLogin } from '@/lib/client-container';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Create use case (calls /api/auth/login internally)
    const loginUseCase = makeLogin();

    // 2. Execute and handle result
    const result = await loginUseCase.execute({ email, password });

    if (!result.ok) {
      setError(result.error.message);
      return;
    }

    // Success! Redirect or update UI
    window.location.href = '/dashboard';
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Creating BFF API Endpoints

```typescript
// src/pages/api/auth/login.ts
import type { APIRoute } from 'astro';
import { makeLogin } from '@/lib/server-container';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Execute use case
    const loginUseCase = makeLogin();
    const result = await loginUseCase.execute({ email, password });

    // Handle result
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
```

## Migration Steps for Existing Code

### 1. Update Imports

**Before:**
```typescript
import { User, AuthService } from '@/domain';
import { AuthServiceImpl } from '@/infrastructure';
```

**After:**
```typescript
// Server-side (Astro pages, API endpoints)
import { makeLogin, makeRegister } from '@/lib/server-container';
import type { User } from '@/entities/User';

// Client-side (React components)
import { makeLogin, makeRegister } from '@/lib/client-container';
import type { User } from '@/entities/User';
```

### 2. Update Service Calls to Use Cases

**Before:**
```typescript
const authService = new AuthServiceImpl(authRepository);
try {
  const user = await authService.loginByEmail(email, password);
  // success
} catch (error) {
  // error
}
```

**After (Server-side):**
```typescript
const loginUseCase = makeLogin(accessToken);
const result = await loginUseCase.execute({ email, password });

if (!result.ok) {
  console.error(result.error.message);
  return;
}

const user = result.value;
```

**After (Client-side):**
```typescript
const loginUseCase = makeLogin(); // No token needed, BFF handles it
const result = await loginUseCase.execute({ email, password });

if (!result.ok) {
  setError(result.error.message);
  return;
}

const user = result.value;
```

### 3. Update React Components to Use Client Container

**Before:**
```typescript
// Making direct external API calls from React
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  body: JSON.stringify({ email, password }),
  credentials: 'include', // ❌ Cookies don't work properly here
});
```

**After:**
```typescript
// Calling BFF API endpoint (which runs server-side)
import { makeLogin } from '@/lib/client-container';

const loginUseCase = makeLogin();
const result = await loginUseCase.execute({ email, password });

if (!result.ok) {
  // Handle error
  return;
}

// Success!
```

## Common Patterns

### Pattern 1: Protected Pages

```typescript
---
// src/pages/dashboard.astro
import { makeCheckToken } from '@/lib/server-container';

const accessToken = Astro.cookies.get('access_token')?.value;
const checkTokenUseCase = makeCheckToken(accessToken);
const result = await checkTokenUseCase.execute(accessToken);

if (!result.ok) {
  return Astro.redirect('/auth/login');
}

const user = result.value;
---

<Layout>
  <h1>Dashboard for {user.name}</h1>
</Layout>
```

### Pattern 2: Form Submission with Validation

```typescript
// React component
import { makeRegister } from '@/lib/client-container';

const handleSubmit = async (data: FormData) => {
  const registerUseCase = makeRegister();
  const result = await registerUseCase.execute({
    email: data.email,
    name: data.name,
    lastName: data.lastName,
    password: data.password,
  });

  if (!result.ok) {
    setErrors(result.error.message);
    return;
  }

  // Success - redirect
  window.location.href = '/dashboard';
};
```

### Pattern 3: Data Fetching in Pages

```typescript
---
// src/pages/my-urls.astro
import { makeGetUrls } from '@/lib/server-container';

const accessToken = Astro.cookies.get('access_token')?.value;
const getUrlsUseCase = makeGetUrls(accessToken);
const result = await getUrlsUseCase.execute(1, 10, '');

if (!result.ok) {
  return Astro.redirect('/auth/login');
}

const urlsPage = result.value;
---

<Layout>
  {urlsPage.items.map(url => (
    <UrlCard url={url} />
  ))}
</Layout>
```

## Benefits Summary

1. **✅ Cookie Problem Solved**: All external API calls happen server-side with proper cookie access
2. **✅ Better Error Handling**: Result pattern eliminates try-catch boilerplate
3. **✅ Clearer Architecture**: Separation between client and server repositories
4. **✅ Type Safety**: Full TypeScript support with interfaces
5. **✅ Testability**: Easy to mock repositories and use cases
6. **✅ Security**: Secrets and tokens never exposed to client
7. **✅ Flexibility**: Easy to swap implementations (e.g., mock for testing)

## What to Avoid

### ❌ Don't Make Direct External API Calls from Client Components

```typescript
// BAD - Don't do this
const response = await fetch('https://external-api.com/auth/login', {
  credentials: 'include', // Won't work properly
});
```

### ❌ Don't Use Old Domain/Infrastructure Imports

```typescript
// BAD - Old architecture
import { AuthServiceImpl } from '@/infrastructure';
import { LoginUserDto } from '@/domain';
```

### ❌ Don't Mix Server and Client Containers

```typescript
// BAD - Using server container in React component
import { makeLogin } from '@/lib/server-container'; // ❌
// Use client-container instead
```

## Next Steps

1. Update existing pages to use server-container
2. Update React components to use client-container
3. Remove old domain/infrastructure/presentation folders (after verifying everything works)
4. Update tests to use new architecture
5. Update CLAUDE.md with new architecture details

## Questions?

Review the `ARCHITECTURE.md` file for detailed architectural patterns and examples.
