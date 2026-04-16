.PHONY: help install dev build lint preview typespec api-gen mock clean

help:
	@echo "Calendar Booking App — Available commands:"
	@echo ""
	@echo "  make install      Install all dependencies"
	@echo "  make dev          Start Vite dev server"
	@echo "  make build        Build frontend for production"
	@echo "  make lint         Run ESLint"
	@echo "  make preview      Preview production build"
	@echo "  make typespec     Compile TypeSpec → OpenAPI"
	@echo "  make api:gen      Generate TypeScript API client from OpenAPI"
	@echo "  make mock         Start Prism mock server"
	@echo "  make clean        Remove build artifacts and caches"

install:
	npm install
	cd typespec && npm install

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

clean:
	rm -rf node_modules dist typespec/node_modules typespec/tsp-output src/api/generated
