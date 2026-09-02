import {
  ArrowLeft,
  
  ArrowRight,
  UserCheck,
  Stethoscope,
  Compass,
  GraduationCap,
  HelpCircle,
  HeartHandshake,
  Signpost,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/who-helps-hero.jpg";

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

type Specialist = {
  title: string;
  icon: typeof UserCheck;
  tint: Tint;
  short: string;
  tagline: string;
  who: string;
  when: string;
  how: string;
  meds: string;
  duration: string;
  tags: string[];
};

const specialists: Specialist[] = [
  {
    title: "Психолог",
    icon: HeartHandshake,
    tint: "teal",
    short: "Если тебе тревожно, сложно справляться с эмоциями, не ладятся отношения или не хватает поддержки.",
    tagline: "Разговор про то, что происходит прямо сейчас",
    who: "Специалист с образованием в психологии. Не врач: не ставит диагнозы и не выписывает лекарства.",
    when: "Тревога, ссоры с родителями, самооценка, отношения, одиночество, страх будущего, сложные эмоции.",
    how: "Разговор один на один или онлайн. Вместе разбираете, что происходит, и ищете способы, которые подходят именно тебе.",
    meds: "Без лекарств",
    duration: "От одной встречи до нескольких",
    tags: ["тревога", "отношения", "самооценка"],
  },
  {
    title: "Психотерапевт",
    icon: UserCheck,
    tint: "coral",
    short: "Если трудности продолжаются долго и мешают жить, важно разобраться глубже и найти решения.",
    tagline: "Та же беседа, но курсом и по методике",
    who: "Психолог или врач с дополнительным обучением в конкретном методе (например, КПТ — когнитивно-поведенческая терапия).",
    when: "Когда состояние держится долго: подавленность неделями, панические приступы, навязчивые мысли, последствия тяжёлых событий.",
    how: "Регулярные встречи по определённой методике, часто курсом в несколько месяцев. Между встречами бывают небольшие задания.",
    meds: "Без лекарств (если это не врач-психотерапевт)",
    duration: "Курс: обычно от 8–10 встреч",
    tags: ["тревога", "отношения", "самооценка"],
  },
  {
    title: "Психиатр",
    icon: Stethoscope,
    tint: "violet",
    short: "Если сильная тревога, апатия, проблемы со сном или настроением.",
    tagline: "Врач, который помогает стабилизировать состояние",
    who: "Врач. Единственный, кто может поставить диагноз и назначить лекарства.",
    when: "Долгая бессонница, сильная апатия, резкие перепады состояния, мысли о причинении себе вреда, паника, которая мешает жить.",
    how: "Приём как у любого врача: расспрашивает, оценивает состояние, при необходимости назначает лечение. Обращение к психиатру — это не «клеймо», а обычная медицинская помощь.",
    meds: "Может назначать лекарства",
    duration: "Приёмы + наблюдение",
    tags: ["тревога", "самооценка"],
  },
  {
    title: "Коуч",
    icon: Compass,
    tint: "amber",
    short: "Если хочешь лучше понять себя, поставить цели и найти мотивацию двигаться к ним.",
    tagline: "Когда силы есть, а плана нет",
    who: "Специалист по целям и действиям. Не работает с психическим состоянием и травмами.",
    when: "Есть силы и понятная задача: разобраться с планами, привычками, организацией времени.",
    how: "Ставите цель, разбиваете её на шаги, отслеживаете прогресс.",
    meds: "Не медицинская помощь",
    duration: "От нескольких встреч",
    tags: ["самооценка"],
  },
  {
    title: "Тьютор",
    icon: GraduationCap,
    tint: "teal",
    short: "Если нужны поддержка в учёбе, организация времени и развитие навыков обучения.",
    tagline: "Про учёбу и образовательный маршрут",
    who: "Наставник в учёбе и образовательном маршруте.",
    when: "Не понятно, куда поступать, как выстроить подготовку, что выбрать из предметов и курсов.",
    how: "Помогает собрать образовательный план и найти ресурсы под твои интересы.",
    meds: "Не медицинская помощь",
    duration: "По необходимости",
    tags: ["учёба"],
  },
  {
    title: "Карьерный консультант",
    icon: Signpost,
    tint: "violet",
    short: "Если не знаешь, чем хочешь заниматься и как выбрать свой путь в будущем.",
    tagline: "Карьерный консультант — про интересы и маршрут",
    who: "Специалист, который помогает разобраться в интересах, сильных сторонах и вариантах профессий.",
    when: "Не понятно, куда поступать и что делать после школы, всё кажется одинаково непонятным.",
    how: "Разбираете интересы и ценности, смотрите на реальные профессии и строите план шагов.",
    meds: "Не медицинская помощь",
    duration: "От 1–3 встреч",
    tags: ["мотивация", "учёба"],
  },
];

const tags = [
  { label: "тревога", icon: HeartHandshake, tint: "teal" as Tint },
  { label: "отношения", icon: HeartHandshake, tint: "coral" as Tint },
  { label: "учёба", icon: GraduationCap, tint: "amber" as Tint },
  { label: "мотивация", icon: Signpost, tint: "violet" as Tint },
  { label: "самооценка", icon: Star, tint: "teal" as Tint },
];





const faq = [
  {
    q: "С чего начать, если непонятно, к кому идти?",
    a: "Начни с психолога. Если он увидит, что нужна медицинская помощь, он подскажет и направит к психиатру.",
    tint: "teal" as Tint,
  },
  {
    q: "Это дорого?",
    a: "Есть бесплатные варианты: школьный психолог, психолог в поликлинике, бесплатные чаты и телефоны доверия — они собраны в блоке «Помощь рядом».",
    tint: "coral" as Tint,
  },
  {
    q: "Расскажут ли родителям?",
    a: "Специалист обязан соблюдать конфиденциальность. Исключение — угроза жизни и здоровью. Об этом можно спросить прямо на первой встрече.",
    tint: "violet" as Tint,
  },
  {
    q: "А если не подошёл специалист?",
    a: "Это нормально. Можно сменить его без объяснений. Подходящий контакт — часть работы, а не твоя вина.",
    tint: "amber" as Tint,
  },
  {
    q: "Меня поставят «на учёт», если пойти к психиатру?",
    a: "Обращение к психиатру само по себе не ограничивает жизнь. Учитывается только тяжёлое состояние, требующее постоянного наблюдения, — это редкие случаи.",
    tint: "teal" as Tint,
  },
];

const WhoHelps = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const filtered = activeTag ? specialists.filter((s) => s.tags.includes(activeTag)) : specialists;

  return (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-6xl mx-auto flex items-center justify-between">
    <Seo title="К кому обратиться: психолог, психотерапевт, психиатр — Как ты?" description="Чем отличаются психолог, психотерапевт и психиатр, кто чем помогает и к кому идти с твоим запросом." path="/articles/who-helps" type="article" />
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={16} />
        На главную
      </Link>
      <img src={logo} alt="как ты" className="h-8 w-auto select-none" draggable={false} />
    </header>

    {/* Hero */}
    <section className="px-4 pt-4 pb-10 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-[1.05] mb-4">
              К кому<br />обратиться
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md">
              Каждый специалист помогает по-своему. Выбери, что подходит именно тебе,
              и чувствуй себя увереннее на пути к помощи.
            </p>
          </div>
          <div className="rounded-[2rem] overflow-hidden border bg-card shadow-sm">
            <img
              src={heroImg}
              alt="Подросток разговаривает со специалистом"
              width={1280}
              height={864}
              className="w-full h-56 md:h-80 object-cover"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Tags — filter specialists */}
    <section className="px-4 pt-2 pb-6 max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="rounded-3xl border bg-card p-4 md:px-5 md:py-4 flex flex-col gap-3">
          <p className="font-semibold text-foreground text-sm md:text-base leading-snug">
            Если тебе трудно понять, с чего начать…
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveTag(activeTag === t.label ? null : t.label)}
                className={`inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm whitespace-nowrap text-foreground hover:border-primary/50 transition-colors ${activeTag === t.label ? "border-primary" : ""}`}
              >
                <t.icon className={tintInk[t.tint]} size={16} />
                {t.label}
              </button>
            ))}
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm whitespace-nowrap text-muted-foreground hover:text-primary transition-colors"
              >
                сбросить
              </button>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Specialist cards */}
    <section id="details" className="px-4 pb-4 max-w-6xl mx-auto scroll-mt-20">
      <ScrollReveal>
        <h2 className="text-center text-lg md:text-2xl font-bold text-foreground mb-6">
          Виды помощи и кому они могут подойти
        </h2>
      </ScrollReveal>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))]">
        {filtered.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 50} className="h-full">
            <article className={`h-full rounded-3xl border p-5 ${tintBg[s.tint]}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-card/70 flex items-center justify-center">
                  <s.icon className={tintInk[s.tint]} size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className={`font-bold text-base leading-tight ${tintInk[s.tint]}`}>{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.tagline}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.short}</p>

              <Accordion type="single" collapsible className="mt-3">
                <AccordionItem value="details" className="border-none">
                  <AccordionTrigger
                    className={`py-2 text-sm font-medium hover:no-underline ${tintInk[s.tint]}`}
                  >
                    Подробнее
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <dl className="space-y-2.5 text-sm">
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Кто ведёт</dt>
                        <dd className="text-foreground leading-relaxed">{s.who}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Когда подходит</dt>
                        <dd className="text-foreground leading-relaxed">{s.when}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Как проходит</dt>
                        <dd className="text-foreground leading-relaxed">{s.how}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Сколько длится</dt>
                        <dd className="text-foreground leading-relaxed">{s.duration}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-medium text-muted-foreground">Лекарства</dt>
                        <dd className="text-foreground leading-relaxed">{s.meds}</dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* CTA banners */}
    <section className="px-4 pb-10 max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
      <ScrollReveal className="h-full">
        <div className="h-full rounded-3xl bg-primary text-primary-foreground p-6 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold mb-1">Помощь рядом</h3>
          <p className="text-sm opacity-90 mb-5">Бесплатные проверенные ресурсы и поддержка, когда это нужно.</p>
          <Link
            to="/help"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-card text-foreground px-5 py-2.5 text-sm font-medium"
          >
            Открыть раздел <ArrowRight size={15} />
          </Link>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={80} className="h-full">
        <div className="h-full rounded-3xl tint-coral border p-6 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold mb-1 tint-coral-ink">Как выбрать специалиста</h3>
          <p className="text-sm text-muted-foreground mb-5">На что смотреть, о чём спросить и как понять, что вам подходит.</p>
          <Link
            to="/articles/how-to-choose"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Открыть раздел <ArrowRight size={15} />
          </Link>
        </div>
      </ScrollReveal>
    </section>

    <section className="px-4 pb-16 max-w-6xl mx-auto">


      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-2">
          <HelpCircle className="text-primary" size={22} />
          Частые вопросы
        </h2>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faq.map((f, i) => (
          <ScrollReveal key={f.q} delay={i * 50}>
            <article className={`h-full rounded-3xl border p-5 ${tintBg[f.tint]}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 shrink-0 rounded-2xl bg-card/70 flex items-center justify-center">
                  <HelpCircle className={tintInk[f.tint]} size={22} />
                </div>
                <p className={`font-bold text-base leading-tight pt-2 ${tintInk[f.tint]}`}>{f.q}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p className="mt-10 text-center text-base text-muted-foreground">Мы рядом, когда тебе нужно.</p>
      </ScrollReveal>
    </section>
  </main>
  );
};

export default WhoHelps;
