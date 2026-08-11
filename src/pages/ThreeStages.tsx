import { ArrowLeft, ArrowRight, Compass, Target, Puzzle, Sparkles, Search, Phone, MessageCircle, Star, HelpCircle } from "lucide-react";
import Seo from "@/components/Seo";
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
    text: "Идентичность — это не профессия и не диагноз. Это твоё живое ощущение «какой я и что мне сейчас откликается». Оно не выдаётся заранее и не обязано быть окончательным.",
  },
  {
    title: "Она собирается из опыта",
    icon: Puzzle,
    tint: "coral" as Tint,
    text: "Ты узнаёшь себя не через правильный ответ, а через жизнь: пробуешь и замечаешь свою реакцию — «тут интересно», «тут скучно», «это про меня, а это нет».",
  },
  {
    title: "Она живая",
    icon: Compass,
    tint: "violet" as Tint,
    text: "Выбор можно менять. То, что казалось «мною» в 14, к 18 может перестать подходить — это не провал и не потеря времени, а новая информация о себе.",
  },
];

const stages = [
  {
    icon: Search,
    tint: "amber" as Tint,
    tag: "SEARCH",
    title: "Ищи — зачем тебе это",
    text: "Прежде чем что-то выбирать, полезно нащупать своё «зачем». Разбираться в себе — это силы и время, и без внутреннего смысла процесс быстро гаснет. Здесь задача не выбрать, а понять, ради чего тебе вообще во всё это заходить — и заходить ли сейчас.",
    points: [
      "Непонятно, зачем выбирать профессию — это нормально",
      "Нет сил вникать — значит, сначала с силами, а не с выбором",
      "Достаточно одного живого «зачем» — этого хватит, чтобы начать",
    ],
    motto: "Сначала — зачем. Потом — что и как.",
  },
  {
    icon: Compass,
    tint: "teal" as Tint,
    tag: "FIND",
    title: "Ищи — собирай варианты",
    text: "Здесь ты ничего не решаешь навсегда. Ты смотришь, читаешь, спрашиваешь живых людей, как дело выглядит изнутри. Задача — не найти «то самое», а заметить, за что цепляется внимание прямо сейчас.",
    points: [
      "Много смотришь и сравниваешь себя с другими — это нормально",
      "Кажется, что все уже разобрались, кроме тебя — иллюзия",
      "Достаточно 2 направлений, которые интересны сейчас — не навсегда",
    ],
    motto: "Я ничего не решаю навсегда. Я просто смотрю.",
  },
  {
    icon: Target,
    tint: "coral" as Tint,
    tag: "TAKE",
    title: "Пробуй — примеряй роль",
    text: "Ты берёшь маленькую задачу и делаешь. Неловкость, ошибки и «я какой-то не такой» здесь нормальны. Ты ничего никому не доказываешь — ты проверяешь на опыте, как это ощущается изнутри. Ответ «не моё» тут такой же ценный, как «моё».",
    points: [
      "Возьми 1 маленькую задачу или мини-проект",
      "Попроси понятный фидбек: что получилось, что улучшить",
      "После пробы честно ответь себе: что зацепило, что трудно, хочется ли ещё",
    ],
    motto: "Я ничего не обязан(а) доказывать. Я пробую.",
  },
  {
    icon: Puzzle,
    tint: "violet" as Tint,
    tag: "MAKE",
    title: "Собирай — делай по-своему",
    text: "Опыта уже достаточно, чтобы делать по-своему. Задача — не подгонять себя под чужой шаблон, а собрать свой способ и попробовать его в реальности: отклик, стажировку, подработку, проект. И это тоже не финал — дальше можно снова менять.",
    points: [
      "Сформулируй в одну строку: «сейчас я пробую себя в…»",
      "Собери 3 доказательства, что ты уже не с нуля",
      "Сделай 1 реальный выход наружу",
    ],
    motto: "Я не иду чужим путём. Я иду своим — и могу его менять.",
  },
];

const faq = [
  {
    q: "А если мне вообще ничего не интересно?",
    a: "Чаще всего это не «нет интересов», а усталость или тревога — на них тоже уходят силы. Тогда начинать стоит не с выбора, а с состояния. И это нормальный, а не запасной вариант.",
    tint: "teal" as Tint,
  },
  {
    q: "Можно ли перескакивать стадии?",
    a: "Да. Это не лестница и не порядок «правильных» шагов. Можно возвращаться, ходить по кругу и быть в разных стадиях в разных темах жизни.",
    tint: "coral" as Tint,
  },
  {
    q: "А если я ошибусь с выбором?",
    a: "Выбор — не приговор, его можно менять. То, что не подошло, тоже говорит о тебе что-то важное: ты узнаёшь себя точнее, а не теряешь время.",
    tint: "violet" as Tint,
  },
];

const ThreeStages = () => (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-6xl mx-auto flex items-center justify-between">
    <Seo title="Откуда берётся «хочу»: стадии поиска интересов — Как ты?" description="Как узнают себя: не через правильный ответ, а через опыт. Что такое идентичность и как устроены стадии Search → Find → Take → Make." path="/articles/three-stages" type="article" />
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
              Любопытство и интерес не появляются из воздуха. Они вырастают из опыта —
              из того, что ты пробуешь и как на это отзываешься. Здесь про то, как это устроено.
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
          Это твоё ощущение себя: какой ты, что тебе важно, что откликается, а что точно нет.
          Оно не берётся из теста и не собирается за один день — и его не нужно доводить до финального ответа.
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
          Как обычно ищут интерес: четыре стадии
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
          Это не лестница и не программа с сертификатом в конце. Стадии можно проходить не по порядку,
          возвращаться и быть в разных стадиях в разных темах. В конце не обязано появиться «то самое дело» —
          зато появляется больше понимания про себя.
        </p>
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="text-sm opacity-90 mb-5">Короткий тест за 2 минуты — где ты сейчас и что может помочь. Без вердикта, кем тебе быть.</p>
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
        <p className="mt-10 text-center text-base text-muted-foreground">Не обязательно знать, кем ты станешь. Достаточно замечать, как тебе сейчас.</p>
      </ScrollReveal>
    </section>
  </main>
);

export default ThreeStages;
