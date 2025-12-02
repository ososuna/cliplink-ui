# Pragmatic Frontend Clean Architecture for Astro

This project follows a **Pragmatic Frontend Clean Architecture** approach tailored for Astro. It emphasizes strict separation of concerns and type safety.

## 1. Directory Structure

The structure is flattened to reduce nesting while maintaining architectural boundaries.

```text
src/
├── adapters/                # ADAPTERS (Wrappers)
│
├── assets/                  # ASSETS (Images, Icons, Fonts)
│
├── auth/                    # AUTH MODULE
│   ├── adapters/            # Adapters
│   ├── components/          # Components
│   ├── hooks/               # Hooks
│   ├── entities/            # Entities
│   ├── services/            # Services (API calls)
│   └── styled-components/   # Styled Components
│
├── components/              # COMPONENTS
│
├── stores/                  # STORES
│
├── pages/                   # Astro pages
│   ├── index.astro          # SSR Page (Uses server-container)
│   ├── login.astro
│
├── url/                     # URL MODULE
│   ├── adapters/            # Adapters
│   ├── components/          # Components
│   ├── hooks/               # Hooks
│   ├── entities/            # Entities
│   ├── services/            # Services (API calls)
│   └── styled-components/   # Styled Components
│
├── env.d.ts
└── astro.config.mjs
```

## 2. Architecture Diagram
```text
 ┌─────────────────────────────────────────────────────────────┐
  │                   External Services                         │
  │                        services                             │
  │  ┌───────────────────────────────────────────────────────┐  │
  │  │              Adapters                                 │  │
  │  │         adapters        interceptors                  │  │
  │  │  ┌─────────────────────────────────────────────────┐  │  │
  │  │  │           Components                            │  │  │
  │  │  │          components                             │  │  │
  │  │  │    hooks        utilities   styled-components   │  │  │
  │  │  │                                                 │  │  │
  │  │  │      ┌───────────────────────────────┐         │  │  │
  │  │  │      │    Models / State             │         │  │  │
  │  │  │      │                               │         │  │  │
  │  │  │      │  redux        contexts        │         │  │  │
  │  │  │      │                               │         │  │  │
  │  │  │      │  models                       │         │  │  │
  │  │  │      │                               │         │  │  │
  │  │  │      └───────────────────────────────┘         │  │  │
  │  │  │                                                 │  │  │
  │  │  └─────────────────────────────────────────────────┘  │  │
  │  │                                                        │  │
  │  └────────────────────────────────────────────────────────┘  │
  │                                                               │
  └───────────────────────────────────────────────────────────────┘
```
Layer Structure (from outer to inner):
1. External Services (services)
2. Adapters (adapters, interceptors)
3. Components (components, hooks, utilities, styled-components)
4. Models/State (redux, contexts, models)