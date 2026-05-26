// KIDSCREEN-52 шкалы (упрощённый режим без A7_C норм)
export type ScaleId =
  | "physical"
  | "psychological"
  | "moods"
  | "self_perception"
  | "autonomy"
  | "parent_relations"
  | "financial"
  | "social_support"
  | "school"
  | "social_acceptance";

export interface ScaleDef {
  id: ScaleId;
  name: string;
  short: string;
  questionIds: string[];
  reverseIds: string[]; // вопросы с обратной шкалой
}

export const SCALES: ScaleDef[] = [
  {
    id: "physical",
    name: "Физическое благополучие",
    short: "Тело и активность",
    questionIds: ["h1", "h2", "h3", "h4", "h5"],
    reverseIds: ["h1"], // «отличное» = лучший ответ, в шкале он первый
  },
  {
    id: "psychological",
    name: "Психологическое благополучие",
    short: "Радость и удовлетворение",
    questionIds: ["f1", "f2", "f3", "f4", "f5", "f6"],
    reverseIds: [],
  },
  {
    id: "moods",
    name: "Настроение и эмоции",
    short: "Эмоциональный фон",
    questionIds: ["m1", "m2", "m3", "m4", "m5", "m6", "m7"],
    reverseIds: ["m1", "m2", "m3", "m4", "m5", "m6", "m7"],
  },
  {
    id: "self_perception",
    name: "Восприятие себя",
    short: "Отношение к себе",
    questionIds: ["s1", "s2", "s3", "s4", "s5"],
    reverseIds: ["s3", "s4", "s5"],
  },
  {
    id: "autonomy",
    name: "Самостоятельность",
    short: "Свободное время",
    questionIds: ["ft1", "ft2", "ft3", "ft4", "ft5"],
    reverseIds: [],
  },
  {
    id: "parent_relations",
    name: "Отношения с родителями и дом",
    short: "Семья",
    questionIds: ["fa1", "fa2", "fa3", "fa4", "fa5", "fa6"],
    reverseIds: [],
  },
  {
    id: "financial",
    name: "Финансовые ресурсы",
    short: "Карманные деньги",
    questionIds: ["mo1", "mo2", "mo3"],
    reverseIds: [],
  },
  {
    id: "social_support",
    name: "Друзья и поддержка",
    short: "Сверстники",
    questionIds: ["fr1", "fr2", "fr3", "fr4", "fr5", "fr6"],
    reverseIds: [],
  },
  {
    id: "school",
    name: "Школьная среда",
    short: "Школа и учёба",
    questionIds: ["sc1", "sc2", "sc3", "sc4", "sc5", "sc6"],
    reverseIds: [],
  },
  {
    id: "social_acceptance",
    name: "Социальное принятие",
    short: "Отношения с окружающими",
    questionIds: ["b1", "b2", "b3"],
    reverseIds: ["b1", "b2", "b3"],
  },
];

export type Level = "low" | "below_avg" | "average" | "high";

export function levelFromT(t: number): Level {
  if (t < 35) return "low";
  if (t < 50) return "below_avg";
  if (t < 65) return "average";
  return "high";
}

export const LEVEL_LABEL: Record<Level, string> = {
  low: "Нужна поддержка",
  below_avg: "Ниже среднего",
  average: "В норме",
  high: "Высокий уровень",
};
