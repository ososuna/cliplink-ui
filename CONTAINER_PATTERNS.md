# Server vs. Client Container Patterns

This document explains the architectural decision behind using different dependency injection patterns for the server-side and client-side containers.

## 1. Server Container (`server-container.ts`) → **Factory Pattern**

**Reason:** Request Isolation & Security.

On the server (Astro/Node.js), the application handles requests from **multiple different users** simultaneously. We cannot share a single instance of the `HttpClient` or Repositories because each request requires unique configuration (specifically the **Auth Token**).

### How it works
*   The factory functions (e.g., `makeGetUrls(token)`) are called *per request*.
*   **The Flow:**
    1.  Astro receives a request.
    2.  We extract the cookie/token for *that specific user*.
    3.  We call the factory `makeGetUrls(token)`.
    4.  The factory creates a **fresh** `HttpClient` with that user's token in the headers.

### Why not Singleton?
If we used a Singleton on the server, we would have to share one `HttpClient` across all users. This would result in a critical security flaw where User A's token might be used for User B's request, or no authentication would be possible.

---

## 2. Client Container (`client-container.ts`) → **Singleton Pattern**

**Reason:** Single User Context.

In the browser, the application is running for **one specific user** at a time. The browser automatically handles the storage and sending of cookies for that domain.

### How it works
*   The instances are created once when the bundle loads and are reused.
*   **The Flow:**
    1.  The `HttpClient` is instantiated once (usually with an empty base URL to use relative paths like `/api/...`).
    2.  The browser automatically attaches the `HttpOnly` cookies to every request this client makes.
    3.  We do not need to manually inject a token because the browser handles the cookie transmission.

### Why Singleton?
It is more efficient. There is no need to recreate the `HttpClient` and Repositories for every button click or navigation since the "user context" (the browser session) does not change.

---

## Summary

| Feature | Server Container | Client Container |
| :--- | :--- | :--- |
| **Pattern** | **Factory** (Create new every time) | **Singleton** (Create once, reuse) |
| **Context** | Multi-User (Many requests at once) | Single-User (One browser tab) |
| **Auth Handling** | Manually injected per request (via args) | Automatically handled by Browser (Cookies) |
| **Risk** | Singleton here causes data leaks between users | Factory here is just unnecessary overhead |
