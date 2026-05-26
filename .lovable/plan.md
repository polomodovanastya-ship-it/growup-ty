
# План: расчёт и интерпретация KIDSCREEN-52

Реализуем два чётко разделённых слоя (как требует ТЗ): **расчётный** (психометрика, не меняем) и **интерпретационный** (поддерживающий текст для подростка). Плюс хранилище результатов и админский отчёт.

## 1. Структура кода (frontend, src/)

```
src/
  kidscreen/
    scales.ts                 // справочник 10 шкал (scale_id, name_ru, name_en, список question_id, reverse-флаги)
    scoring/
      reverseScoring.ts       // инверсия по официальной syntax
      rawScore.ts             // сумма по шкале, обработка missing
      raschLookup.ts          // raw → Rasch person parameter (таблица из мануала)
      tValue.ts               // Rasch → international T-value
      percentile.ts           // T → PR (A7_C European norms, при наличии age/sex)
      index.ts                // computeProfile(answers, age, sex) → ScaleResult[]
    interpretation/
      levels.ts               // PR → resource | usual_range | attention_area | expressed_attention_area
      templates/              // child_text по каждой шкале × уровень (из раздела 14 ТЗ)
        physical_wellbeing.ts
        moods_emotions.ts
        ... (10 файлов)
      firstScreen.ts          // сборка первого экрана (12.1–12.4)
      cards.ts                // подробные карточки (раздел 13)
      internalReport.ts       // support_flag, internal_report (раздел 16)
    types.ts                  // ScaleResult, InterpretedScale, ProfileReport
  components/
    KidscreenQuiz.tsx         // уже есть — добавить age/sex шаг и вызов computeProfile
    KidscreenResult.tsx       // первый экран + раскрытие карточек
```

Ключевые таблицы (raw→Rasch, Rasch→T, A7_C нормы) выносим в статические JSON в `src/kidscreen/data/` — без сети.

## 2. Backend / Lovable Cloud

Нужен бэкенд по двум причинам: сохранять прохождения (для возврата к результату, аналитики, internal_report команде) и не отдавать сырые ответы наружу. Включаем **Lovable Cloud**.

### Edge Functions
- `submit-kidscreen` — принимает ответы + age/sex, вызывает расчётный модуль на сервере (тот же код, что во фронте, в shared package), сохраняет в БД, возвращает `assessment_id` и интерпретированный результат.
  - Расчёт дублируем на сервере, чтобы клиент не мог подменить T-value/PR.
- `get-kidscreen-result` — возвращает результат по `assessment_id` (для повторного открытия по ссылке).

Опционально: `kidscreen-internal-report` — выгрузка для команды (только роль `admin`).

## 3. База данных (Lovable Cloud / Postgres)

Три таблицы + роли. RLS включаем везде.

### `kidscreen_assessments`
Одно прохождение опросника.
- `id uuid pk`
- `user_id uuid null` (если анонимно — null; иначе FK на auth.users)
- `session_token text` (для анонимного возврата к результату)
- `age int`, `sex text null`
- `created_at timestamptz`
- `completed_at timestamptz null`

### `kidscreen_answers`
Сырые ответы (нужны для пересчёта, если поменяем normы).
- `id uuid pk`
- `assessment_id uuid fk → kidscreen_assessments on delete cascade`
- `question_id text` (h1, f1, …)
- `answer_value smallint` (1–5 как в KIDSCREEN)

### `kidscreen_scale_results`
Рассчитанный профиль (10 строк на прохождение).
- `id uuid pk`
- `assessment_id uuid fk`
- `scale_id text` (physical_wellbeing, …)
- `raw_score numeric`
- `rasch_parameter numeric`
- `t_value numeric`
- `pr numeric null`
- `level text` (resource | usual_range | attention_area | expressed_attention_area)
- `support_flag text` (none | soft_attention | needs_support | urgent_support_protocol)
- `missing_status text`

### Доступы
- Анонимный пользователь видит только своё прохождение по `session_token` (хранится в localStorage), либо по `auth.uid()` если залогинен.
- GRANTs: `SELECT/INSERT` для `authenticated`; для анонимных — через edge function с service_role (RLS политики ограничивают по `user_id = auth.uid()`).
- `user_roles` + `has_role()` (отдельная таблица, как требуют best practices) — для роли `admin`, читающей internal_report по всем прохождениям.

### Что НЕ храним
- Готовый `child_text` — он генерируется из шаблонов при отображении, чтобы можно было править формулировки без миграций.

## 4. Поток данных

```
KidscreenQuiz (все ответы + age/sex)
   └─► POST /submit-kidscreen
         ├─► scoring/index.ts (reverse → raw → Rasch → T → PR)
         ├─► interpretation/levels.ts (PR → level)
         ├─► interpretation/internalReport.ts (support_flag)
         ├─► INSERT в 3 таблицы
         └─► return { assessment_id, scaleResults[] }
   └─► KidscreenResult
         ├─► firstScreen.ts (группировка по level → 4 блока)
         └─► cards.ts (по клику «Подробнее» → 10 карточек с child_text)
```

## 5. Что нужно подготовить отдельно (из ТЗ / мануала KIDSCREEN)

1. **Таблицы Rasch и T-value** по каждой из 10 шкал — из официального KIDSCREEN-52 manual (не в ТЗ). Без них шаг raw→T не сделать.
2. **A7_C European norms** для PR (нужен age/sex). Если их нет — fallback: маппим level прямо по T-value (T<35, 35–45, 45–55, >55) и помечаем в данных `pr = null, level_source = 't_value_fallback'`.
3. **Полные тексты child_text** по всем 10 шкалам × 4 уровня — большая часть есть в разделе 14 ТЗ, нужно дочитать страницы 10–15 и перенести 1:1.

## 6. Этапы реализации

1. Включить Lovable Cloud, создать 3 таблицы + RLS + роли.
2. Перенести 10 шкал и маппинг question_id → scale_id в `scales.ts` (из текущего `KidscreenQuiz.tsx`).
3. Реализовать scoring (reverse, raw, missing). Покрыть unit-тестами на синтетических ответах.
4. Подключить таблицы Rasch/T/PR (когда соберём их из мануала).
5. Реализовать interpretation (levels, templates, firstScreen, cards).
6. Добавить шаг возраст/пол в `KidscreenQuiz`.
7. Edge function `submit-kidscreen` + сохранение.
8. Экран `KidscreenResult` с первым экраном и раскрытием карточек.
9. Админский internal_report (опционально, отдельная страница под ролью).

## Открытые вопросы к тебе

1. Есть ли у тебя официальные таблицы **raw → Rasch → T** и **A7_C нормы** из KIDSCREEN manual? Без них T-value/PR посчитать нельзя — нужно либо они, либо упрощённый режим только по T-value без percentile.
2. Прохождение должно быть **анонимным** (только по session_token в localStorage) или **с обязательной авторизацией**?
3. Нужен ли сейчас админский internal_report, или это вторая итерация?
