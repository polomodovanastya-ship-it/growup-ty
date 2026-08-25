# Как ты? (kak-ty.live)

Сайт поддержки подростков: опрос Kidscreen, статьи, рекомендации.

- **Прод:** [kak-ty.live](https://kak-ty.live)
- **Стек:** React, Vite, Tailwind, shadcn/ui
- **Хостинг:** GitHub Pages · **Разработка:** Cursor
- **Бэкенд:** нет (полностью статический сайт, см. [ADR-0003](docs/adr/0003-no-backend-static-site-only.md))

## Быстрый старт

```bash
npm install
npm run dev
```

Откроется [http://localhost:5180](http://localhost:5180).

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер + генерация sitemap |
| `npm run build` | Prod-сборка в `dist/` (+ `404.html` для SPA на Pages) |
| `npm run preview` | Просмотр prod-сборки локально |
| `npm run test` | Unit-тесты (Vitest) |
| `npm run test:e2e` | E2E (Playwright) |
| `npm run lint` | ESLint |

## Деплой

Push в `main` → GitHub Actions → GitHub Pages.

Подробная инструкция (DNS, Pages): **[docs/DEPLOY.md](docs/DEPLOY.md)**

## Архитектурные решения

Важные решения — в [docs/adr/](docs/adr/):

- [ADR-0001](docs/adr/0001-use-architecture-decision-records.md) — процесс ADR
- [ADR-0002](docs/adr/0002-migrate-from-lovable-to-github-pages-and-cursor.md) — переезд с Lovable на GitHub Pages + Cursor
- [ADR-0003](docs/adr/0003-no-backend-static-site-only.md) — отказ от Supabase

## Структура

```
src/           — React-приложение
public/        — статика, CNAME, sitemap
docs/adr/      — architecture decision records
scripts/       — генерация sitemap
```
