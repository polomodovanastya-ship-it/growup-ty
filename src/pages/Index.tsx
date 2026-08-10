import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Headphones, ClipboardCheck, ListChecks, ArrowRight, Brain, Users, Sparkles, Shield, MessageCircle, Flame, ChevronDown, ChevronUp, Home, Repeat, Smartphone, UserCheck, HandHeart, Search, Compass, LifeBuoy, Phone, Link as LinkIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import heroTeensAsset from "@/assets/hero-teens.jpg.asset.json";
const heroTeens = heroTeensAsset.url;
import episode6Audio from "@/assets/episode-6.mp3.asset.json";
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
import emojiRelievedAsset from "@/assets/emoji/calm.png.asset.json";
const emojiRelieved = emojiRelievedAsset.url;
import emojiSteamAsset from "@/assets/emoji/angry.png.asset.json";
const emojiSteam = emojiSteamAsset.url;
import emojiPleadingAsset from "@/assets/emoji/crying.png.asset.json";
const emojiPleading = emojiPleadingAsset.url;
import emojiHeartsAsset from "@/assets/emoji/love.png.asset.json";
const emojiHearts = emojiHeartsAsset.url;
import emojiAnxiousAsset from "@/assets/emoji/anxious.png.asset.json";
const emojiAnxious = emojiAnxiousAsset.url;
import emojiNeutralAsset from "@/assets/emoji/numb.png.asset.json";
const emojiNeutral = emojiNeutralAsset.url;



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
import { supabase } from "@/integrations/supabase/client";

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
    image: pod1,
    url: "https://mave.stream/e/Ng8tfd3aZI",
    audio: "/__l5e/assets-v1/4ab7d186-6228-4a13-a8fd-c12703c433cf/episode-1.mp3",
    tags: ["самооценка", "мотивация", "тревога"],
  },
  {
    title: "Чего я хочу на самом деле?",
    description: "А чего от меня просто ждут — и как это различить",
    icon: Brain,
    image: pod2,
    url: "https://mave.stream/e/F55kiTfaEB",
    audio: "/__l5e/assets-v1/b0558ae6-7a17-4af3-b5e2-838db825f783/episode-3.mp3",
    tags: ["мотивация", "самооценка", "прокрастинация"],
  },
  {
    title: "Родители и границы",
    description: "Сепарация без войны — возможно ли это?",
    icon: Home,
    image: pod3,
    url: "https://mave.stream/e/XnMGRhw4tX",
    audio: "/__l5e/assets-v1/b22d50fa-421c-4ed3-a75f-1854f2cd2eb8/episode-5.mp3",
    tags: ["отношения", "стресс"],
  },
  {
    title: "Первая сессия",
    description: "Что происходит на первой встрече и что значит конфиденциальность",
    icon: Shield,
    image: pod4,
    url: "https://mave.stream/e/Yykg2hB0r1",
    audio: episode6Audio.url,
    tags: ["тревога", "самооценка"],
  },
  {
    title: "Что делать, если сильно устал? Часть 1. Про сон",
    description: "Почему недосып — не наша вина, и как бережно вернуть себе силы.",
    icon: Flame,
    image: pod5,
    url: "https://mave.stream/e/q2en9dlbty",
    audio: "/__l5e/assets-v1/0455247d-b570-47ab-ae1b-669931c91046/episode-4.mp3",
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
  {
    title: "Свой или чужой?",
    description: "С кем я дружу и почему друзей приходится выбирать",
    icon: Users,
    image: pod11,
    tags: ["отношения", "одиночество"],
  },
];

const checkups = [
  {
    title: "Давай познакомимся",
    description: "Короткий опросник о самочувствии — 3–5 минут.",
    cta: "Пройти опросник",
    icon: HandHeart,
    action: "kidscreen",
  },
  {
    title: "Задумался о выборе профессии",
    description: "Разберись, что тебе ближе и с чего начать поиск.",
    cta: "Пройти тест",
    icon: Compass,
    action: "career-quiz",
  },
  {
    title: "К кому обратиться",
    description: "Психолог, психотерапевт, психиатр — кто чем помогает.",
    cta: "Читать статью",
    icon: UserCheck,
    href: "/articles/who-helps",
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
    text: "Подкасты о важном: отношения, тревога, самооценка и многое другое.",
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
      {/* Top menu */}
      <div className="bg-muted/40 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 h-10 flex items-center">
          <nav className="flex items-center gap-5 text-sm font-medium lowercase">
            <a href="#checkups" className="text-foreground hover:text-primary transition-colors">С чего начать</a>
            <span className="h-4 w-px bg-border" />
            <a href="#podcasts" className="text-foreground hover:text-primary transition-colors">слушать</a>
            <span className="h-4 w-px bg-border" />
            <a href="#help-links" className="text-foreground hover:text-primary transition-colors">помощь рядом</a>
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
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight text-foreground">{s.title}</h1>
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
                  supabase.from("mood_clicks").insert({ mood: f.slug }).then(
                    ({ error }) => { if (error) console.error("mood click", error); },
                  );
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
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">С чего начать</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checkups.map((c, i) => {
            const inner = (
              <>
                <div className="-mx-4 mb-3 h-16 overflow-hidden flex items-center justify-center bg-primary/10">
                  <c.icon className="text-primary transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-muted-foreground">{c.description}</p>
                <div className="mt-auto">
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                    {c.cta} <ArrowRight size={12} />
                  </span>
                </div>
              </>
            );
            const cardClasses =
              "group rounded-2xl border bg-card p-4 pt-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col text-left w-full";
            return (
              <ScrollReveal key={c.title} delay={i * 100}>
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

      {/* Useful links & emergency help */}
      <section id="help-links" className="px-4 pt-12 md:pt-16 pb-12 md:pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-2">
            <LifeBuoy className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Помощь рядом</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((l, i) => {
              const favicon = l.url.startsWith("http") ? faviconFor(l.url) : null;
              return (
              <ScrollReveal key={l.title} delay={i < INITIAL_VISIBLE ? i * 100 : 0}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group rounded-2xl border bg-card p-4 pt-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col ${
                    l.emergency ? "border-destructive/40" : ""
                  }`}
                >
                  <div className={`-mx-4 mb-3 h-16 overflow-hidden flex items-center justify-center ${l.emergency ? "bg-destructive/10" : "bg-primary/10"}`}>
                    {l.emergency ? (
                      <Phone className="text-destructive transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    ) : favicon ? (
                      <img src={favicon} alt="" className="w-8 h-8 rounded-lg transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <LinkIcon className="text-primary transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-xs text-muted-foreground">{l.description}</p>
                  <div className="mt-auto">
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                      {l.url.startsWith("http") ? "Открыть сайт" : "Позвонить"} <ArrowRight size={12} />
                    </span>
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
