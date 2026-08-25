import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import { useEffect, useState } from "react";
import { Headphones, ClipboardCheck, ListChecks, ArrowRight, Brain, Users, Sparkles, Shield, MessageCircle, Flame, ChevronDown, ChevronUp, Home, Repeat, Smartphone, UserCheck, HandHeart, Search, Compass, LifeBuoy, Phone, Link as LinkIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import heroTeens from "@/assets/hero-teens.jpg";
import pod1 from "@/assets/pod-1.jpg";
import pod2 from "@/assets/pod-2.jpg";
import pod3 from "@/assets/pod-3.jpg";
import pod4 from "@/assets/pod-4.jpg";
import pod5 from "@/assets/pod-5.jpg";
import pod6 from "@/assets/pod-6.jpg";
import pod7 from "@/assets/pod-7.jpg";
import pod8 from "@/assets/pod-8.jpg";
import pod9 from "@/assets/pod-9.jpg";
import pod10 from "@/assets/pod-10.jpg";
import pod11 from "@/assets/pod-11.jpg";
import emojiRelieved from "@/assets/emoji/calm.png";
import emojiSteam from "@/assets/emoji/angry.png";
import emojiPleading from "@/assets/emoji/crying.png";
import emojiHearts from "@/assets/emoji/love.png";
import emojiAnxious from "@/assets/emoji/anxious.png";
import emojiNeutral from "@/assets/emoji/numb.png";



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

// Локально: /audio/...  Позже Cloudflare CDN: задать базовый URL здесь.
const AUDIO_BASE = "";

const podcasts = [
  {
    title: "Зачем вообще психолог?",
    description: "Мне ведь не так уж плохо — или всё-таки стоит попробовать?",
    icon: Search,
    image: pod1,
    url: "https://mave.stream/e/Ng8tfd3aZI",
    audio: `${AUDIO_BASE}/audio/episode-1.mp3`,
    tags: ["самооценка", "мотивация", "тревога"],
  },
  {
    title: "Чего я хочу на самом деле?",
    description: "А чего от меня просто ждут — и как это различить",
    icon: Brain,
    image: pod2,
    url: "https://mave.stream/e/F55kiTfaEB",
    audio: `${AUDIO_BASE}/audio/episode-3.mp3`,
    tags: ["мотивация", "самооценка", "прокрастинация"],
  },
  {
    title: "Родители и границы",
    description: "Сепарация без войны — возможно ли это?",
    icon: Home,
    image: pod3,
    url: "https://mave.stream/e/XnMGRhw4tX",
    audio: `${AUDIO_BASE}/audio/episode-5.mp3`,
    tags: ["отношения", "стресс"],
  },
  {
    title: "Свой или чужой?",
    description: "С кем я дружу и почему друзей приходится выбирать",
    icon: Users,
    image: pod11,
    url: "https://mave.stream/e/Gz0IgdwTzc",
    audio: `${AUDIO_BASE}/audio/svoy-ili-chuzhoy.mp3`,
    tags: ["отношения", "одиночество"],
  },
  {
    title: "Первая сессия",
    description: "Что происходит на первой встрече и что значит конфиденциальность",
    icon: Shield,
    image: pod4,
    url: "https://mave.stream/e/Yykg2hB0r1",
    audio: `${AUDIO_BASE}/audio/episode-6.mp3`,
    tags: ["тревога", "самооценка"],
  },
  {
    title: "Что делать, если сильно устал? Часть 1. Про сон",
    description: "Почему недосып — не наша вина, и как бережно вернуть себе силы.",
    icon: Flame,
    image: pod5,
    url: "https://mave.stream/e/q2en9dlbty",
    audio: `${AUDIO_BASE}/audio/episode-4.mp3`,
    tags: ["выгорание", "стресс"],
  },
  {
    title: "Стыд и прокрастинация",
    description: "Перфекционизм, откладывание и что за этим стоит",
    icon: Sparkles,
    image: pod6,
    tags: ["прокрастинация", "самооценка", "стресс"],
  },
  {
    title: "Повторяющиеся отношения",
    description: "Почему я снова и снова выбираю одно и то же",
    icon: Repeat,
    image: pod7,
    tags: ["отношения", "самооценка"],
  },
  {
    title: "Парням тоже можно",
    description: "Просить помощи — это не слабость",
    icon: HandHeart,
    image: pod8,
    tags: ["самооценка", "одиночество", "стресс"],
  },
  {
    title: "Соцсети и сравнение",
    description: "Инстадивы, одиночество и digital well-being",
    icon: Smartphone,
    image: pod9,
    tags: ["одиночество", "самооценка", "тревога"],
  },
  {
    title: "Онлайн-терапия",
    description: "Как она работает и почему раз в неделю лучше, чем каждый день",
    icon: MessageCircle,
    image: pod10,
    tags: ["тревога", "выгорание", "мотивация"],
  },
];

type Tint = "teal" | "coral" | "violet" | "amber";

const tintBg: Record<Tint, string> = {
  teal: "tint-teal",
  coral: "tint-coral",
  violet: "tint-violet",
  amber: "tint-amber",
};
const tintInk: Record<Tint, string> = {
  teal: "tint-teal-ink",
  coral: "tint-coral-ink",
  violet: "tint-violet-ink",
  amber: "tint-amber-ink",
};

const checkups = [
  {
    title: "Давай познакомимся",
    description: "Короткий опросник о самочувствии — 3–5 минут.",
    cta: "Пройти опросник",
    icon: HandHeart,
    action: "kidscreen",
    tint: "teal" as Tint,
  },
  {
    title: "Задумался о выборе профессии",
    description: "Разберись, что тебе ближе и с чего начать поиск.",
    cta: "Пройти тест",
    icon: Compass,
    action: "career-quiz",
    tint: "amber" as Tint,
  },
  {
    title: "К кому обратиться",
    description: "Психолог, психотерапевт, психиатр — кто чем помогает.",
    cta: "Читать статью",
    icon: UserCheck,
    href: "/articles/who-helps",
    tint: "violet" as Tint,
  },
];


const checklists = [
  { title: "Утренняя рутина для энергии", icon: Sparkles },
  { title: "Как справиться с тревогой", icon: Shield },
  { title: "Первые шаги к терапевту", icon: MessageCircle },
];

const INITIAL_VISIBLE = 3;

const heroSlides = [
  {
    key: "listen",
    icon: Headphones,
    title: "Послушать",
    text: "Истории о важном: отношения, тревога, самооценка и многое другое.",
    cta: "К подкастам",
    href: "#podcasts",
  },
  {
    key: "help",
    icon: HandHeart,
    title: "Помощь рядом",
    text: "Проверенные ресурсы и поддержка — бесплатно и конфиденциально.",
    cta: "Смотреть",
    href: "#help-links",
  },
  {
    key: "start",
    icon: Sparkles,
    title: "Разобраться в том, что с тобой происходит",
    text: "Короткий опросник о самочувствии — 3-5 минут.",
    cta: "Начать",
    href: "#",
  },
] as const;

const Index = () => {
  const location = useLocation();
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);
  const [careerQuizOpen, setCareerQuizOpen] = useState(false);
  const [kidscreenOpen, setKidscreenOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
      }
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);



  const filteredLinks = helpLinks;

  const visiblePodcasts = showAllPodcasts ? podcasts : podcasts.slice(0, INITIAL_VISIBLE);

  return (
    <div className="min-h-screen overflow-hidden">
    <Seo title="Как ты? — поддержка для подростков" description="Тут можно почувствовать, что ты не один: подкасты, тесты о самочувствии и проверенные ресурсы помощи." path="/" />
      {/* Top menu */}
      <div className="bg-muted/40 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center">
          <nav className="flex items-center gap-5 text-sm font-medium lowercase">
            <a href="#checkups" className="text-foreground hover:text-primary transition-colors">С чего начать</a>
            <span className="h-4 w-px bg-border" />
            <a href="#podcasts" className="text-foreground hover:text-primary transition-colors">слушать</a>
            <span className="h-4 w-px bg-border" />
            <Link to="/help" className="text-foreground hover:text-primary transition-colors">помощь рядом</Link>
            <span className="h-4 w-px bg-border" />
            <Link to="/articles/who-helps" className="text-foreground hover:text-primary transition-colors">к кому обратиться</Link>
            <span className="h-4 w-px bg-border" />
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">о нас</Link>
          </nav>
        </div>
      </div>


      {/* Hero */}
      <section className="px-4 pt-4 pb-6 md:pt-6 md:pb-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* Left: rotating block */}
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] bg-muted/50 border border-border/50 p-6 md:p-10 min-h-[320px] md:min-h-[520px] flex flex-col justify-between">
            <img src={logo} alt="как ты" className="h-8 md:h-10 w-auto self-start select-none" draggable={false} />

            <div className="relative mt-6 flex-1">
              {heroSlides.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.key}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${
                      i === heroSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                    }`}
                  >
                    <Icon className="text-primary mb-3" size={28} />
                    {i === heroSlide ? (
                      <h1 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">{s.title}</h1>
                    ) : (
                      <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">{s.title}</h2>
                    )}
                    <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-sm">{s.text}</p>
                    <div className="mt-6">
                      {s.key === "start" ? (
                        <button
                          type="button"
                          onClick={() => setKidscreenOpen(true)}
                          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm md:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
                        >
                          {s.cta} <ArrowRight size={18} />
                        </button>
                      ) : (
                        <a
                          href={s.href}
                          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm md:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
                        >
                          {s.cta} <ArrowRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mt-6">
              {heroSlides.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  aria-label={s.title}
                  onClick={() => setHeroSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === heroSlide ? "w-8 bg-primary" : "w-3 bg-border"}`}
                />
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] shadow-xl">
            <img
              src={heroTeens}
              alt="Подростки разговаривают на диване"
              className="w-full h-[260px] md:h-full md:min-h-[520px] object-cover object-center"
              width={1600}
              height={896}
            />
          </div>
        </div>



        {/* Feelings */}
        <div className="mt-8 md:mt-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {selectedMood ? "Спасибо, что поделился" : "Как ты себя чувствуешь прямо сейчас?"}
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {selectedMood
              ? "Хочешь разобраться подробнее? Пройди короткий тест — это займёт меньше минуты."
              : "Выбери то, что больше всего подходит. Неправильного ответа не бывает"}
          </p>
          <div className="mt-6 md:mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-2 max-w-4xl mx-auto">
            {[
              { emoji: emojiRelieved, label: "спокойно", slug: "spokoyno" },
              { emoji: emojiSteam, label: "злюсь,\nкак черт", slug: "zlyus" },
              { emoji: emojiPleading, label: "плачу", slug: "plachu" },
              { emoji: emojiHearts, label: "любовь\nокрыляет", slug: "lyubov" },
              { emoji: emojiAnxious, label: "боюсь", slug: "boyus" },
              { emoji: emojiNeutral, label: "не чувствую\nничего", slug: "nichego" },
            ].map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => {
                  setSelectedMood(f.slug);
                  const url = new URL(window.location.href);
                  url.searchParams.set("utm_source", "kakty");
                  url.searchParams.set("utm_medium", "emoji");
                  url.searchParams.set("utm_campaign", "mood_checkin");
                  url.searchParams.set("utm_content", f.slug);
                  window.history.replaceState({}, "", url.toString());
                  setKidscreenOpen(true);
                }}
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
              "group rounded-2xl border bg-card p-5 pt-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col";
            const cardInner = (
              <>
                <div className="-mx-5 mb-4 aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={(p as any).image}
                    alt={p.title}
                    loading="lazy"
                    width={896}
                    height={512}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
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
          <h2 className="text-center text-lg md:text-2xl font-bold text-foreground mb-6">
            С чего начать
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checkups.map((c, i) => {
            const inner = (
              <>
                <h3 className={`font-bold text-base leading-tight mb-4 ${tintInk[c.tint]}`}>
                  {c.title}
                </h3>
                <div className="w-11 h-11 rounded-2xl bg-card/70 flex items-center justify-center mb-4">
                  <c.icon className={tintInk[c.tint]} size={22} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.description}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:gap-2 transition-all">
                    {c.cta} <ArrowRight size={14} />
                  </span>
                </div>
              </>
            );
            const cardClasses =
              `group flex flex-col h-full rounded-3xl border p-5 ${tintBg[c.tint]} transition-transform hover:-translate-y-1 text-left w-full`;
            return (
              <ScrollReveal key={c.title} delay={i * 100} className="h-full">
                {(c as any).href ? (
                  <Link to={(c as any).href} className={cardClasses}>
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const action = (c as any).action;
                      if (action === "career-quiz") setCareerQuizOpen(true);
                      if (action === "kidscreen") setKidscreenOpen(true);
                    }}
                    className={cardClasses}
                  >
                    {inner}
                  </button>
                )}
              </ScrollReveal>
            );
          })}
        </div>

      </section>

      <div className="max-w-5xl mx-auto px-4">
        <div className="border-t border-border/40" />
      </div>

      <CareerQuiz open={careerQuizOpen} onOpenChange={setCareerQuizOpen} />
      <KidscreenQuiz open={kidscreenOpen} onOpenChange={setKidscreenOpen} />

      {/* Emergency help teaser */}
      <section id="help-links" className="px-4 pt-12 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="rounded-[2rem] border bg-card p-6 md:p-10">
            <div className="flex items-center gap-2 mb-2">
              <LifeBuoy className="text-primary" size={24} />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Помощь рядом</h2>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              Экстренные телефоны, чаты с психологом и что делать, если очень тяжело — себе, другу или ребёнку.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/help"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm md:text-base font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Открыть раздел <ArrowRight size={18} />
              </Link>
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 text-destructive px-6 py-3 text-sm md:text-base font-semibold hover:scale-105 transition-transform"
              >
                <Phone size={18} /> 112 — экстренная помощь
              </a>
            </div>
          </div>
        </ScrollReveal>
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
