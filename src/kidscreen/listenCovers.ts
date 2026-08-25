import type { ListenItem } from "./whatHelps";

import pod1 from "@/assets/pod-1.jpg";
import pod2 from "@/assets/pod-2.jpg";
import pod3 from "@/assets/pod-3.jpg";
import pod4 from "@/assets/pod-4.jpg";
import pod5 from "@/assets/pod-5.jpg";
import pod6 from "@/assets/pod-6.jpg";
import pod7 from "@/assets/pod-7.jpg";
import pod9 from "@/assets/pod-9.jpg";
import pod11 from "@/assets/pod-11.jpg";
import bookGliori from "@/assets/books/no-matter-what.jpg";
import bookSeuss from "@/assets/books/oh-the-places.jpg";

export type ListenKind = "podcast" | "book";

export interface ResolvedListenItem {
  title: string;
  href?: string;
  cover?: string;
  kind: ListenKind;
}

const COVER_BY_TITLE: Record<string, { cover: string; kind: ListenKind; href?: string }> = {
  "Что делать, если сильно устал? Часть 1. Про сон": { cover: pod5, kind: "podcast" },
  "Зачем вообще психолог?": { cover: pod1, kind: "podcast" },
  "Первая сессия": { cover: pod4, kind: "podcast" },
  "Чего я хочу на самом деле?": { cover: pod2, kind: "podcast" },
  "Родители и границы": { cover: pod3, kind: "podcast" },
  "Свой или чужой?": { cover: pod11, kind: "podcast" },
  "Стыд и прокрастинация": { cover: pod6, kind: "podcast" },
  "Соцсети и сравнение": { cover: pod9, kind: "podcast" },
  "Повторяющиеся отношения": { cover: pod7, kind: "podcast" },
  "Деби Глиори. Что бы ни случилось": {
    cover: bookGliori,
    kind: "book",
    href: "https://www.chitai-gorod.ru/product/chto-by-ni-sluchilos-2603339",
  },
  "Доктор Сьюз. Это только начало": {
    cover: bookSeuss,
    kind: "book",
    href: "https://www.ozon.ru/search/?text=%D0%94%D0%BE%D0%BA%D1%82%D0%BE%D1%80%20%D0%A1%D1%8C%D1%8E%D0%B7%20%D0%AD%D1%82%D0%BE%20%D1%82%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%BE",
  },
};

export function resolveListenItem(item: ListenItem): ResolvedListenItem {
  const meta = COVER_BY_TITLE[item.title];
  return {
    title: item.title,
    href: item.href ?? meta?.href,
    cover: meta?.cover,
    kind: meta?.kind ?? (item.href ? "podcast" : "book"),
  };
}
