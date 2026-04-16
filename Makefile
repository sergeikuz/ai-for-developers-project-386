.PHONY: help install dev build lint preview typespec api-gen mock clean backend-install backend-dev backend-test

help:
	@echo "Calendar Booking App — Available commands:"
	@echo ""
	@echo "  make install      Install all dependencies (npm + uv)"
	@echo "  make dev          Start Vite dev server"
	@echo "  make build        Build frontend for production"
	@echo "  make lint         Run ESLint"
	@echo "  make preview      Preview production build"
	@echo "  make typespec     Compile TypeSpec → OpenAPI"
	@echo "  make api-gen      Generate TypeScript API client from OpenAPI"
	@echo "  make mock         Start Prism mock server"
	@echo "  make backend-install  Install Python backend dependencies (uv)"
	@echo "  make backend-dev  Start FastAPI backend (port 4010)"
	@echo "  make backend-test Run backend tests (pytest)"
	@echo "  make clean        Remove build artifacts and caches"

install:
	npm install
	cd typespec && npm install
	cd backend && uv sync

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

preview:
	npm run preview

typespec:
	cd typespec && npx tsp compile main.tsp

api-gen:
	npm run api:gen

mock:
	npm run mock

backend-install:
	cd backend && uv sync

backend-dev:
	cd backend && uv run uvicorn main:app --host 0.0.0.0 --port 4010 --reload

backend-test:
	cd backend && uv run pytest -v

clean:
	rm -rf node_modules dist typespec/node_modules typespec/tsp-output src/api/generated backend/__pycache__ backend/.pytest_cache backend/.venv
