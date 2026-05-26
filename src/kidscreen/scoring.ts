import { SCALES, ScaleDef, ScaleId, Level, levelFromT, LEVEL_LABEL } from "./scales";
import { INTERPRETATION } from "./interpretation";

export interface ScaleResult {
  scaleId: ScaleId;
  name: string;
  short: string;
  rawScore: number;
  tValue: number; // 0..100 (упрощённая линейная шкала)
  level: Level;
  levelLabel: string;
  supportFlag: boolean;
  text: string;
}

export interface ProfileReport {
  scales: ScaleResult[];
  overallTValue: number;
  overallLevel: Level;
  summary: string;
  supportAreas: string[];
}

/**
 * Преобразует ответ (1..5) с учётом реверса.
 * Реверс: 6 - v (для вопросов в reverseIds).
 */
function valueFor(scale: ScaleDef, qid: string, v: number): number {
  return scale.reverseIds.includes(qid) ? 6 - v : v;
}

export function computeScale(
  scale: ScaleDef,
  answers: Record<string, number>,
): ScaleResult {
  const values = scale.questionIds.map((qid) => valueFor(scale, qid, answers[qid] ?? 3));
  const raw = values.reduce((a, b) => a + b, 0);
  const n = scale.questionIds.length;
  const minR = n * 1;
  const maxR = n * 5;
  // Упрощённая T: линейно из raw → 0..100
  const t = Math.round(((raw - minR) / (maxR - minR)) * 100);
  const level = levelFromT(t);
  const interp = INTERPRETATION[scale.id][level];
  return {
    scaleId: scale.id,
    name: scale.name,
    short: scale.short,
    rawScore: raw,
    tValue: t,
    level,
    levelLabel: LEVEL_LABEL[level],
    supportFlag: level === "low",
    text: interp,
  };
}

export function computeProfile(answers: Record<string, number>): ProfileReport {
  const scales = SCALES.map((s) => computeScale(s, answers));
  const overall = Math.round(scales.reduce((a, s) => a + s.tValue, 0) / scales.length);
  const overallLevel = levelFromT(overall);
  const supportAreas = scales.filter((s) => s.supportFlag).map((s) => s.name);

  let summary: string;
  if (overallLevel === "high") {
    summary = "В целом ты чувствуешь себя хорошо — в большинстве сфер жизни всё ок. Береги это.";
  } else if (overallLevel === "average") {
    summary = "В целом нормально, но есть сферы, где можно стать к себе чуть внимательнее.";
  } else if (overallLevel === "below_avg") {
    summary = "Сейчас непростой период. Это нормально. Посмотри, какие сферы просят твоего внимания.";
  } else {
    summary = "Кажется, тебе сейчас тяжело сразу в нескольких сферах. Это сигнал — стоит поговорить с кем-то, кому ты доверяешь.";
  }

  return { scales, overallTValue: overall, overallLevel, summary, supportAreas };
}

/**
 * Преобразование строкового ответа из квиза (опции SCALE_*) в число 1..5.
 * Все шкалы в квизе идут от «худшего/минимум» к «лучшему/максимум» по индексу.
 */
export function answerToValue(opt: string, scale: string[]): number {
  const idx = scale.indexOf(opt);
  return idx < 0 ? 3 : idx + 1;
}
