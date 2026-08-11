import { ArrowLeft, ArrowRight, Compass, Target, Puzzle, Sparkles, Search, Phone, MessageCircle, Star, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/three-stages-hero.jpg";

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

const identitySteps = [
  {
    title: "Я — это не ярлык",
    icon: Sparkles,
    tint: "teal" as Tint,
    text: "Идентичность — это не профессия и не диагноз. Это ответ на вопрос «какой я и чего мне хочется», который ты формулируешь сам. Никто не выдаёт этот ответ заранее.",
  },
  {
    title: "Она собирается из опыта",
    icon: Puzzle,
    tint: "coral" as Tint,
    text: "Каждый раз, когда ты что-то пробуешь и замечаешь свою реакцию — «тут мне интересно», «а тут скучно», «это моё, а это нет» — ты добавляешь кусочек в картину себя.",
  },
  {
    title: "Она живая",
    icon: Compass,
    tint: "violet" as Tint,
    text: "Идентичность меняется. То, что казалось «мною» в 14, к 18 может отвалиться — и это не потеря, а уточнение. Идти к себе — это процесс, а не финальная точка.",
  },
];

const stages = [
  {
    icon: Compass,
    tint: "teal" as Tint,
    tag: "FIND",
    title: "Ищи — собирай варианты",
    text: "Ты пока не выбираешь навсегда. Ты сужаешь поле: смотришь, читаешь, спрашиваешь живых людей, как выглядит дело изнутри. Цель стадии — не найти «то самое», а понять, за что вообще хочется зацепиться.",
    points: [
      "Много смотришь и сравниваешь себя с другими — это нормально",
      "Кажется, что все уже разобрались, кроме тебя — иллюзия",
      "Достаточно выбрать 2 направления, которые прямо сейчас интересны",
    ],
    motto: "Не выбираю навсегда. Просто проверяю.",
  },
  {
    icon: Target,
    tint: "coral" as Tint,
    tag: "TAKE",
    title: "Пробуй — примеряй роль",
    text: "Ты берёшь маленькую задачу и делаешь. Неловкость, ошибки и ощущение «я какой-то не такой» здесь нормальны. Ты не доказываешь, что ты профи, — ты копишь живой опыт и узнаёшь, как дело ощущается в руках.",
    points: [
      "Возьми 1 маленькую задачу или мини-проект",
      "Попроси понятный фидбек: что получилось, что улучшить",
      "После пробы ответь: что было интересно / что трудно / что повторить",
    ],
    motto: "Я не обязан быть идеальным. Я собираю опыт.",
  },
  {
    icon: Puzzle,
    tint: "violet" as Tint,
    tag: "MAKE",
    title: "Собирай — делай по-своему",
    text: "У тебя уже не ноль. Ты понимаешь, что получается, и начинаешь делать это по-своему. Задача — не подгонять себя под чужой шаблон, а собрать свой стиль и выйти в реальный опыт: отклик, стажировку, подработку, проект.",
    points: [
      "Сформулируй в одну строку: «я пробую себя в…»",
      "Собери 3 доказательства, что ты уже не с нуля",
      "Сделай 1 реальный выход наружу",
    ],
    motto: "Я не копирую чужой путь. Я собираю свой.",
  },
];

const faq = [
  {
    q: "А если мне вообще ничего не интересно?",
    a: "Чаще всего это не «нет интересов», а усталость или тревога. Начни с малого шага и посмотри, что откликается хотя бы чуть-чуть.",
    tint: "teal" as Tint,
  },
  {
    q: "Можно ли перескакивать стадии?",
    a: "Да. Стадии — не лестница. Можно возвращаться назад, идти по кругу или быть на разных стадиях в разных темах.",
    tint: "coral" as Tint,
  },
  {
    q: "А если я ошибусь с выбором?",
    a: "Ошибка — это тоже данные. Ты узнаёшь, что тебе не подходит, и картина себя становится точнее.",
    tint: "violet" as Tint,
  },
];

const ThreeStages = () => (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-6xl mx-auto flex items-center justify-between">
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
              Откуда<br />берётся «хочу»
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md">
              Любопытство и интерес не появляются из воздуха. Они вырастают из того,
              как ты узнаёшь себя — и у этого процесса есть свои стадии.
            </p>
          </div>
          <div className="rounded-[2rem] overflow-hidden border bg-card shadow-sm">
            <img
              src={heroImg}
              alt="Подросток пробует новое дело за рабочим столом"
              width={1280}
              height={864}
              className="w-full h-56 md:h-80 object-cover"
            />
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Идентичность */}
    <section className="px-4 pb-4 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-lg md:text-2xl font-bold text-foreground mb-2">
          Сначала — что такое идентичность
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
          Это твоя картина себя: какой ты, что тебе важно, чего ты хочешь и чего точно не хочешь.
          Она не выдаётся в один день и не берётся из теста — она собирается постепенно.
        </p>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {identitySteps.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 50}>
            <article className={`h-full rounded-3xl border p-5 ${tintBg[s.tint]} transition-transform hover:-translate-y-1`}>
              <div className="w-11 h-11 rounded-2xl bg-card/70 flex items-center justify-center mb-4">
                <s.icon className={tintInk[s.tint]} size={22} />
              </div>
              <h3 className={`font-bold text-base leading-tight mb-3 ${tintInk[s.tint]}`}>{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* Три стадии */}
    <section className="px-4 pt-10 pb-4 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-lg md:text-2xl font-bold text-foreground mb-2">
          Как появляется интерес: три стадии
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
          Их можно проходить не по порядку, возвращаться назад и перескакивать — но обычно
          путь выглядит так.
        </p>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((s, i) => (
          <ScrollReveal key={s.tag} delay={i * 50}>
            <article className={`h-full rounded-3xl border p-5 ${tintBg[s.tint]} transition-transform hover:-translate-y-1`}>
              <div className="w-11 h-11 rounded-2xl bg-card/70 flex items-center justify-center mb-4">
                <s.icon className={tintInk[s.tint]} size={22} />
              </div>
              <span className={`text-xs font-bold tracking-wider uppercase ${tintInk[s.tint]}`}>{s.tag}</span>
              <h3 className={`font-bold text-base leading-tight mb-3 ${tintInk[s.tint]}`}>{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.text}</p>
              <ul className="space-y-2 mb-4">
                {s.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground/30 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl bg-card/70 px-4 py-3">
                <p className="text-sm font-medium text-foreground italic">«{s.motto}»</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>

    {/* CTA banners */}
    <section className="px-4 pt-8 pb-10 max-w-6xl mx-auto grid gap-4 md:grid-cols-2">
      <ScrollReveal>
        <div className="h-full rounded-3xl bg-primary text-primary-foreground p-6">
          <h3 className="text-xl md:text-2xl font-bold mb-1">Хочешь узнать свою стадию?</h3>
          <p className="text-sm opacity-90 mb-5">Короткий тест за 2 минуты — и план из трёх шагов.</p>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-card text-foreground px-5 py-2.5 text-sm font-medium">
            <Star size={15} className="text-primary" /> Пройти тест <ArrowRight size={15} />
          </Link>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <div className="h-full rounded-3xl tint-coral border p-6">
          <h3 className="text-xl md:text-2xl font-bold mb-1 tint-coral-ink">Как выбрать специалиста</h3>
          <p className="text-sm text-muted-foreground mb-5">Если хочется поддержки со стороны — на что смотреть и о чём спросить.</p>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/articles/how-to-choose"
              className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Search size={15} /> Посмотреть варианты
            </Link>
            <Link to="/help" className="inline-flex items-center gap-2 rounded-full bg-card text-foreground px-4 py-2 text-sm font-medium border">
              <MessageCircle size={15} className="text-primary" /> Помощь рядом
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* FAQ */}
    <section className="px-4 pb-16 max-w-6xl mx-auto">
      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <HelpCircle className="text-primary" size={22} />
          Частые вопросы
        </h2>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faq.map((f, i) => (
          <ScrollReveal key={f.q} delay={i * 50}>
            <article className={`h-full rounded-3xl border p-5 ${tintBg[f.tint]}`}>
              <div className="w-11 h-11 rounded-2xl bg-card/70 flex items-center justify-center mb-4">
                <HelpCircle className={tintInk[f.tint]} size={22} />
              </div>
              <p className={`font-bold text-base leading-tight mb-3 ${tintInk[f.tint]}`}>{f.q}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <p className="mt-10 text-center text-base text-muted-foreground">Идти к себе — это процесс, а не финальная точка.</p>
      </ScrollReveal>
    </section>
  </main>
);

export default ThreeStages;
