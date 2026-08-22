#!/usr/bin/env bash
# Настройка GitHub для этого репозитория (запускать из корня проекта).
set -euo pipefail

REPO="polomodovanastya-ship-it/growup-ty"
HTTPS_URL="https://github.com/${REPO}.git"

echo "→ Проверка gh CLI..."
if ! command -v gh >/dev/null 2>&1; then
  echo "Установите GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "→ Вход в GitHub (нужен браузер)..."
  gh auth login -h github.com -p https -s repo,workflow,read:org,gist
fi

echo "→ Remote → HTTPS..."
git remote set-url origin "$HTTPS_URL"

echo "→ Credential helper → gh..."
git config --local credential.helper '!gh auth git-credential'
git config --local gh.repository "$REPO"

echo "→ Проверка доступа..."
gh repo view "$REPO" --json name,url --jq '"OK: " + .name + " " + .url'
git fetch origin

echo ""
echo "Готово. git push / gh pr / gh run работают через HTTPS + gh."
echo ""
echo "Опционально SSH (интерактивно, для admin:public_key):"
echo "  gh auth refresh -h github.com -s admin:public_key"
echo "  gh ssh-key add ~/.ssh/id_ed25519.pub --title \"\$(hostname) Cursor\""
