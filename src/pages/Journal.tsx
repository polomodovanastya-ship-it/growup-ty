import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, LifeBuoy } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import type { ScaleId } from "@/kidscreen/scales";
import tensionImg from "@/assets/journal/tension.jpg";
import sensesImg from "@/assets/journal/senses.jpg";
import stopImg from "@/assets/journal/stop.jpg";
import thoughtBoxImg from "@/assets/journal/thought-box.jpg";
import wallImg from "@/assets/journal/wall.jpg";
import boxImg from "@/assets/journal/box.jpg";
import notAloneImg from "@/assets/journal/not-alone.jpg";
import towerImg from "@/assets/journal/tower.jpg";
import mirrorImg from "@/assets/journal/mirror.jpg";
import timeJumpImg from "@/assets/journal/time-jump.jpg";

type Technique = {
  id: string;
  title: string;
  image: string;
};

type JournalPageData = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  scales: ScaleId[];
  techniques: Technique[];
};

/** Страницы журнала: 2–3 техники, сгруппированные так же, как блоки рекомендаций. */
const PAGES: JournalPageData[] = [
  {
    id: "body",
    kicker: "Тело",
    title: "Когда напряжение в теле",
    intro: "Иногда тело замечает тревогу раньше, чем получается её назвать. Эти техники возвращают внимание к ощущениям.",
    scales: ["physical", "moods"],
    techniques: [
      { id: "tension", title: "Где живёт напряжение?", image: tensionImg },
      { id: "senses", title: "Ящик ощущений", image: sensesImg },
    ],
  },
  {
    id: "thoughts",
    kicker: "Мысли",
    title: "Когда мыслей слишком много",
    intro: "Мысль можно остановить, вынести наружу или ненадолго отложить. Так внутри становится чуть тише.",
    scales: ["moods", "psychological", "school"],
    techniques: [
      { id: "stop", title: "Остановись", image: stopImg },
      { id: "thought-box", title: "Коробка мыслей", image: thoughtBoxImg },
      { id: "wall", title: "Стена чувств и мыслей", image: wallImg },
    ],
  },
  {
    id: "support",
    kicker: "Опора",
    title: "Когда нужна опора",
    intro: "Рядом могут быть свои вещи и люди, которым сейчас тоже непросто. Не обязательно справляться в одиночку.",
    scales: ["social_support", "parent_relations", "moods", "psychological"],
    techniques: [
      { id: "box", title: "Секретная шкатулка", image: boxImg },
      { id: "not-alone", title: "Мы не одни", image: notAloneImg },
    ],
  },
  {
    id: "self",
    kicker: "Я",
    title: "Когда смотришь на себя",
    intro: "Можно собрать то, что в тебе уже есть, посмотреть чуть добрее и заглянуть немного вперёд.",
    scales: ["self_perception", "autonomy", "psychological", "school"],
    techniques: [
      { id: "tower", title: "Собери башню", image: towerImg },
      { id: "mirror", title: "Зеркало", image: mirrorImg },
      { id: "time-jump", title: "Прыжок во времени", image: timeJumpImg },
    ],
  },
];

function readFocus(state: unknown): ScaleId[] {
  if (!state || typeof state !== "object" || !("focusScaleIds" in state)) return [];
  const ids = (state as { focusScaleIds?: unknown }).focusScaleIds;
  if (!Array.isArray(ids)) return [];
  const known = new Set(PAGES.flatMap((page) => page.scales));
  return ids.filter((id): id is ScaleId => typeof id === "string" && known.has(id as ScaleId));
}

function pageScore(page: JournalPageData, ids: ScaleId[]) {
  return page.scales.reduce((sum, scale) => sum + (ids.includes(scale) ? 1 : 0), 0);
}

function pickStart(ids: ScaleId[]) {
  let bestIndex = 0;
  let best = 0;
  PAGES.forEach((page, index) => {
    const score = pageScore(page, ids);
    if (score > best) {
      best = score;
      bestIndex = index;
    }
  });
  return { index: bestIndex, matched: best > 0 };
}

type Flip = { dir: "next" | "prev"; from: number; to: number };

const JournalSheet = ({
  page,
  onOpen,
}: {
  page: JournalPageData;
  onOpen: (technique: Technique) => void;
}) => (
  <article className="relative flex h-full flex-col bg-[#fbf7f0] text-foreground">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-gradient-to-r from-[#e6d3b6] via-[#f3e6d2] to-transparent" />
    <div
      className="pointer-events-none absolute inset-y-4 left-[14px] w-px opacity-70"
      style={{
        backgroundImage: "radial-gradient(circle, #b08968 1.1px, transparent 1.3px)",
        backgroundSize: "2px 18px",
      }}
    />
    <div className="flex flex-col gap-3 p-4 pl-8 sm:gap-4 sm:p-6 sm:pl-10">
      <header className="shrink-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{page.kicker}</p>
        <h2 className="mt-1 text-xl font-bold leading-tight sm:text-2xl md:text-3xl">{page.title}</h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{page.intro}</p>
      </header>
      <div
        className={cn(
          "grid gap-3",
          page.techniques.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2",
          "sm:h-[min(46vh,440px)]",
        )}
      >
        {page.techniques.map((technique) => (
          <button
            key={technique.id}
            type="button"
            onClick={() => onOpen(technique)}
            className="group relative aspect-square w-full overflow-hidden rounded-2xl text-left ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:aspect-auto sm:h-full"
            aria-label={`Открыть технику «${technique.title}»`}
          >
            <img
              src={technique.image}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-center"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  </article>
);

const Journal = () => {
  const location = useLocation();
  const focus = useMemo(() => readFocus(location.state), [location.state]);
  const start = useMemo(() => pickStart(focus), [focus]);
  const [index, setIndex] = useState(start.index);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [active, setActive] = useState<Technique | null>(null);
  const finished = useRef(false);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const goTo = useCallback(
    (next: number) => {
      if (flip || next === index || next < 0 || next >= PAGES.length) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setIndex(next);
        return;
      }
      finished.current = false;
      setFlip({ dir: next > index ? "next" : "prev", from: index, to: next });
    },
    [flip, index],
  );

  const finishFlip = useCallback(() => {
    if (finished.current || !flip) return;
    finished.current = true;
    setIndex(flip.to);
    setFlip(null);
  }, [flip]);

  useEffect(() => {
    if (!flip) return;
    const timer = window.setTimeout(finishFlip, 900);
    return () => window.clearTimeout(timer);
  }, [flip, finishFlip]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (active) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key === "ArrowRight") goTo(index + 1);
      if (event.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo, index]);

  const openTechnique = (technique: Technique) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (flip) return;
    setActive(technique);
  };

  const visibleIndex = flip ? (flip.dir === "next" ? flip.to : flip.from) : index;
  const turningIndex = flip ? (flip.dir === "next" ? flip.from : flip.to) : null;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Seo
        title="Журнал самопомощи — Как ты?"
        description="Техники, которые можно попробовать, когда тревожно, тяжело или мыслей слишком много."
        path="/journal"
      />
      <header className="sticky top-0 z-30 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-6xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            На главную
          </Link>
          <img src={logo} alt="как ты" className="h-7 md:h-9 w-auto select-none" draggable={false} />
        </div>
      </header>

      <main className="relative px-4 pt-6 pb-16 md:pt-10">
        <div className="blob w-48 h-48 md:w-72 md:h-72 bg-primary/25 -top-8 -left-16" />
        <div
          className="blob w-40 h-40 md:w-64 md:h-64 bg-secondary/25 top-24 -right-10"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">Журнал самопомощи</h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            На каждой странице — один тип поддержки, две или три техники. Листай и открой ту, что откликается.
          </p>
          {focus.length > 0 && (
            <p className="mt-3 text-sm text-primary">
              {start.matched
                ? "Открыли страницу ближе к твоим результатам. Остальные техники тоже можно полистать."
                : "Техники можно попробовать в любом состоянии. Листай и бери то, что откликается."}
            </p>
          )}
        </div>

        <div className="relative mx-auto mt-6 md:mt-8 w-full max-w-5xl">
          <div className="pointer-events-none absolute -right-1.5 top-3 bottom-3 w-2 rounded-r-md bg-[#e7d8c3] shadow-sm" />
          <div className="pointer-events-none absolute -right-3 top-5 bottom-5 w-2 rounded-r-md bg-[#f3e7d6]" />

          <div
            className={cn("journal-scene relative touch-pan-y", flip && "pointer-events-none")}
            onPointerDown={(event) => {
              swipe.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              const startPoint = swipe.current;
              swipe.current = null;
              if (!startPoint || flip) return;
              const dx = event.clientX - startPoint.x;
              const dy = event.clientY - startPoint.y;
              if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
              swiped.current = true;
              goTo(index + (dx < 0 ? 1 : -1));
            }}
            onPointerCancel={() => {
              swipe.current = null;
            }}
          >
            <div className="relative overflow-hidden rounded-[28px] shadow-[0_18px_50px_-24px_rgba(60,40,20,0.45)] ring-1 ring-black/10">
              <JournalSheet page={PAGES[visibleIndex]} onOpen={openTechnique} />
            </div>

            {flip && turningIndex !== null && (
              <div
                aria-hidden
                className={cn(
                  "journal-flipper absolute inset-0 z-10",
                  flip.dir === "next" ? "journal-flip-next" : "journal-flip-prev",
                )}
                onAnimationEnd={(event) => {
                  if (event.target !== event.currentTarget) return;
                  finishFlip();
                }}
              >
                <div className="journal-face absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_18px_50px_-24px_rgba(60,40,20,0.45)] ring-1 ring-black/10">
                  <JournalSheet page={PAGES[turningIndex]} onOpen={() => undefined} />
                </div>
                <div className="journal-face journal-face-back absolute inset-0 overflow-hidden rounded-[28px] bg-[#efe2cf] shadow-inner ring-1 ring-black/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_42%),linear-gradient(160deg,#f6ecde,#e7d7c0)]" />
                </div>
              </div>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            {PAGES[index].title}. Страница {index + 1} из {PAGES.length}.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => goTo(index - 1)}
              disabled={index === 0 || !!flip}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft size={18} />
            </Button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Страницы журнала">
              {PAGES.map((page, pageIndex) => (
                <button
                  key={page.id}
                  type="button"
                  role="tab"
                  aria-selected={pageIndex === index}
                  aria-label={page.title}
                  onClick={() => goTo(pageIndex)}
                  disabled={!!flip}
                  className={cn(
                    "h-2.5 rounded-full transition-all",
                    pageIndex === index ? "w-8 bg-primary" : "w-2.5 bg-primary/25 hover:bg-primary/45",
                  )}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => goTo(index + 1)}
              disabled={index === PAGES.length - 1 || !!flip}
              aria-label="Следующая страница"
            >
              <ChevronRight size={18} />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {PAGES.map((page, pageIndex) => (
              <button
                key={page.id}
                type="button"
                onClick={() => goTo(pageIndex)}
                disabled={!!flip}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  pageIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground",
                )}
              >
                {page.kicker}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Нажми на картинку, чтобы рассмотреть технику. Листать можно стрелками или свайпом.
          </p>
        </div>

        <div className="relative mt-10 text-center">
          <Link to="/help" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            <LifeBuoy size={16} /> Если сейчас тяжело — помощь рядом
          </Link>
        </div>
      </main>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-h-[94vh] w-[min(96vw,920px)] max-w-none overflow-y-auto border-none bg-[#fbf7f0] p-3 sm:p-4 [&>button]:rounded-full [&>button]:bg-background [&>button]:p-1 [&>button]:opacity-100">
          <DialogTitle className="sr-only">{active?.title ?? "Техника"}</DialogTitle>
          <DialogDescription className="sr-only">Иллюстрация техники самопомощи</DialogDescription>
          {active && <img src={active.image} alt={active.title} className="h-auto w-full rounded-xl" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journal;
