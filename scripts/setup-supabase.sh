#!/usr/bin/env bash
# Настройка Supabase для админки и сохранения результатов тестов.
# Запуск из корня репозитория: bash scripts/setup-supabase.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

red()   { printf '\033[31m%s\033[0m\n' "$*"; }
green() { printf '\033[32m%s\033[0m\n' "$*"; }
bold()  { printf '\033[1m%s\033[0m\n' "$*"; }

bold "=== Настройка Supabase для growup-ty ==="
echo

# --- 1. .env ---
if [[ ! -f .env ]]; then
  red "Файл .env не найден."
  echo "Скопируй .env.example → .env и заполни ключи из Supabase Dashboard → Settings → API"
  exit 1
fi

# shellcheck disable=SC1091
source .env

if [[ -z "${VITE_SUPABASE_URL:-}" || -z "${VITE_SUPABASE_PUBLISHABLE_KEY:-}" ]]; then
  red "В .env должны быть VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY"
  exit 1
fi

green "✓ .env найден (project: ${VITE_SUPABASE_URL})"
echo

# --- 2. GitHub Secrets ---
bold "Шаг 1: GitHub Secrets для CI"
if command -v gh >/dev/null 2>&1; then
  read -r -p "Записать VITE_SUPABASE_* в GitHub Secrets? [y/N] " ans
  if [[ "${ans,,}" == "y" ]]; then
    printf '%s' "$VITE_SUPABASE_URL" | gh secret set VITE_SUPABASE_URL
    printf '%s' "$VITE_SUPABASE_PUBLISHABLE_KEY" | gh secret set VITE_SUPABASE_PUBLISHABLE_KEY
    green "✓ Secrets записаны"
    gh secret list
  else
    echo "Пропущено. Вручную:"
    echo "  gh secret set VITE_SUPABASE_URL"
    echo "  gh secret set VITE_SUPABASE_PUBLISHABLE_KEY"
  fi
else
  echo "gh CLI не найден — добавь secrets вручную в GitHub → Settings → Secrets"
fi
echo

# --- 3. Supabase CLI login ---
bold "Шаг 2: Supabase CLI"
if ! command -v supabase >/dev/null 2>&1; then
  red "Supabase CLI не установлен."
  echo "  brew install supabase/tap/supabase"
  exit 1
fi

if ! supabase projects list >/dev/null 2>&1; then
  echo "Нужен вход в Supabase CLI (откроется браузер):"
  echo "  supabase login"
  echo
  read -r -p "Запустить supabase login сейчас? [y/N] " ans
  if [[ "${ans,,}" == "y" ]]; then
    supabase login
  else
    red "Без login нельзя задеплоить миграции и edge functions."
    exit 1
  fi
fi

green "✓ Supabase CLI авторизован"
echo

# --- 4. Link project ---
bold "Шаг 3: Привязка проекта"
PROJECT_REF="${VITE_SUPABASE_PROJECT_ID:-ebtwlekerazhzavtwmyp}"
if [[ "$VITE_SUPABASE_URL" =~ https://([a-z0-9]+)\.supabase\.co ]]; then
  PROJECT_REF="${BASH_REMATCH[1]}"
fi

read -r -p "Привязать проект ${PROJECT_REF}? [Y/n] " ans
if [[ "${ans,,}" != "n" ]]; then
  supabase link --project-ref "$PROJECT_REF"
  green "✓ Проект привязан"
fi
echo

# --- 5. Migrations ---
bold "Шаг 4: Миграции БД"
read -r -p "Применить миграции (supabase db push)? [Y/n] " ans
if [[ "${ans,,}" != "n" ]]; then
  supabase db push
  green "✓ Миграции применены"
fi
echo

# --- 6. Edge function ---
bold "Шаг 5: Edge function submit-kidscreen"
read -r -p "Задеплоить submit-kidscreen? [Y/n] " ans
if [[ "${ans,,}" != "n" ]]; then
  supabase functions deploy submit-kidscreen --no-verify-jwt
  green "✓ Function задеплоена"
fi
echo

# --- 7. Auth URLs ---
bold "Шаг 6: Auth redirect URLs (вручную в Dashboard)"
echo "Supabase Dashboard → Authentication → URL Configuration:"
echo "  Site URL:              https://kak-ty.live"
echo "  Redirect URLs:"
echo "    https://kak-ty.live/admin"
echo "    https://kak-ty.live/reset-password"
echo "    http://localhost:8080/admin"
echo "    http://localhost:8080/reset-password"
echo

# --- 8. First admin ---
bold "Шаг 7: Первый admin"
echo "1. Зарегистрируйся на https://kak-ty.live/admin/login (или локально)"
echo "2. Supabase Dashboard → Authentication → Users → скопируй UUID"
echo "3. SQL Editor → выполни:"
echo
cat <<'SQL'
INSERT INTO public.user_roles (user_id, role)
VALUES ('<UUID-ИЗ-AUTH-USERS>', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
SQL
echo

bold "Готово! Проверка:"
echo "  npm run dev  → пройди тест → /admin/login → дашборд"
