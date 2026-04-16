# AGENTS.md

## Project
Calendar booking app — **Design First** approach. `typespec/main.tsp` is the single source of truth for the API contract.

## Stack
- **Frontend:** React 19 + TypeScript + Vite + Mantine + React Query + React Router
- **API contract:** TypeSpec → OpenAPI → generated TS client (`openapi-typescript-codegen --client fetch`)
- **Mock:** Prism on port **4010** (not the default 3000)
- **Backend:** FastAPI (Python) — **not yet implemented**

## Commands

```bash
make install          # npm install (root + typespec/)
make dev              # Vite dev server
make build            # tsc -b && vite build (typecheck first)
make lint             # eslint .
make typespec         # cd typespec && npx tsp compile main.tsp
make api-gen          # regenerate TS client from openapi.yaml
make mock             # prism mock on port 4010
make clean            # removes node_modules, dist, tsp-output, src/api/generated
```

**Gotcha:** `make clean` deletes `src/api/generated/`. After running it, you must run `make api-gen` before the app compiles.

**Gotcha:** The Makefile target is `api-gen` (hyphen), not `api:gen`. The colon breaks Make parsing.

## API URL config
- `.env` sets `VITE_API_URL=http://localhost:4010` (Prism mock)
- `src/api/index.ts` reads `VITE_API_URL` and sets `OpenAPI.BASE` — single point of API URL config
- When the real FastAPI backend runs, change `.env` to point to its port

## Architecture

```
src/
  api/
    generated/        # auto-generated — never edit, always regenerate via make api-gen
    hooks.ts          # React Query wrappers — all components use these, not raw services
    index.ts          # re-exports + OpenAPI.BASE config
  components/
    Layout.tsx        # AppShell with header nav + mobile burger menu
  pages/
    HomePage.tsx          # / — list event types, "Book Now" cards
    BookingPage.tsx       # /book/:id — date picker, slot selection, guest form
    AdminPage.tsx         # /admin — tabbed dashboard
    AdminBookingsPage.tsx     # bookings table
    AdminEventTypesPage.tsx   # event types CRUD (create/edit modal, delete)
  main.tsx            # entry: BrowserRouter + QueryClient + MantineProvider
  App.tsx             # Routes definition
```

## Conventions
- **Never edit `openapi.yaml`** — update `typespec/main.tsp` then `make typespec && make api-gen`
- Components call hooks from `src/api/hooks.ts`, never the generated services directly
- Mantine CSS is imported in `main.tsx` (`@mantine/core/styles.css`, `@mantine/notifications/styles.css`)
- No auth — single predefined owner profile
- Two API roles: **Owner** (`/admin/*`) and **Guest** (public)
- Booking rules: no double-booking same slot, 14-day availability window

## Verification order
```
make lint && make build
```
Both must pass. ESLint warnings from `src/api/generated/` are expected (from codegen directive comments).
