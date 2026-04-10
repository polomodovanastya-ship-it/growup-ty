import { useState } from "react";
import { Headphones, ClipboardCheck, ListChecks, Heart, ArrowRight, Brain, Users, Sparkles, Shield, MessageCircle, Flame, ChevronDown, ChevronUp, Home, Repeat, Smartphone, UserCheck, HandHeart, Search, Compass, Moon, Frown, MessageSquareOff, Angry } from "lucide-react";
import CareerQuiz from "@/components/CareerQuiz";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const topics = [
  "тревога", "прокрастинация", "отношения", "самооценка",
  "стресс", "мотивация", "одиночество", "выгорание",
];

const podcasts = [
  {
    title: "Зачем вообще психолог?",
    description: "Мне ведь не так уж плохо — или всё-таки стоит попробовать?",
    icon: Search,
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
    title: "Почему я ничего не хочу",
    description: "Лень, выгорание или потеря контакта с собой?",
    icon: Flame,
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
  { title: "Уровень стресса", icon: Shield },
  { title: "Эмоциональное состояние", icon: Heart },
  { title: "Качество сна", icon: Sparkles },
  { title: "Выбор профессии", icon: Compass, action: "career-quiz" },
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
  const visiblePodcasts = showAllPodcasts ? podcasts : podcasts.slice(0, INITIAL_VISIBLE);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 py-16 md:py-24 flex flex-col items-center text-center">
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
            {topics.map((t, i) => (
              <ScrollReveal key={t} delay={300 + i * 80}>
                <span
                  className="inline-block rounded-full bg-muted px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary cursor-default"
                >
                  {t}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <Button size="lg" className="relative mt-8 rounded-full px-8 text-base gap-2">
            Начать <ArrowRight size={18} />
          </Button>
        </ScrollReveal>
      </section>

      {/* Podcasts */}
      <section className="px-4 py-12 md:py-16 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <Headphones className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Послушай</h2>
            <span className="ml-1 text-sm text-muted-foreground">· {podcasts.length} выпусков</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePodcasts.map((p, i) => (
            <ScrollReveal key={p.title} delay={i < INITIAL_VISIBLE ? i * 100 : 0}>
              <div className="group rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="rounded-xl bg-primary/10 p-2.5">
                    <p.icon className="text-primary" size={20} />
                  </div>
                  <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs font-medium">
                    {i + 1}/{podcasts.length}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
            </ScrollReveal>
          ))}
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
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Разберись</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Короткие чекапы — чтобы лучше понять, что с тобой происходит.
              </p>
              <ul className="space-y-2">
                {checkups.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted cursor-pointer group"
                    onClick={() => {
                      if ((c as any).action === "career-quiz") setCareerQuizOpen(true);
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

      {/* Footer */}
      <footer className="px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Ты не один(а). <span className="text-primary font-medium">Как ты</span> — проект о ментальном здоровье 💜
        </p>
      </footer>
    </div>
  );
};

export default Index;
