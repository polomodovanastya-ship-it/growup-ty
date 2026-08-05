import {
  ArrowLeft,
  ArrowDown,
  UserCheck,
  Stethoscope,
  Compass,
  GraduationCap,
  HelpCircle,
  HeartHandshake,
  Briefcase,
  Search,
  ArrowRight,


  CalendarClock,
  AlertTriangle,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

type Specialist = {
  title: string;
  icon: typeof UserCheck;
  tagline: string;
  who: string;
  when: string;
  how: string;
  meds: string;
};

const specialists: Specialist[] = [
  {
    title: "Психолог",
    icon: HeartHandshake,
    tagline: "Разговор про то, что происходит прямо сейчас",
    who: "Специалист с образованием в психологии. Не врач: не ставит диагнозы и не выписывает лекарства.",
    when: "Тревога, ссоры с родителями, самооценка, отношения, одиночество, страх будущего, сложные эмоции.",
    how: "Разговор один на один или онлайн. Вместе разбираете, что происходит, и ищете способы, которые подходят именно тебе.",
    meds: "Без лекарств",
  },
  {
    title: "Психотерапевт",
    icon: UserCheck,
    tagline: "Та же беседа, но курсом и по методике",
    who: "Психолог или врач с дополнительным обучением в конкретном методе (например, КПТ — когнитивно-поведенческая терапия).",
    when: "Когда состояние держится долго: подавленность неделями, панические приступы, навязчивые мысли, последствия тяжёлых событий.",
    how: "Регулярные встречи по определённой методике, часто курсом в несколько месяцев. Между встречами бывают небольшие задания.",
    meds: "Без лекарств (если это не врач-психотерапевт)",
  },
  {
    title: "Психиатр",
    icon: Stethoscope,
    tagline: "Врач, если тело и психика уже не справляются",
    who: "Врач. Единственный, кто может поставить диагноз и назначить лекарства.",
    when: "Долгая бессонница, сильная апатия, резкие перепады состояния, мысли о причинении себе вреда, паника, которая мешает жить.",
    how: "Приём как у любого врача: расспрашивает, оценивает состояние, при необходимости назначает лечение. Обращение к психиатру — это не «клеймо», а обычная медицинская помощь.",
    meds: "Может назначать лекарства",
  },
  {
    title: "Коуч",
    icon: Compass,
    tagline: "Когда силы есть, а плана нет",
    who: "Специалист по целям и действиям. Не работает с психическим состоянием и травмами.",
    when: "Есть силы и понятная задача: разобраться с планами, привычками, организацией времени.",
    how: "Ставите цель, разбиваете её на шаги, отслеживаете прогресс.",
    meds: "Не медицинская помощь",
  },
  {
    title: "Тьютор",
    icon: GraduationCap,
    tagline: "Про учёбу и образовательный маршрут",
    who: "Наставник в учёбе и образовательном маршруте.",
    when: "Не понятно, куда поступать, как выстроить подготовку, что выбрать из предметов и курсов.",
    how: "Помогает собрать образовательный план и найти ресурсы под твои интересы.",
    meds: "Не медицинская помощь",
  },
];

type Branch = {
  icon: typeof UserCheck;
  area: string;
  answer: string;
};

type FlowStep = {
  icon: typeof UserCheck;
  condition: string;
  detail: string;
  answer?: string;
  branches?: Branch[];
  tone: "soft" | "mid" | "alert";
};

const flow: FlowStep[] = [
  {
    icon: Target,
    condition: "Тяжело время от времени",
    detail:
      "Накрыло после ссоры, контрольной, расставания. Смотри, в какой сфере сложнее всего:",
    branches: [
      {
        icon: HeartHandshake,
        area: "Эмоции и отношения",
        answer: "Психолог — 1–5 встреч, чтобы разложить ситуацию по полочкам",
      },
      {
        icon: Compass,
        area: "Цели, привычки, организация времени",
        answer: "Коуч — помогает превратить «надо бы» в конкретные шаги",
      },
      {
        icon: Briefcase,
        area: "Профессия, поступление, что дальше",
        answer: "Карьерный консультант — разбирает интересы, профессии и маршрут",
      },
    ],
    tone: "soft",
  },
  {
    icon: CalendarClock,
    condition: "Тяжело систематически — дольше 2–4 недель",
    detail:
      "Хочешь разобраться, почему это происходит, и измениться внутренне: как ты относишься к себе, к другим и к сложным ситуациям.",
    answer: "Психотерапевт — работа курсом по методике, разбирает причины и помогает изменить привычные реакции",
    tone: "mid",
  },
  {
    icon: AlertTriangle,
    condition: "Сон, аппетит или перепады настроения мешают жить",
    detail:
      "Нарушения сна или аппетита, сильная тревога, паника или мысли навредить себе мешают учёбе, общению и привычным делам.",
    answer: "Психиатр — сначала врач, чтобы оценить состояние и помочь стабилизироваться",
    tone: "alert",
  },
];


const toneClass: Record<FlowStep["tone"], string> = {
  soft: "border-secondary/40 bg-secondary/5",
  mid: "border-primary/40 bg-primary/5",
  alert: "border-destructive/40 bg-destructive/5",
};

const toneIcon: Record<FlowStep["tone"], string> = {
  soft: "bg-secondary/15 text-secondary",
  mid: "bg-primary/15 text-primary",
  alert: "bg-destructive/15 text-destructive",
};

const compare = [
  {
    label: "Кто ведёт",
    psy: "Психолог без медицинского образования",
    therapy: "Психолог или врач с обучением в методе",
    psychiatry: "Врач",
  },
  {
    label: "Сколько длится",
    psy: "От одной встречи до нескольких",
    therapy: "Курс: обычно от 8–10 встреч",
    psychiatry: "Приёмы + наблюдение",
  },
  {
    label: "Что делает",
    psy: "Помогает понять и назвать происходящее",
    therapy: "Меняет устойчивые реакции и мысли по методике",
    psychiatry: "Оценивает состояние, лечит",
  },
  {
    label: "Лекарства",
    psy: "Нет",
    therapy: "Нет (кроме врача-психотерапевта)",
    psychiatry: "Да",
  },
];

const faq = [
  {
    q: "С чего начать, если непонятно, к кому идти?",
    a: "Начни с психолога. Если он увидит, что нужна медицинская помощь, он подскажет и направит к психиатру.",
  },
  {
    q: "Это дорого?",
    a: "Есть бесплатные варианты: школьный психолог, психолог в поликлинике, бесплатные чаты и телефоны доверия — они собраны в блоке «Помощь рядом».",
  },
  {
    q: "Расскажут ли родителям?",
    a: "Специалист обязан соблюдать конфиденциальность. Исключение — угроза жизни и здоровью. Об этом можно спросить прямо на первой встрече.",
  },
  {
    q: "А если не подошёл специалист?",
    a: "Это нормально. Можно сменить его без объяснений. Подходящий контакт — часть работы, а не твоя вина.",
  },
  {
    q: "Меня поставят «на учёт», если пойти к психиатру?",
    a: "Обращение к психиатру само по себе не ограничивает жизнь. Учитывается только тяжёлое состояние, требующее постоянного наблюдения, — это редкие случаи.",
  },
];

const WhoHelps = () => (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-3xl mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={16} />
        На главную
      </Link>
      <img src={logo} alt="Как ты" className="h-8 w-auto" />
    </header>

    <section className="px-4 pt-4 pb-12 max-w-3xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Кто чем помогает?</h1>
        <p className="text-muted-foreground mb-8">
          Психолог, психотерапевт, психиатр, коуч, тьютор — в чём разница и к кому идти.
          Ниже — простая схема: сначала смотрим, как часто и как долго тебе тяжело.
        </p>
      </ScrollReveal>

      {/* Decision flow */}
      <ScrollReveal>
        <div className="rounded-2xl border bg-card p-4 md:p-6">
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Схема выбора</p>
          <h2 className="font-semibold text-lg text-foreground mb-5">Как часто тебе тяжело?</h2>

          <div className="space-y-3">
            {flow.map((step, i) => (
              <div key={step.condition}>
                <div className={`rounded-xl border p-4 ${toneClass[step.tone]}`}>
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg w-9 h-9 shrink-0 flex items-center justify-center ${toneIcon[step.tone]}`}>
                      <step.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{step.condition}</p>
                      <p className="text-sm text-muted-foreground mt-1">{step.detail}</p>
                      {step.answer && (
                        <p className="text-sm font-medium text-foreground mt-3 flex items-start gap-2">
                          <span className="text-muted-foreground">→</span>
                          <span>{step.answer}</span>
                        </p>
                      )}
                      {step.branches && (
                        <ul className="mt-3 space-y-2">
                          {step.branches.map((b) => (
                            <li key={b.area} className="flex items-start gap-2 text-sm text-foreground">
                              <b.icon className="text-primary shrink-0 mt-0.5" size={16} />
                              <span>
                                <span className="font-medium">{b.area}</span>{" — "}{b.answer}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </div>
                </div>
                {i < flow.length - 1 && (
                  <div className="flex justify-center py-1.5 text-muted-foreground/50">
                    <ArrowDown size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-5">
            Если сомневаешься между психологом и психотерапевтом — иди к психологу.
            Он сам скажет, если нужен другой формат. Ошибиться на первом шаге невозможно.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Психотерапевт и психиатр не отменяют друг друга: часто они работают в паре.
            Один помогает разобраться в причинах, другой — стабилизировать состояние.
          </p>
          <Link
            to="/articles/how-to-choose"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border bg-muted/40 px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 transition-colors"
          >
            <Search className="text-primary" size={16} />
            Как выбрать специалиста и не ошибиться
            <ArrowRight size={15} className="text-muted-foreground" />
          </Link>
        </div>
      </ScrollReveal>


      {/* Comparison */}
      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-1">
          Психолог, психотерапевт, психиатр — в чём разница
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Разница не в том, «насколько всё плохо», а в задаче и инструментах.
        </p>
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="bg-muted/60">
                  <th className="text-left font-medium text-muted-foreground p-3 w-32">&nbsp;</th>
                  <th className="text-left font-semibold text-foreground p-3">Психолог</th>
                  <th className="text-left font-semibold text-foreground p-3">Психотерапевт</th>
                  <th className="text-left font-semibold text-foreground p-3">Психиатр</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.label} className="border-t align-top">
                    <td className="p-3 font-medium text-foreground">{row.label}</td>
                    <td className="p-3 text-muted-foreground">{row.psy}</td>
                    <td className="p-3 text-muted-foreground">{row.therapy}</td>
                    <td className="p-3 text-muted-foreground">{row.psychiatry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      {/* Cards */}
      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-4">Подробно про каждого</h2>
      </ScrollReveal>
      <div className="space-y-3">
        {specialists.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 60}>
            <article className="rounded-2xl border bg-card p-4 md:p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="rounded-lg bg-primary/10 flex items-center justify-center w-10 h-10 shrink-0">
                  <s.icon className="text-primary" size={19} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-foreground leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.tagline}</p>
                </div>
              </div>
              <dl className="space-y-1.5 text-sm">
                <div>
                  <dt className="inline font-medium text-foreground">Кто это. </dt>
                  <dd className="inline text-muted-foreground">{s.who}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">Когда идти. </dt>
                  <dd className="inline text-muted-foreground">{s.when}</dd>
                </div>
                <div>
                  <dt className="inline font-medium text-foreground">Как проходит. </dt>
                  <dd className="inline text-muted-foreground">{s.how}</dd>
                </div>
              </dl>
              <span className="inline-block mt-3 text-xs rounded-full border bg-muted/60 text-muted-foreground px-2.5 py-1">
                {s.meds}
              </span>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-3 flex items-center gap-2">
          <HelpCircle className="text-primary" size={22} />
          Частые вопросы
        </h2>
      </ScrollReveal>
      <div className="space-y-3">
        {faq.map((f, i) => (
          <ScrollReveal key={f.q} delay={i * 60}>
            <div className="rounded-xl border bg-card p-4">
              <p className="font-medium text-foreground text-sm mb-1">{f.q}</p>
              <p className="text-sm text-muted-foreground">{f.a}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p className="mt-8 text-sm text-muted-foreground">
          Если сейчас очень тяжело — загляни в блок{" "}
          <Link to="/#help-links" className="text-primary underline underline-offset-4">
            «Помощь рядом»
          </Link>
          : там телефоны доверия и бесплатные чаты поддержки.
        </p>
      </ScrollReveal>
    </section>
  </main>
);

export default WhoHelps;
