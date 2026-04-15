# AGENTS.md

## Project
Calendar booking app — **Design First** approach. API contract is the single source of truth. Frontend and backend are implemented separately against it.

## Stack
- **Backend:** FastAPI (Python)
- **Frontend:** React + TypeScript + Vite + Mantine + Motion
- **API contract:** TypeSpec → OpenAPI

## Key Directories
- `typespec/` — TypeSpec source (`main.tsp`) and generated OpenAPI spec
- `typespec/tsp-output/openapi/openapi.yaml` — generated OpenAPI spec (do not edit manually)

## Commands

### TypeSpec
```bash
cd typespec
npx tsp compile main.tsp          # Compile and regenerate OpenAPI
```

### Backend (FastAPI) — when implemented
```bash
# TBD: add venv setup, dev server, test commands
```

### Frontend (Vite) — when implemented
```bash
# TBD: add install, dev, build, test commands
```

## Conventions
- **Never edit `openapi.yaml` directly** — always update `typespec/main.tsp` and recompile
- API contract covers two roles: **Owner** (admin, `/admin/*`) and **Guest** (public)
- Booking rule: no double-booking same time slot, even across event types
- Available slots window: 14 days from current date
- No auth/registration — owner is a single predefined profile

## Workflow
1. Change API → update `typespec/main.tsp` → `npx tsp compile main.tsp`
2. Sync both frontend and backend to updated contract
3. Lint → typecheck → test (per package)
