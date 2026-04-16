# Calendar Booking App

Приложение для онлайн-бронирования встреч. Дизайн-первый подход с TypeSpec как единым источником истины для API.

[![e2e-tests](https://github.com/sergeikuz/ai-for-developers-project-386/actions/workflows/e2e.yml/badge.svg)](https://github.com/sergeikuz/ai-for-developers-project-386/actions)
[![hexlet-check](https://github.com/sergeikuz/ai-for-developers-project-386/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/sergeikuz/ai-for-developers-project-386/actions)

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Mantine + React Query + React Router + dayjs
- **Backend:** FastAPI (Python) + Pydantic + Uvicorn on port **4010**
- **API contract:** TypeSpec → OpenAPI → generated TS client
- **E2E tests:** Playwright (Chromium)

## Commands

```bash
make install          # npm install (root + typespec/) + uv sync (backend)
make dev              # Vite dev server
make build            # tsc -b && vite build
make lint             # eslint .
make typespec         # cd typespec && npx tsp compile main.tsp
make api-gen          # regenerate TS client from openapi.yaml
make mock             # prism mock on port 4010
make backend-dev      # start FastAPI backend on port 4010
make backend-test     # run backend pytest tests
make e2e-test         # run Playwright E2E tests
make clean            # removes node_modules, dist, tsp-output, src/api/generated, backend caches
```

## CI

Проект использует GitHub Actions для автоматической проверки:

| Workflow | Описание |
|---|---|
| [e2e.yml](.github/workflows/e2e.yml) | Playwright E2E-тесты: запускает фронтенд + бэкенд, проверяет полный путь бронирования |
| [hexlet-check.yml](.github/workflows/hexlet-check.yml) | Автоматическая проверка Hexlet |

E2E-тесты запускаются на каждый push и pull request в `main`/`master`. Статус доступен во вкладке **Actions** репозитория.

### E2E-сценарии

- Главная страница: отображение CTA, навигация на /book
- Каталог событий: карточки типов событий, переход на бронирование
- Полный путь бронирования: выбор типа → дата → слот → форма → подтверждение
- Забронированный слот отображается как "Занято"
- Админка: бронирование появляется в таблице

## Architecture

```
src/
  api/generated/      # auto-generated from OpenAPI
  api/hooks.ts        # React Query wrappers
  pages/              # HomePage, EventCatalogPage, BookingPage, AdminPage
  components/         # Layout.tsx

backend/
  main.py             # FastAPI app + endpoints
  models.py           # Pydantic models
  store.py            # In-memory storage + seed data
  test_main.py        # Pytest tests

e2e/
  home.spec.ts        # Home page tests
  booking.spec.ts     # Booking flow + admin tests

typespec/
  main.tsp            # API contract (source of truth)
```

## Routing

```
/              → HomePage (landing)
/book          → EventCatalogPage (select event type)
/book/:id      → BookingPage (pick date + slot + guest form)
/admin         → AdminPage (tabbed: bookings + event types)
```
