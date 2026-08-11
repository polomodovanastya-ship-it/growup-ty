import { ArrowLeft, Compass, Target, Puzzle, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const stages = [
  {
    icon: Compass,
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

const identitySteps = [
  {
    title: "Я — это не ярлык",
    text: "Идентичность — это не профессия и не диагноз. Это ответ на вопрос «какой я и чего мне хочется», который ты формулируешь сам. Никто не выдаёт этот ответ заранее.",
  },
  {
    title: "Она собирается из опыта",
    text: "Каждый раз, когда ты что-то пробуешь и замечаешь свою реакцию — «тут мне интересно», «а тут скучно», «это моё, а это нет» — ты добавляешь кусочек в картину себя.",
  },
  {
    title: "Она живая",
    text: "Идентичность меняется. То, что казалось «мною» в 14, к 18 может отвалиться — и это не потеря, а уточнение. Идти к себе — это процесс, а не финальная точка.",
  },
];

const ThreeStages = () => (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-3xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          На главную
        </Link>
      </div>
      <img src={logo} alt="как ты" className="h-8 w-auto select-none" draggable={false} />
    </header>

    <section className="px-4 pt-4 pb-12 max-w-3xl mx-auto">
      <ScrollReveal>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-primary" size={20} />
          <span className="text-xs font-bold tracking-wider text-primary uppercase">Кем я хочу стать</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
          Откуда берётся «хочу»
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Любопытство и интерес не появляются из воздуха. Они вырастают из того, как ты
          узнаёшь себя — и это процесс, у которого есть свои стадии. Разберёмся простыми словами.
        </p>
      </ScrollReveal>

      {/* Что такое идентичность */}
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground mb-2">Сначала — что такое идентичность</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Идентичность — это твоя картина себя: какой ты, что тебе важно, чего ты хочешь и чего
          точно не хочешь. Она не выдаётся в один день и не берётся из теста. Она формируется
          постепенно, через опыт и реакции.
        </p>
      </ScrollReveal>

      <div className="space-y-3 mb-10">
        {identitySteps.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 60}>
            <article className="rounded-2xl border bg-card p-4 md:p-5 hover:border-primary/40 transition-colors">
              <h3 className="font-semibold text-foreground leading-tight mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* Переход к 3 стадиям */}
      <ScrollReveal>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Как появляется интерес: три стадии
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Интерес к делу проходит три стадии. Их можно проходить не по порядку, возвращаться назад
          и перескакивать — но обычно путь выглядит так:
        </p>
      </ScrollReveal>

      {/* Стадии */}
      <div className="space-y-4">
        {stages.map((s, i) => (
          <ScrollReveal key={s.tag} delay={i * 80}>
            <article className="rounded-2xl border bg-card p-4 md:p-6 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="rounded-lg bg-primary/10 flex items-center justify-center w-11 h-11 shrink-0">
                  <s.icon className="text-primary" size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold tracking-wider text-primary uppercase">{s.tag}</span>
                  <h3 className="font-semibold text-lg text-foreground leading-tight">{s.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.text}</p>
              <ul className="space-y-2 mb-4">
                {s.points.map((p, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
                <p className="text-sm font-medium text-foreground italic">«{s.motto}»</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <ScrollReveal>
        <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6 text-center">
          <h3 className="font-semibold text-foreground mb-2">Хочешь узнать свою стадию?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Пройди короткий тест за 2 минуты — и получи свой план из трёх шагов.
          </p>
          <Link to="/">
            <Button size="lg" className="rounded-full gap-2 text-base px-8">
              Пройти тест <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="mt-8 text-sm text-muted-foreground">
          Загляни также в статью{" "}
          <Link to="/articles/how-to-choose" className="text-primary underline underline-offset-4">
            «Как выбрать специалиста»
          </Link>{" "}
          — если хочется поддержки со стороны.
        </p>
      </ScrollReveal>
    </section>
  </main>
);

export default ThreeStages;
