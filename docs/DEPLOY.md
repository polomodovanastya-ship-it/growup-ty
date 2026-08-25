# Деплой на GitHub Pages (kak-ty.live)

Инструкция для завершения переезда с Lovable. Решения: [ADR-0002](./adr/0002-migrate-from-lovable-to-github-pages-and-cursor.md), [ADR-0003](./adr/0003-no-backend-static-site-only.md).

Для **админки и сохранения результатов тестов** нужен Supabase — см. **[SUPABASE-SETUP.md](./SUPABASE-SETUP.md)**.

## 1. GitHub: включить Pages

1. Репозиторий → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions** (не «Deploy from a branch»)
3. После первого успешного workflow сайт будет доступен на `*.github.io`; с custom domain — на `kak-ty.live`

## 2. DNS у регистратора домена

Для **kak-ty.live** (apex / корень домена) — **A-записи**:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Для **www.kak-ty.live** (опционально):

| Тип | Имя | Значение |
|-----|-----|----------|
| CNAME | `www` | `polomodovanastya-ship-it.github.io` |

Файл `public/CNAME` уже содержит `kak-ty.live` — GitHub Pages подхватит его при деплое.

В **Settings → Pages → Custom domain** укажите `kak-ty.live`, включите **Enforce HTTPS** после проверки DNS.

## 3. Деплой

Push в `main` запускает [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml):

1. `npm ci` → `npm run build` (нужны GitHub Secrets `VITE_SUPABASE_*` — см. [SUPABASE-SETUP.md](./SUPABASE-SETUP.md))
2. Артефакт `dist/` → GitHub Pages

Ручной запуск: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

## 4. Проверка после переезда

- [ ] `https://kak-ty.live/` открывается
- [ ] Прямые ссылки работают: `/help`, `/about`, `/articles/who-helps`
- [ ] Kidscreen-тест показывает результат и скачивает PDF; запись в Supabase (`kidscreen_assessments`)
- [ ] Career-квиз сохраняет стадию в `career_results`
- [ ] `/admin` — дашборд после настройки роли admin
- [ ] `https://kak-ty.live/sitemap.xml` актуален

## Локальная разработка

```bash
npm install
npm run dev            # http://localhost:5180
npm run build          # проверить prod-сборку
npm run preview        # локальный просмотр dist/
```
