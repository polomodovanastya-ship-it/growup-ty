import { useState } from "react";
import { Headphones, ClipboardCheck, ListChecks, ArrowRight, Brain, Users, Sparkles, Shield, MessageCircle, Flame, ChevronDown, ChevronUp, Home, Repeat, Smartphone, UserCheck, HandHeart, Search, Compass, LifeBuoy, Link as LinkIcon } from "lucide-react";
import CareerQuiz from "@/components/CareerQuiz";
import KidscreenQuiz from "@/components/KidscreenQuiz";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const topics = [
  "тревога", "прокрастинация", "отношения", "самооценка",
  "стресс", "мотивация", "одиночество", "выгорание",
];

type HelpLink = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  emergency?: boolean;
};

const helpLinks: HelpLink[] = [
  {
    title: "112 — единый номер экстренных служб",
    description: "Бесплатно, с любого телефона, даже без сим-карты.",
    url: "tel:112",
    tags: ["тревога", "стресс", "одиночество", "выгорание"],
    emergency: true,
  },
  {
    title: "Телефон доверия для детей и подростков",
    description: "8-800-2000-122 — анонимно, бесплатно, круглосуточно по всей России.",
    url: "tel:88002000122",
    tags: ["тревога", "стресс", "одиночество", "выгорание", "отношения", "самооценка"],
    emergency: true,
  },
  {
    title: "Помощь рядом",
    description: "Психологическая поддержка для подростков онлайн — чат с психологом.",
    url: "https://pomoschryadom.ru/",
    tags: ["тревога", "стресс", "самооценка", "одиночество", "выгорание", "отношения", "прокрастинация", "мотивация"],
  },
  {
    title: "Твоя территория (1221.chat)",
    description: "Онлайн-консультации психологов в чате — анонимно и бесплатно.",
    url: "https://1221.chat/",
    tags: ["тревога", "стресс", "самооценка", "одиночество", "выгорание", "отношения", "прокрастинация"],
  },
  {
    title: "Подростковая гостиная",
    description: "Безопасное пространство, где можно поговорить и встретить других.",
    url: "https://podrostkovaya-gostinaya.ru/",
    tags: ["одиночество", "отношения", "самооценка", "мотивация"],
  },
  {
    title: "Classgames",
    description: "Игры и активности про общение, эмоции и взаимодействие в группе.",
    url: "https://classgames.ru/",
    tags: ["отношения", "одиночество", "мотивация", "самооценка"],
  },
];

const podcasts = [
  {
    title: "Зачем вообще психолог?",
    description: "Мне ведь не так уж плохо — или всё-таки стоит попробовать?",
    icon: Search,
    url: "https://mave.stream/e/Ng8tfd3aZI",
    audio: "/audio/episode-1.mp3",
  },
  {
    title: "Кто чем помогает?",
    description: "Психолог, психиатр, коуч, тьютор — в чём разница и к кому идти",
    icon: UserCheck,
  },
  {
    title: "Первая сессия",
    description: "Что происходит на первой встрече и что значит конфиденциальность",
    icon: Shield,
  },
  {
    title: "Что делать, если сильно устал? Часть 1. Про сон",
    description: "Почему недосып — не наша вина, и как бережно вернуть себе силы.",
    icon: Flame,
    url: "https://mave.stream/e/q2en9dlbty",
    audio: "/audio/episode-4.mp3",
  },
  {
    title: "Чего я хочу на самом деле?",
    description: "А чего от меня просто ждут — и как это различить",
    icon: Brain,
  },
  {
    title: "Стыд и прокрастинация",
    description: "Перфекционизм, откладывание и что за этим стоит",
    icon: Sparkles,
  },
  {
    title: "Повторяющиеся отношения",
    description: "Почему я снова и снова выбираю одно и то же",
    icon: Repeat,
  },
  {
    title: "Родители и границы",
    description: "Сепарация без войны — возможно ли это?",
    icon: Home,
  },
  {
    title: "Парням тоже можно",
    description: "Просить помощи — это не слабость",
    icon: HandHeart,
  },
  {
    title: "Соцсети и сравнение",
    description: "Инстадивы, одиночество и digital well-being",
    icon: Smartphone,
  },
  {
    title: "Онлайн-терапия",
    description: "Как она работает и почему раз в неделю лучше, чем каждый день",
    icon: MessageCircle,
  },
  {
    title: "Свой или чужой?",
    description: "С кем я дружу и почему друзей приходится выбирать",
    icon: Users,
  },
];

const checkups = [
  { title: "Давай познакомимся", icon: HandHeart, action: "kidscreen" },
  { title: "Задумался о выборе профессии", icon: Compass, action: "career-quiz" },
];

const checklists = [
  { title: "Утренняя рутина для энергии", icon: Sparkles },
  { title: "Как справиться с тревогой", icon: Shield },
  { title: "Первые шаги к терапевту", icon: MessageCircle },
];

const INITIAL_VISIBLE = 3;

const Index = () => {
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);
  const [careerQuizOpen, setCareerQuizOpen] = useState(false);
  const [kidscreenOpen, setKidscreenOpen] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const visiblePodcasts = showAllPodcasts ? podcasts : podcasts.slice(0, INITIAL_VISIBLE);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filteredLinks =
    activeTags.length === 0
      ? helpLinks
      : helpLinks.filter((l) => activeTags.every((t) => l.tags.includes(t)));

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4 h-14 md:h-16 flex items-center">
          <a href="/" aria-label="как ты — на главную" className="flex items-center">
            <img
              src={logo}
              alt="как ты"
              className="h-7 md:h-9 w-auto select-none"
              draggable={false}
            />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-4 pt-8 pb-10 md:pt-14 md:pb-16 flex flex-col items-center text-center">
        {/* Blobs */}
        <div className="blob w-48 h-48 md:w-72 md:h-72 bg-primary/30 -top-10 -left-10 md:-left-20" />
        <div className="blob w-40 h-40 md:w-64 md:h-64 bg-secondary/30 top-20 -right-8 md:-right-16" style={{ animationDelay: "2s" }} />
        <div className="blob blob-sm w-32 h-32 bg-accent/40 bottom-0 left-1/3 hidden md:block" style={{ animationDelay: "4s" }} />

        <ScrollReveal>
          <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Привет, как ты?
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="relative mt-4 max-w-md text-base md:text-lg text-muted-foreground">
            Здесь можно разобраться в себе, послушать что-то полезное и сделать первый шаг — в своём темпе.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative mt-6 flex flex-wrap justify-center gap-2">
            {topics.map((t, i) => {
              const isActive = activeTags.includes(t);
              return (
                <ScrollReveal key={t} delay={300 + i * 80}>
                  <button
                    type="button"
                    onClick={() => {
                      toggleTag(t);
                      setTimeout(() => {
                        document.getElementById("help-links")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }}
                    aria-pressed={isActive}
                    className={`inline-block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <Button
            size="lg"
            className="relative mt-8 rounded-full px-8 text-base gap-2"
            onClick={() => setKidscreenOpen(true)}
          >
            Начать <ArrowRight size={18} />
          </Button>
        </ScrollReveal>
      </section>

      {/* Podcasts */}
      <section className="px-4 pt-2 pb-12 md:pb-16 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <Headphones className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Послушай</h2>
            <span className="ml-1 text-sm text-muted-foreground">· {podcasts.length} выпусков</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePodcasts.map((p, i) => {
            const url = (p as any).url as string | undefined;
            const audio = (p as any).audio as string | undefined;
            const cardClasses =
              "group rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col";
            const cardInner = (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <p.icon className="text-primary" size={20} />
                  </div>
                  <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs font-medium">
                    {i + 1}/{podcasts.length}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-auto">
                  {audio && (
                    <audio
                      controls
                      preload="none"
                      className="mt-4 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <source src={audio} type="audio/mpeg" />
                    </audio>
                  )}
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Открыть на mave.stream <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              </>
            );
            return (
              <ScrollReveal key={p.title} delay={i < INITIAL_VISIBLE ? i * 100 : 0}>
                <div className={cardClasses}>{cardInner}</div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="ghost"
            className="rounded-full gap-2 text-muted-foreground hover:text-primary"
            onClick={() => setShowAllPodcasts(!showAllPodcasts)}
          >
            {showAllPodcasts ? (
              <>Свернуть <ChevronUp size={16} /></>
            ) : (
              <>Ещё {podcasts.length - INITIAL_VISIBLE} выпусков <ChevronDown size={16} /></>
            )}
          </Button>
        </div>
      </section>

      {/* Checkups + Checklists */}
      <section className="px-4 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checkups */}
          <ScrollReveal>
            <div className="rounded-2xl border bg-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ClipboardCheck className="text-primary" size={22} />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Как ты сейчас?</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Короткие вопросы — чтобы понять, что с тобой происходит прямо сейчас.
              </p>
              <ul className="space-y-2">
                {checkups.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted cursor-pointer group"
                    onClick={() => {
                      const action = (c as any).action;
                      if (action === "career-quiz") setCareerQuizOpen(true);
                      if (action === "kidscreen") setKidscreenOpen(true);
                    }}
                  >
                    <c.icon size={18} className="text-primary/70 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-foreground">{c.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Checklists */}
          <ScrollReveal delay={100}>
            <div className="rounded-2xl border bg-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ListChecks className="text-secondary" size={22} />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Действуй</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Простые чеклисты — маленькие шаги, которые реально помогают.
              </p>
              <ul className="space-y-2">
                {checklists.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted cursor-pointer group"
                  >
                    <c.icon size={18} className="text-secondary/70 group-hover:text-secondary transition-colors" />
                    <span className="text-sm font-medium text-foreground">{c.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CareerQuiz open={careerQuizOpen} onOpenChange={setCareerQuizOpen} />
      <KidscreenQuiz open={kidscreenOpen} onOpenChange={setKidscreenOpen} />

      {/* Useful links & emergency help */}
      <section id="help-links" className="px-4 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-2">
            <LifeBuoy className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Помощь рядом</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {activeTags.length === 0
              ? "Полезные ссылки, экстренные службы и телефоны доверия. Выбери теги выше — отфильтруем по теме."
              : `Подобрали по тегам: ${activeTags.join(", ")}.`}
            {activeTags.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="ml-2 underline-offset-4 hover:underline text-primary"
              >
                сбросить
              </button>
            )}
          </p>
        </ScrollReveal>

        {filteredLinks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            По выбранным тегам ничего не нашли. Попробуй убрать часть фильтров.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredLinks.map((l, i) => (
              <ScrollReveal key={l.title} delay={i * 60}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group block h-full rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                    l.emergency ? "border-destructive/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`rounded-xl p-2.5 ${l.emergency ? "bg-destructive/10" : "bg-primary/10"}`}>
                      {l.emergency ? (
                        <LifeBuoy className="text-destructive" size={20} />
                      ) : (
                        <LinkIcon className="text-primary" size={20} />
                      )}
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {l.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{l.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {l.tags.map((t) => {
                      const isActive = activeTags.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTag(t);
                          }}
                          className={`inline-block rounded-full px-2 py-0.5 text-xs transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Ты не один(а). <span className="text-primary font-medium">Как ты</span> — проект о ментальном здоровье 💜
        </p>
      </footer>
    </div>
  );
};

export default Index;
