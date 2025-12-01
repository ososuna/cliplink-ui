# Pragmatic Clean Architecture for Astro

This project follows a **Pragmatic Clean Architecture** approach tailored for Astro. It emphasizes strict separation of concerns, type safety, and secure authentication handling via a **Backend-For-Frontend (BFF)** pattern.

## 1. Directory Structure

The structure is flattened to reduce nesting while maintaining architectural boundaries.

```text
src/
├── adapters/                # INFRASTRUCTURE ADAPTERS (Wrappers)
│   └── http/
│       ├── IHttpClient.ts       # Interface (Contract)
│       └── FetchHttpClient.ts   # Implementation (Wraps fetch/axios)
│
├── components/              # PRESENTATION (UI)
│   ├── ui/                  # Generic UI (Buttons, Alerts)
│   ├── features/            # Feature-specific components (ProfileCard)
│   └── react/               # Client-side Islands (React/Vue/Svelte)
│
├── entities/                # DOMAIN (The "What")
│   ├── User.ts              # Pure Data Interfaces
│   └── errors.ts            # Domain Errors (NetworkError, ApiError)
│
├── use-cases/               # APPLICATION LOGIC (The "How")
│   ├── get-profile.ts       # Pure business logic
│   └── update-settings.ts
│
├── repositories/            # DATA ACCESS (The "Where")
│   ├── interfaces/          # Contracts
│   │   └── IUserRepository.ts
│   ├── server/              # 🔒 SECURE REPOS (Uses Secrets / HTTP Client)
│   │   └── ServerUserRepository.ts
│   └── client/              # 🟢 PUBLIC REPOS (Calls /api proxy)
│       └── ClientUserRepository.ts
│
├── lib/                     # WIRING (Dependency Injection)
│   ├── server-container.ts  # 🏭 Factory: Wires Auth Token -> HttpClient -> Repo -> UseCase
│   └── client-container.ts  # 📦 Singleton: Wires ClientRepo -> UseCase
│
├── types/                   # SHARED KERNEL
│   └── Result.ts            # Error Handling Pattern
│
├── pages/                   # CONTROLLERS (Entry Points)
│   ├── index.astro          # SSR Page (Uses server-container)
│   ├── login.astro
│   └── api/                 # BFF PROXY LAYER
│       └── users.ts         # Receives Browser Request -> Calls Server Repo
│
├── env.d.ts
└── astro.config.mjs
```
## 2. Key Architectural Pattern
### The Result Pattern
Used to handle errors without try/catch block clutter in the UI.

- Success: { ok: true, value: T }
- Failure: { ok: false, error: Error }

### The Adapter Pattern (HTTP Client)
We wrap fetch to centralize configuration (Base URL, Headers) and error parsing.

### The BFF Pattern (Backend for Frontend)
- Server Repositories talk to the external API using Secrets/Auth Tokens.
- Client Repositories talk to the Astro API (/pages/api).
- Secrets (Access Tokens) never leave the server.

### Factory Pattern (for Auth)
Since we use HTTP-Only Cookies, every request has a different Auth Token. The server-container.ts exports a Factory Function to build the Dependency Injection tree fresh for every request.

## 3. Implementation Example: "View Profile"
A full vertical slice demonstrating how to read an HTTP-Only cookie, inject it into an HTTP Client, and fetch data.

### A. Shared Core (src/types/Result.ts)
```typescript
export type Result<T, E = Error> = 
  | { ok: true; value: T } 
  | { ok: false; error: E };

export const success = <T>(v: T): Result<T> => ({ ok: true, value: v });
export const failure = <E>(e: E): Result<any, E> => ({ ok: false, error: e });
```

### B. The Entity (src/entities/Profile.ts)
```typescript
export interface Profile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}
```

### C. The HTTP Adapter (src/adapters/http/FetchHttpClient.ts)
```typescript
export interface IHttpClient {
  get<T>(path: string): Promise<T>;
  // post, put, delete...
}

export class FetchHttpClient implements IHttpClient {
  constructor(
    private baseUrl: string, 
    private headers: Record<string, string> = {}
  ) {}

  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, { 
      headers: { ...this.headers, "Content-Type": "application/json" } 
    });
    
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return res.json() as Promise<T>;
  }
}
```

### D. The Repository (src/repositories/server/ServerProfileRepo.ts)
```typescript
import type { IHttpClient } from "@/adapters/http/FetchHttpClient"; // Interface
import type { Profile } from "@/entities/Profile";
import { type Result, success, failure } from "@/types/Result";

export class ServerProfileRepo {
  // Injection: Logic depends on the abstract Interface, not fetch() directly
  constructor(private http: IHttpClient) {}

  async getMyProfile(): Promise<Result<Profile>> {
    try {
      // The HTTP client already has the Auth Token injected
      const data = await this.http.get<any>("/me");
      
      // Transform raw API data to Clean Entity
      return success({
        id: data.user_id,
        displayName: data.full_name,
        email: data.email,
        avatarUrl: data.picture || "/default-avatar.png"
      });
    } catch (e) {
      return failure(e instanceof Error ? e : new Error("Unknown error"));
    }
  }
}
```
### E. The Use Case (src/use-cases/get-profile.ts)
```typescript
import type { ServerProfileRepo } from "@/repositories/server/ServerProfileRepo";

export class GetProfile {
  constructor(private repo: ServerProfileRepo) {}

  async execute() {
    return this.repo.getMyProfile();
  }
}
```

### F. The Wiring Factory (src/lib/server-container.ts)
```typescript
import { FetchHttpClient } from "@/adapters/http/FetchHttpClient";
import { ServerProfileRepo } from "@/repositories/server/ServerProfileRepo";
import { GetProfile } from "@/use-cases/get-profile";

const API_BASE = import.meta.env.API_URL;

// Factory: Builds the Clean Architecture stack per request
export const makeGetProfile = (accessToken: string | undefined) => {
  
  // 1. Configure HTTP Client with User's Token
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const httpClient = new FetchHttpClient(API_BASE, headers);

  // 2. Inject Client into Repo
  const repo = new ServerProfileRepo(httpClient);

  // 3. Inject Repo into Use Case
  return new GetProfile(repo);
};
```

### G. The Controller (src/pages/profile.astro)
```typescript
---
import { makeGetProfile } from "@/lib/server-container";
import ProfileCard from "@/components/features/ProfileCard.astro";

// 1. AUTH: Retrieve HTTP-Only cookie (Server Side)
const token = Astro.cookies.get("access_token")?.value;

// 2. BUILD: Create the Use Case for this specific user
const getProfile = makeGetProfile(token);

// 3. EXECUTE: Run logic
const result = await getProfile.execute();

// 4. HANDLE ERROR / REDIRECT
if (!result.ok) {
  return Astro.redirect("/login");
}

const profile = result.value;
---

<Layout title="My Profile">
  <main class="p-4">
    <h1 class="text-2xl font-bold">Welcome, {profile.displayName}</h1>
    <ProfileCard profile={profile} />
  </main>
</Layout>
```
