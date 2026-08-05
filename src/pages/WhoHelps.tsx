import { ArrowLeft, UserCheck, Stethoscope, Compass, GraduationCap, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

type Specialist = {
  title: string;
  icon: typeof UserCheck;
  who: string;
  when: string;
  how: string;
};

const specialists: Specialist[] = [
  {
    title: "Психолог",
    icon: UserCheck,
    who: "Специалист с образованием в психологии. Не врач, не выписывает лекарства.",
    when: "Тревога, ссоры с родителями, самооценка, отношения, одиночество, страх будущего, сложные эмоции.",
    how: "Разговор один на один (или онлайн). Вместе разбираете, что происходит, и ищете способы, которые подходят именно тебе.",
  },
  {
    title: "Психотерапевт",
    icon: UserCheck,
    who: "Психолог или врач с дополнительным обучением в конкретном методе (например, КПТ).",
    when: "Когда состояние держится долго: подавленность неделями, панические приступы, навязчивые мысли, последствия тяжёлых событий.",
    how: "Регулярные встречи по определённой методике, часто курсом в несколько месяцев.",
  },
  {
    title: "Психиатр",
    icon: Stethoscope,
    who: "Врач. Единственный, кто может поставить диагноз и назначить лекарства.",
    when: "Долгая бессонница, сильная апатия, резкие перепады состояния, мысли о причинении себе вреда, паника, которая мешает жить.",
    how: "Приём как у любого врача: расспрашивает, оценивает состояние, при необходимости назначает лечение. Обращение к психиатру — это не «клеймо», а обычная медицинская помощь.",
  },
  {
    title: "Коуч",
    icon: Compass,
    who: "Специалист по целям и действиям. Не работает с психическим состоянием и травмами.",
    when: "Есть силы и понятная задача: разобраться с планами, привычками, организацией времени.",
    how: "Ставите цель, разбиваете её на шаги, отслеживаете прогресс.",
  },
  {
    title: "Тьютор",
    icon: GraduationCap,
    who: "Наставник в учёбе и образовательном маршруте.",
    when: "Не понятно, куда поступать, как выстроить подготовку, что выбрать из предметов и курсов.",
    how: "Помогает собрать образовательный план и найти ресурсы под твои интересы.",
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

    <section className="px-4 pt-4 pb-10 max-w-3xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Кто чем помогает?</h1>
        <p className="text-muted-foreground mb-6">
          Психолог, психотерапевт, психиатр, коуч, тьютор — в чём разница и к кому идти.
        </p>
      </ScrollReveal>

      <div className="space-y-3">
        {specialists.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 60}>
            <article className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-lg bg-primary/10 p-1.5 flex items-center justify-center w-9 h-9 shrink-0">
                  <s.icon className="text-primary" size={18} />
                </div>
                <h2 className="font-semibold text-lg text-foreground">{s.title}</h2>
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
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-3 flex items-center gap-2">
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
