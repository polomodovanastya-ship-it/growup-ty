# Настройка Supabase для админки

Результаты тестов KIDSCREEN и «Выбор профессии» сохраняются в Supabase. Админка: `/admin`.

**Проект:** `ebtwlekerazhzavtwmyp` → `https://ebtwlekerazhzavtwmyp.supabase.co`

## Быстрый старт

```bash
# 1. Ключи уже в .env (Settings → API в Supabase Dashboard)
# 2. Интерактивный скрипт:
bash scripts/setup-supabase.sh
```

Скрипт по шагам: GitHub Secrets → `supabase login` → `db push` → deploy `submit-kidscreen`.

---

## Вручную (если скрипт не подходит)

### 1. Локальный `.env`

```env
VITE_SUPABASE_URL=https://ebtwlekerazhzavtwmyp.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon public key из Dashboard → Settings → API>
```

### 2. GitHub Secrets (для деплоя на Pages)

```bash
gh secret set VITE_SUPABASE_URL
gh secret set VITE_SUPABASE_PUBLISHABLE_KEY
```

Вставь те же значения, что в `.env`. Проверка: `gh secret list`.

### 3. Supabase CLI

```bash
brew install supabase/tap/supabase   # если ещё нет
supabase login
supabase link --project-ref ebtwlekerazhzavtwmyp
supabase db push
supabase functions deploy submit-kidscreen --no-verify-jwt
```

`--no-verify-jwt` — тест проходят анонимные пользователи без входа.

### 4. Auth redirect URLs

**Dashboard → Authentication → URL Configuration**

| Поле | Значение |
|------|----------|
| Site URL | `https://kak-ty.live` |
| Redirect URLs | `https://kak-ty.live/admin` |
| | `https://kak-ty.live/reset-password` |
| | `http://localhost:8080/admin` |
| | `http://localhost:8080/reset-password` |

### 5. Первый администратор

1. Открой `/admin/login` → **Зарегистрироваться** → подтверди email.
2. **Dashboard → Authentication → Users** → скопируй **User UID**.
3. **SQL Editor**:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<UUID-ИЗ-AUTH-USERS>', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

4. Войди снова → `/admin` покажет дашборд.

---

## Проверка

| Что | Как |
|-----|-----|
| KIDSCREEN сохраняется | Пройди тест → Dashboard → Table Editor → `kidscreen_assessments` |
| Career сохраняется | Пройди квиз → `career_results` |
| Админка | `/admin` после входа с ролью `admin` |
| Прод после push | Actions → Deploy → build с secrets |

---

## Таблицы

| Таблица | Назначение |
|---------|------------|
| `kidscreen_assessments` | Прохождения KIDSCREEN (возраст, пол) |
| `kidscreen_answers` | Ответы на вопросы |
| `kidscreen_scale_results` | Шкалы и уровни (для «зон риска») |
| `career_results` | Стадии SEARCH/FIND/TAKE/MAKE |
| `user_roles` | Роли `admin` / `user` |

RLS: записывать могут все (anon), читать агрегаты — только `admin`.

---

## Troubleshooting

**401 при запросах к API** — проверь `VITE_SUPABASE_PUBLISHABLE_KEY` (anon key, не service_role).

**«Нет доступа» в админке** — нет строки в `user_roles` с `role = admin`.

**KIDSCREEN не сохраняется** — задеплоена ли function `submit-kidscreen`; смотри **Edge Functions → Logs**.

**supabase login: Unauthorized** — `supabase login` заново в терминале.
