import { ScaleId } from "./scales";
import { PRACTICES, Practice } from "./practices";
import type { ScaleResult } from "./scoring";

export interface ListenItem {
  title: string;
  href?: string;
}

export interface WhatHelps {
  /** Послушать / почитать */
  listen: ListenItem[];
  /** Попробовать — короткая практика прямо в выдаче */
  tryTitle: string;
  tryText: string;
  /** Следующий шаг — действие в реальной жизни */
  nextStep: string;
  /** Показывать блок «Дыхание» */
  breathing: boolean;
  /** Практики, которые нельзя недобрать (сфера без тегов в библиотеке) */
  extraPracticeIds?: string[];
}

export const WHAT_HELPS: Record<ScaleId, WhatHelps> = {
  physical: {
    listen: [
      {
        title: "Что делать, если сильно устал? Часть 1. Про сон",
        href: "https://mave.stream/e/q2en9dlbty",
      },
    ],
    tryTitle: "Проверь тело",
    tryText:
      "Где сейчас больше всего усталости или напряжения? Потянись или пройдись пару минут. Потом напряги плечи и руки на 3–4 секунды и расслабь. Повтори 2–3 раза. Заметь, что изменилось.",
    nextStep: "Если самочувствие часто беспокоит, расскажи об этом взрослому, которому доверяешь.",
    breathing: true,
  },
  moods: {
    listen: [
      { title: "Деби Глиори. Что бы ни случилось", href: "https://www.chitai-gorod.ru/product/chto-by-ni-sluchilos-2603339" },
      { title: "Зачем вообще психолог?", href: "https://mave.stream/e/Ng8tfd3aZI" },
      { title: "Первая сессия", href: "https://mave.stream/e/Yykg2hB0r1" },
    ],
    tryTitle: "Покажи своё чувство без слов",
    tryText:
      "Выбери цвет, форму, линию или нарисуй его как хочется. Если бы это чувство могло говорить, что бы оно сказало? Что ему сейчас нужно?",
    nextStep: "Выбери, что сейчас поможет: поговорить, пройтись, написать или побыть в тишине.",
    breathing: true,
  },
  psychological: {
    listen: [
      {
        title: "Что делать, если сильно устал? Часть 1. Про сон",
        href: "https://mave.stream/e/q2en9dlbty",
      },
    ],
    tryTitle: "Три вещи, после которых легче",
    tryText:
      "Вспомни 3 вещи, после которых тебе обычно становится чуть легче. Попробуй сегодня одну из них.",
    nextStep:
      "Если такое состояние держится долго, расскажи об этом человеку, которому доверяешь.",
    breathing: true,
  },
  self_perception: {
    listen: [
      { title: "Доктор Сьюз. Это только начало", href: "https://www.ozon.ru/search/?text=%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%20%D0%A1%D1%8C%D1%8E%D0%B7%20%D0%AD%D1%82%D0%BE%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE" },
      { title: "Соцсети и сравнение" },
      { title: "Стыд и прокрастинация" },
    ],
    tryTitle: "«Я — это больше, чем…»",
    tryText:
      "Продолжи фразу: «Я — это больше, чем мои оценки, внешность, одна ошибка, чужое мнение». Добавь 3–5 вещей про себя: интересы, качества, умения, людей, мечты.",
    nextStep: "Когда поймаешь себя на сравнении, спроси: «А что важно мне?»",
    breathing: false,
  },
  autonomy: {
    listen: [
      { title: "Доктор Сьюз. Это только начало", href: "https://www.ozon.ru/search/?text=%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%20%D0%A1%D1%8C%D1%8E%D0%B7%20%D0%AD%D1%82%D0%BE%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE" },
      { title: "Чего я хочу на самом деле?", href: "https://mave.stream/e/F55kiTfaEB" },
    ],
    tryTitle: "Три вещи из любопытства",
    tryText: "Запиши 3 вещи, которые тебе было бы интересно попробовать. Просто из любопытства.",
    nextStep: "Найди для одной из них немного времени на этой неделе.",
    breathing: false,
  },
  parent_relations: {
    listen: [
      { title: "Деби Глиори. Что бы ни случилось", href: "https://www.chitai-gorod.ru/product/chto-by-ni-sluchilos-2603339" },
      { title: "Родители и границы", href: "https://mave.stream/e/XnMGRhw4tX" },
    ],
    tryTitle: "Сказать или написать?",
    tryText:
      "Составь одну фразу, которую хочется сказать дома. Выбери, как тебе удобнее: сказать лично, написать сообщение или оставить записку.",
    nextStep: "Выбери человека и время для разговора.",
    breathing: false,
  },
  financial: {
    listen: [],
    tryTitle: "Что зависит от меня?",
    tryText:
      "Раздели лист на две части: что в этой ситуации зависит от тебя, а с чем может помочь взрослый?",
    nextStep: "Спроси взрослого: «Мне важно понять, что сейчас возможно».",
    breathing: false,
    extraPracticeIds: ["choice", "compass"],
  },
  social_support: {
    listen: [{ title: "Повторяющиеся отношения" }, { title: "Свой или чужой?" }],
    tryTitle: "Подумай о своей дружбе",
    tryText:
      "Что в ней тебе нравится, а что задевает? Можно записать по 1–2 пункта.",
    nextStep:
      "Выбери, что подходит сейчас: поговорить, написать, взять паузу или попросить поддержки.",
    breathing: false,
  },
  school: {
    listen: [{ title: "Стыд и прокрастинация" }],
    tryTitle: "Самый маленький первый шаг",
    tryText: "Выбери одно дело и найди самый маленький первый шаг на 5–10 минут.",
    nextStep:
      "Если застрял(а), попроси конкретную помощь у учителя, родителя, одноклассника или репетитора.",
    breathing: true,
  },
  social_acceptance: {
    listen: [{ title: "Свой или чужой?" }, { title: "Родители и границы", href: "https://mave.stream/e/XnMGRhw4tX" }],
    tryTitle: "Закончи одну фразу",
    tryText:
      "«Мне нравится, когда…», «Мне неприятно, когда…», «Я хочу по-другому…» или «Остановись, пожалуйста».",
    nextStep:
      "Попробуй сказать одну из этих фраз человеку, с которым хочешь что-то изменить в общении.",
    breathing: true,
  },
};

/**
 * Сферы, где низкий уровень означает: маршрут к человеку выше библиотеки самопомощи.
 */
const RISK_SCALES: ScaleId[] = ["psychological", "moods", "self_perception"];

export function needsHelpFirst(scale: ScaleResult): boolean {
  return scale.level === "low" && RISK_SCALES.includes(scale.scaleId);
}

/** Сферы, которые попадают в блок «Что поможет» */
export function focusScales(scales: ScaleResult[]): ScaleResult[] {
  const lowered = scales.filter((s) => s.level === "low" || s.level === "below_avg");
  if (lowered.length > 0) {
    return [...lowered].sort((a, b) => a.tValue - b.tValue);
  }
  return [...scales].sort((a, b) => a.tValue - b.tValue).slice(0, 3);
}

/**
 * Подбор практик для сферы.
 * Ранжирование: практика, релевантная сразу нескольким сниженным сферам, поднимается выше;
 * основной тег весит больше дополнительного.
 */
export function practicesForScale(
  scaleId: ScaleId,
  loweredScaleIds: ScaleId[],
  limit = 4,
): Practice[] {
  const extraIds = WHAT_HELPS[scaleId].extraPracticeIds ?? [];
  const scored = PRACTICES.map((p) => {
    let score = 0;
    if (p.primaryScales.includes(scaleId)) score += 10;
    else if (p.secondaryScales.includes(scaleId)) score += 5;
    else if (extraIds.includes(p.id)) score += 4;

    if (score === 0) return null;

    for (const other of loweredScaleIds) {
      if (other === scaleId) continue;
      if (p.primaryScales.includes(other)) score += 2;
      else if (p.secondaryScales.includes(other)) score += 1;
    }
    return { p, score };
  }).filter(Boolean) as { p: Practice; score: number }[];

  return scored
    .sort((a, b) => b.score - a.score || PRACTICES.indexOf(a.p) - PRACTICES.indexOf(b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

export function showBreathing(scales: ScaleResult[]): boolean {
  return scales.some((s) => WHAT_HELPS[s.scaleId].breathing);
}
