import { Link } from "react-router-dom";
import { useState } from "react";
import { Headphones, ClipboardCheck, ListChecks, ArrowRight, Brain, Users, Sparkles, Shield, MessageCircle, Flame, ChevronDown, ChevronUp, Home, Repeat, Smartphone, UserCheck, HandHeart, Search, Compass, LifeBuoy, Phone, Link as LinkIcon, User } from "lucide-react";
import heroTeens from "@/assets/hero-teens.jpg";
import emojiRelieved from "@/assets/emoji/1f60c.svg";
import emojiSteam from "@/assets/emoji/1f624.svg";
import emojiPleading from "@/assets/emoji/1f97a.svg";
import emojiHearts from "@/assets/emoji/1f970.svg";
import emojiAnxious from "@/assets/emoji/1f630.svg";
import emojiNeutral from "@/assets/emoji/1f610.svg";



const faviconFor = (url: string) => {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${u.hostname}`;
  } catch {
    return null;
  }
};
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
    title: "Подростковая гостиная Благосфера",
    description: "Безопасное пространство для подростков: общение, поддержка и досуг.",
    url: "https://blagosfera.ru/podrostkovaja-gostinaja/",
    tags: ["одиночество", "отношения", "самооценка", "мотивация"],
  },
  {
    title: "Classgames",
    description: "Игры и активности про общение, эмоции и взаимодействие в группе.",
    url: "https://classgames.ru/",
    tags: ["отношения", "одиночество", "мотивация", "самооценка"],
  },
  {
    title: "Верим тебе",
    description: "Платформа поддержки подростков: консультации, чаты, онлайн-помощь.",
    url: "https://teen.verimtebe.ru/",
    tags: ["тревога", "стресс", "самооценка", "одиночество", "отношения", "выгорание"],
  },
];

const podcasts = [
  {
    title: "Зачем вообще психолог?",
    description: "Мне ведь не так уж плохо — или всё-таки стоит попробовать?",
    icon: Search,
    url: "https://mave.stream/e/Ng8tfd3aZI",
    audio: "/audio/episode-1.mp3",
    tags: ["самооценка", "мотивация", "тревога"],
  },
  {
    title: "Чего я хочу на самом деле?",
    description: "А чего от меня просто ждут — и как это различить",
    icon: Brain,
    url: "https://mave.stream/e/F55kiTfaEB",
    audio: "/audio/episode-3.mp3",
    tags: ["мотивация", "самооценка", "прокрастинация"],
  },
  {
    title: "Родители и границы",
    description: "Сепарация без войны — возможно ли это?",
    icon: Home,
    url: "https://mave.stream/e/XnMGRhw4tX",
    audio: "/audio/episode-5.mp3",
    tags: ["отношения", "стресс"],
  },
  {
    title: "Первая сессия",
    description: "Что происходит на первой встрече и что значит конфиденциальность",
    icon: Shield,
    tags: ["тревога", "самооценка"],
  },
  {
    title: "Что делать, если сильно устал? Часть 1. Про сон",
    description: "Почему недосып — не наша вина, и как бережно вернуть себе силы.",
    icon: Flame,
    url: "https://mave.stream/e/q2en9dlbty",
    audio: "/audio/episode-4.mp3",
    tags: ["выгорание", "стресс"],
  },
  {
    title: "Стыд и прокрастинация",
    description: "Перфекционизм, откладывание и что за этим стоит",
    icon: Sparkles,
    tags: ["прокрастинация", "самооценка", "стресс"],
  },
  {
    title: "Повторяющиеся отношения",
    description: "Почему я снова и снова выбираю одно и то же",
    icon: Repeat,
    tags: ["отношения", "самооценка"],
  },
  {
    title: "Парням тоже можно",
    description: "Просить помощи — это не слабость",
    icon: HandHeart,
    tags: ["самооценка", "одиночество", "стресс"],
  },
  {
    title: "Соцсети и сравнение",
    description: "Инстадивы, одиночество и digital well-being",
    icon: Smartphone,
    tags: ["одиночество", "самооценка", "тревога"],
  },
  {
    title: "Онлайн-терапия",
    description: "Как она работает и почему раз в неделю лучше, чем каждый день",
    icon: MessageCircle,
    tags: ["тревога", "выгорание", "мотивация"],
  },
  {
    title: "Свой или чужой?",
    description: "С кем я дружу и почему друзей приходится выбирать",
    icon: Users,
    tags: ["отношения", "одиночество"],
  },
];

const checkups = [
  { title: "Давай познакомимся", icon: HandHeart, action: "kidscreen" },
  { title: "Задумался о выборе профессии", icon: Compass, action: "career-quiz" },
  { title: "Кто чем помогает? Статья", icon: UserCheck, href: "/articles/who-helps" },
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

  const filteredLinks = helpLinks;

  const visiblePodcasts = showAllPodcasts ? podcasts : podcasts.slice(0, INITIAL_VISIBLE);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Top menu */}
      <div className="bg-muted/40 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center">
          <nav className="flex items-center gap-5 text-sm font-medium lowercase">
            <a href="#checkups" className="text-foreground hover:text-primary transition-colors">С чего начать</a>
            <span className="h-4 w-px bg-border" />
            <a href="#podcasts" className="text-foreground hover:text-primary transition-colors">слушать</a>
            <span className="h-4 w-px bg-border" />
            <a href="#help-links" className="text-foreground hover:text-primary transition-colors">помощь рядом</a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-sm font-semibold lowercase">
            <img src={logo} alt="" className="h-6 w-auto" />
            <span className="text-foreground">как ты?</span>
          </a>
          <a href="#" aria-label="Профиль" className="rounded-full p-2 hover:bg-muted transition-colors">
            <User size={20} className="text-foreground" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-4 pb-6 md:pt-6 md:pb-8 max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-xl">
          <img
            src={heroTeens}
            alt="Подростки"
            className="w-full h-[420px] md:h-[560px] object-cover object-center"
            width={1600}
            height={896}
          />
          {/* Top-left logo */}
          <div className="absolute top-5 left-5 md:top-8 md:left-10 flex items-center gap-2">
            <span className="text-white text-2xl md:text-3xl font-semibold lowercase tracking-tight drop-shadow">
              как ты?
            </span>
            <svg width="48" height="14" viewBox="0 0 48 14" fill="none" className="text-white">
              <path d="M1 9 C 12 2, 28 2, 47 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          {/* Top-right headline */}
          <div className="absolute top-5 right-5 md:top-8 md:right-10 max-w-[58%] md:max-w-sm text-right">
            <h1 className="text-white text-base md:text-2xl font-bold leading-snug drop-shadow-md">
              Здесь можно избавиться от тревоги и разобраться в себе
            </h1>
          </div>
          {/* Bottom-right CTA */}
          <button
            type="button"
            onClick={() => setKidscreenOpen(true)}
            className="absolute bottom-5 right-5 md:bottom-8 md:right-10 inline-flex items-center gap-2 rounded-full bg-white text-foreground px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Начать <ArrowRight size={18} />
          </button>
        </div>


        {/* Feelings */}
        <div className="mt-8 md:mt-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Как ты себя чувствуешь прямо сейчас?</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Выбери то, что больше всего подходит. Неправильного ответа не бывает
          </p>
          <div className="mt-6 md:mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-2 max-w-4xl mx-auto">
            {[
              { emoji: emojiRelieved, label: "спокойно" },
              { emoji: emojiSteam, label: "злюсь,\nкак черт" },
              { emoji: emojiPleading, label: "плачу" },
              { emoji: emojiHearts, label: "любовь\nокрыляет" },
              { emoji: emojiAnxious, label: "боюсь" },
              { emoji: emojiNeutral, label: "не чувствую\nничего" },
            ].map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setKidscreenOpen(true)}
                className="flex flex-col items-center gap-2 group"
              >
                <img
                  src={f.emoji}
                  alt=""
                  aria-hidden="true"
                  className="w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-110"
                  loading="lazy"
                />
                <span className="text-xs md:text-sm text-foreground whitespace-pre-line leading-tight">{f.label}</span>
              </button>
            ))}
          </div>

        </div>
      </section>


      {/* Podcasts */}
      <section id="podcasts" className="px-4 pt-2 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <Headphones className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Послушай</h2>
            <span className="ml-1 text-sm text-muted-foreground">· {podcasts.length}</span>
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

        {podcasts.length > INITIAL_VISIBLE && (
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
        )}
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-border/40" />
      </div>

      {/* Checkups */}
      <section id="checkups" className="px-4 pt-12 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">С чего начать</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {checkups.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 60}>
              {(c as any).href ? (
              <Link
                to={(c as any).href}
                className="group w-full text-left h-full rounded-xl border bg-card p-3 transition-all duration-300 hover:shadow-md hover:scale-[1.01] block"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-1.5 shrink-0 flex items-center justify-center w-9 h-9">
                    <c.icon className="text-primary" size={18} />
                  </div>
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug flex-1 min-w-0">
                    {c.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  />
                </div>
              </Link>
              ) : (
              <button
                type="button"
                onClick={() => {
                  const action = (c as any).action;
                  if (action === "career-quiz") setCareerQuizOpen(true);
                  if (action === "kidscreen") setKidscreenOpen(true);
                }}
                className="group w-full text-left h-full rounded-xl border bg-card p-3 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-1.5 shrink-0 flex items-center justify-center w-9 h-9">
                    <c.icon className="text-primary" size={18} />
                  </div>
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug flex-1 min-w-0">
                    {c.title}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  />
                </div>
              </button>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-border/40" />
      </div>

      <CareerQuiz open={careerQuizOpen} onOpenChange={setCareerQuizOpen} />
      <KidscreenQuiz open={kidscreenOpen} onOpenChange={setKidscreenOpen} />

      {/* Useful links & emergency help */}
      <section id="help-links" className="px-4 pt-12 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-2">
            <LifeBuoy className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Помощь рядом</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredLinks.map((l, i) => {
              const favicon = l.url.startsWith("http") ? faviconFor(l.url) : null;
              return (
              <ScrollReveal key={l.title} delay={i * 60}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group block h-full rounded-xl border bg-card p-3 transition-all duration-300 hover:shadow-md hover:scale-[1.01] ${
                    l.emergency ? "border-destructive/40" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-1.5 shrink-0 flex items-center justify-center w-9 h-9 ${l.emergency ? "bg-destructive/10" : "bg-muted"}`}>
                      {l.emergency ? (
                        <Phone className="text-destructive" size={18} />
                      ) : favicon ? (
                        <img src={favicon} alt="" className="w-6 h-6 rounded" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <LinkIcon className="text-primary" size={18} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                        {l.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{l.description}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1"
                    />
                  </div>
                </a>
              </ScrollReveal>
            );})}
          </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Ты не один(а).{" "}
          <Link to="/about" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
            Команда проекта
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="text-primary font-medium">Как ты</span> — проект о ментальном здоровье 💜
        </p>
        <a
          href="mailto:info@kak-ty.live"
          className="inline-block text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
        >
          info@kak-ty.live
        </a>
      </footer>
    </div>
  );
};

export default Index;
