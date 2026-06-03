import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Compass, Target, Puzzle, Heart, MessageCircle, HandHeart, ExternalLink, Sparkles } from "lucide-react";

type Stage = "find" | "take" | "make" | "heavy";
type CareerStage = "find" | "take" | "make";

interface CareerQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const questions = [
  {
    text: "Что у тебя сейчас происходит чаще всего?",
    options: [
      { label: "Я в основном смотрю, читаю, думаю, но не пробую", stage: "find" as Stage },
      { label: "Уже пробую маленькие задачи, но чувствую себя неуверенно", stage: "take" as Stage },
      { label: "Уже что-то делаю и хочу понять, как делать это по-своему", stage: "make" as Stage },
      { label: "Вообще ничего не хочется", stage: "heavy" as Stage },
    ],
  },
  {
    text: "Что мешает сильнее всего?",
    options: [
      { label: "Ничего не понятно, всё слишком большое", stage: "find" as Stage },
      { label: "Страшно ошибиться и облажаться", stage: "take" as Stage },
      { label: "Не хочу быть копией других", stage: "make" as Stage },
      { label: "Слишком тревожно, мне сейчас не до работы", stage: "heavy" as Stage },
    ],
  },
  {
    text: "Что у тебя уже есть?",
    options: [
      { label: "Интерес к нескольким вариантам", stage: "find" as Stage },
      { label: "Пара проб / мини-кейсов / задач", stage: "take" as Stage },
      { label: "Понимание, что у меня получается по-своему", stage: "make" as Stage },
    ],
  },
  {
    text: "Когда что-то не выходит, я чаще…",
    options: [
      { label: "Снова откладываю и просто смотрю, как делают другие", stage: "find" as Stage },
      { label: 'Думаю: "наверное, это не моё"', stage: "take" as Stage },
      { label: "Переделываю и делаю выводы", stage: "make" as Stage },
    ],
  },
  {
    text: "К первой работе я сейчас ближе как к…",
    options: [
      { label: "Исследованию", stage: "find" as Stage },
      { label: "Пробе", stage: "take" as Stage },
      { label: "Следующему реальному шагу", stage: "make" as Stage },
    ],
  },
];

const tiebreakerQuestion = {
  text: "За последние 2 недели ты скорее:",
  options: [
    { label: "Больше смотрел, чем делал", stage: "find" as Stage },
    { label: "Пробовал, но нестабильно", stage: "take" as Stage },
    { label: "Уже сделал 1–2 реальных шага", stage: "make" as Stage },
  ],
};

const results: Record<CareerStage, {
  icon: typeof Compass;
  tag: string;
  title: string;
  short: string;
  signs: string[];
  donts: string[];
}> = {
  find: {
    icon: Compass,
    tag: "FIND",
    title: "Ты сейчас на стадии FIND — ищешь, за что зацепиться",
    short: "С тобой всё ок. Ты не отстаёшь. Твоя задача сейчас — не выбрать навсегда, а сузить поле и сделать первую безопасную пробу.",
    signs: [
      "Много смотришь и сравниваешь себя с другими",
      "Кажется, что все уже разобрались, кроме тебя",
      "Трудно выбрать, с чего начать",
    ],
    donts: [
      'Не сравнивать себя с "идеальными" людьми из интернета',
      "Не требовать от себя готового ответа прямо сейчас",
      'Не покупать себе сразу "новую жизнь", не попробовав маленький шаг',
    ],
  },
  take: {
    icon: Target,
    tag: "TAKE",
    title: "Ты сейчас на стадии TAKE — примеряешь роль на себе",
    short: 'Неловкость, ошибки и ощущение "я какой-то не такой" здесь нормальны. Твоя задача — не доказать, что ты уже профи, а накопить живой опыт.',
    signs: [
      "Ты уже что-то пробовал",
      "Ошибки быстро бьют по уверенности",
      "После неудачи хочется всё бросить",
    ],
    donts: [
      "Не ждать, что сразу получится",
      'Не считать одну неудачу доказательством "это не моё"',
      "Не делать слишком большой первый шаг",
    ],
  },
  make: {
    icon: Puzzle,
    tag: "MAKE",
    title: "Ты сейчас на стадии MAKE — собираешь свою версию себя",
    short: "У тебя уже не ноль. Твоя задача — не подгонять себя под чужой шаблон, а собрать свой стиль и выйти в реальный опыт.",
    signs: [
      "Ты уже понимаешь, что у тебя получается",
      "Начинаешь делать по-своему",
      "Можешь назвать роль, к которой идёшь",
    ],
    donts: [
      "Не копировать других один в один",
      'Не стирать свой стиль ради "как правильно"',
      "Не откатываться в полный сброс после первой ошибки",
    ],
  },
};

const plans: Record<CareerStage, { steps: string[]; motto: string }> = {
  find: {
    steps: [
      "Выбери 2 направления, которые тебе сейчас реально интересны.",
      'Найди 1 живого человека или 1 честный разбор "как выглядит эта работа на самом деле".',
      "Сделай 1 микропробу на 20–30 минут.",
    ],
    motto: "Не выбираю навсегда. Просто проверяю.",
  },
  take: {
    steps: [
      "Возьми 1 маленькую задачу / мини-проект.",
      "Попроси 1 понятный фидбек: что получилось, что улучшить.",
      "После пробы ответь себе на 3 вопроса: что было интересно / что далось трудно / что хочу повторить?",
    ],
    motto: "Я не обязан быть идеальным. Я собираю опыт.",
  },
  make: {
    steps: [
      'Сформулируй в одну строку: "я пробую себя в…"',
      "Собери 3 доказательства, что ты уже не с нуля: задача, кейс, проект, помощь, результат.",
      "Сделай 1 реальный выход наружу: отклик, стажировка, подработка, проект.",
    ],
    motto: "Я не копирую чужой путь. Я собираю свой.",
  },
};

type Screen = "intro" | "question" | "tiebreaker" | "result" | "plan" | "heavy" | "heavy-simple" | "heavy-adult" | "heavy-support";

const CareerQuiz = ({ open, onOpenChange }: CareerQuizProps) => {
  const [screen, setScreen] = useState<Screen>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Stage[]>([]);
  const [result, setResult] = useState<Stage | null>(null);

  const reset = () => {
    setScreen("intro");
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const computeResult = (ans: Stage[]): Stage | "tie" => {
    const heavyCount = ans.filter((a) => a === "heavy").length;
    if (heavyCount >= 2) return "heavy";

    const counts: Record<string, number> = { find: 0, take: 0, make: 0 };
    ans.forEach((a) => { if (a !== "heavy") counts[a]++; });
    const max = Math.max(counts.find, counts.take, counts.make);
    const winners = (["find", "take", "make"] as Stage[]).filter((k) => counts[k] === max);
    if (winners.length === 1) return winners[0];
    return "tie";
  };

  const handleAnswer = (stage: Stage) => {
    const newAnswers = [...answers, stage];
    setAnswers(newAnswers);

    // Early exit to heavy if 2 heavy answers already
    const heavyCount = newAnswers.filter((a) => a === "heavy").length;
    if (heavyCount >= 2) {
      setScreen("heavy");
      return;
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const res = computeResult(newAnswers);
      if (res === "tie") {
        setScreen("tiebreaker");
      } else if (res === "heavy") {
        setScreen("heavy");
      } else {
        setResult(res as Stage);
        setScreen("result");
      }
    }
  };

  const handleTiebreaker = (stage: Stage) => {
    setResult(stage);
    setScreen("result");
  };

  const totalSteps = questions.length;
  const progress = screen === "question" ? ((questionIndex + 1) / totalSteps) * 100 : screen === "tiebreaker" ? 100 : 0;
  const showHeader = screen === "question" || screen === "tiebreaker";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-5xl lg:max-w-6xl w-[96vw] max-h-[94vh] p-0 gap-0 rounded-3xl border-border/50 overflow-hidden flex flex-col">
        {/* Sticky header with progress */}
        {showHeader && (
          <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border/40 bg-background">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span className="font-medium">
                {screen === "tiebreaker" ? "Дополнительный вопрос" : `Шаг ${questionIndex + 1} из ${totalSteps}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div id="career-body" className="overflow-y-auto flex-1">
        {/* Intro */}
        {screen === "intro" && (
          <div className="p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={22} />
              <span className="text-xs font-bold tracking-wider text-primary uppercase">Кем я хочу стать?</span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Не знаешь, кем хочешь стать? Это нормально.
            </DialogTitle>
            <DialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
              За 2 минуты поймём, где ты сейчас: ищешь, примеряешь или собираешь своё.
            </DialogDescription>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>• Это <span className="text-foreground font-medium">не тест</span> — здесь нет правильных и неправильных ответов.</li>
              <li>• Выбирай ответ, который <span className="text-foreground font-medium">первым приходит в голову</span>.</li>
              <li>• Твои ответы остаются <span className="text-foreground font-medium">только у тебя</span>.</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="lg"
                className="rounded-full gap-2 text-base px-8"
                onClick={() => { setScreen("question"); setQuestionIndex(0); }}
              >
                Начать <ArrowRight size={18} />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full text-base text-muted-foreground hover:text-primary"
                onClick={() => {
                  setResult("find");
                  setScreen("result");
                }}
              >
                Просто прочитать про 3 стадии
              </Button>
            </div>
          </div>
        )}

        {/* Questions */}
        {screen === "question" && (
          <div className="p-6 md:p-8 space-y-6">
            <DialogTitle className="sr-only">Вопрос {questionIndex + 1}</DialogTitle>
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
              {questions[questionIndex].text}
            </h2>
            <div className="flex flex-col gap-2">
              {questions[questionIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.stage)}
                  className="flex items-center text-left rounded-xl border-2 border-border/60 bg-card px-4 py-2.5 text-sm md:text-base text-foreground transition-colors min-h-[2.75rem] hover:border-primary/40 hover:bg-primary/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {questionIndex > 0 && (
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  className="gap-1 text-muted-foreground"
                  onClick={() => {
                    setAnswers(answers.slice(0, -1));
                    setQuestionIndex(questionIndex - 1);
                  }}
                >
                  <ArrowLeft size={16} /> Назад
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Tiebreaker */}
        {screen === "tiebreaker" && (
          <div className="p-6 md:p-8 space-y-6">
            <DialogTitle className="sr-only">Дополнительный вопрос</DialogTitle>
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
              {tiebreakerQuestion.text}
            </h2>
            <div className="flex flex-col gap-3">
              {tiebreakerQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleTiebreaker(opt.stage)}
                  className="flex items-center text-left rounded-2xl border-2 border-border/60 bg-card px-5 py-4 text-base md:text-lg text-foreground transition-colors min-h-[4rem] hover:border-primary/40 hover:bg-primary/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {screen === "result" && result && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Результат</DialogTitle>
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = results[result].icon;
                return <Icon size={20} className="text-primary" />;
              })()}
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                {results[result].tag}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              {results[result].title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {results[result].short}
            </p>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Признаки:</p>
              <ul className="space-y-1.5">
                {results[result].signs.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Что важно не делать:</p>
              <ul className="space-y-1.5">
                {results[result].donts.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive/60 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button size="lg" className="rounded-full gap-2" onClick={() => setScreen("plan")}>
                Собрать мой план <ArrowRight size={16} />
              </Button>
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground"
                onClick={reset}
              >
                Пройти заново
              </Button>
            </div>
          </div>
        )}

        {/* Plan */}
        {screen === "plan" && result && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Твой план</DialogTitle>
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = results[result].icon;
                return <Icon size={20} className="text-primary" />;
              })()}
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                {results[result].tag} — твой план
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              Твои 3 шага:
            </h3>
            <ol className="space-y-3">
              {plans[result].steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="flex shrink-0 items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3">
              <p className="text-sm font-medium text-foreground italic">
                «{plans[result].motto}»
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground"
                onClick={() => setScreen("result")}
              >
                <ArrowLeft size={14} className="mr-1" /> Назад к результату
              </Button>
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground"
                onClick={reset}
              >
                Пройти заново
              </Button>
            </div>
          </div>
        )}

        {/* Heavy — support branch */}
        {screen === "heavy" && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Поддержка</DialogTitle>
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              Похоже, тебе сейчас важнее не «выбрать путь», а немного вернуть себе опору.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Давай начнём с очень маленького шага.
            </p>
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={() => setScreen("heavy-simple")}
                className="flex items-center gap-3 text-left rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <Target size={18} className="text-primary shrink-0" />
                Упростить план до 1 шага
              </button>
              <button
                onClick={() => setScreen("heavy-adult")}
                className="flex items-center gap-3 text-left rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <MessageCircle size={18} className="text-primary shrink-0" />
                Поговорить с близким взрослым
              </button>
              <button
                onClick={() => setScreen("heavy-support")}
                className="flex items-center gap-3 text-left rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <HandHeart size={18} className="text-primary shrink-0" />
                Найти поддержку
              </button>
            </div>
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground"
              onClick={reset}
            >
              Пройти заново
            </Button>
          </div>
        )}

        {/* Heavy — simplified 1 step */}
        {screen === "heavy-simple" && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Один шаг</DialogTitle>
            <div className="flex items-center gap-2">
              <Target size={20} className="text-primary" />
              <span className="text-xs font-bold tracking-wider text-primary uppercase">Один шаг</span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              Не нужно планировать всё. Вот один маленький шаг:
            </h3>
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-4">
              <p className="text-sm text-foreground leading-relaxed">
                Выбери что-то одно, что тебе хоть немного интересно, и потрать на это 15 минут. Просто посмотри, почитай, попробуй. Без обязательств.
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 px-4 py-3">
              <p className="text-sm text-muted-foreground italic">
                «Мне не нужно знать весь путь. Достаточно одного шага.»
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground gap-1"
                onClick={() => setScreen("heavy")}
              >
                <ArrowLeft size={14} /> Назад
              </Button>
            </div>
          </div>
        )}

        {/* Heavy — close adult */}
        {screen === "heavy-adult" && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Близкий взрослый</DialogTitle>
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-primary" />
              <span className="text-xs font-bold tracking-wider text-primary uppercase">Близкий взрослый</span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              Кто такой «близкий взрослый»?
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Это не обязательно кто-то из семьи. Это человек, рядом с которым тебе <span className="text-foreground font-medium">спокойно</span>.
              </p>
              <p>
                С ним можно <span className="text-foreground font-medium">помолчать</span> — и это не будет неловко. Можно рассказать что-то — и знать, что тебя <span className="text-foreground font-medium">услышат</span>, а не начнут сразу учить.
              </p>
              <p>
                Это человек, рядом с которым ты чувствуешь себя <span className="text-foreground font-medium">в безопасности</span>. Он не оценивает, не сравнивает, не торопит.
              </p>
              <p>
                Может, это тренер. Может, старший друг. Может, учитель, который когда-то сказал что-то важное. Или кто-то совсем неожиданный.
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 px-4 py-3">
              <p className="text-sm text-muted-foreground italic">
                Попробуй вспомнить одного такого человека. Не нужно ничего решать прямо сейчас — просто подумай о нём.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground gap-1"
                onClick={() => setScreen("heavy")}
              >
                <ArrowLeft size={14} /> Назад
              </Button>
            </div>
          </div>
        )}

        {/* Heavy — find support */}
        {screen === "heavy-support" && (
          <div className="p-6 space-y-4">
            <DialogTitle className="sr-only">Найти поддержку</DialogTitle>
            <div className="flex items-center gap-2">
              <HandHeart size={20} className="text-primary" />
              <span className="text-xs font-bold tracking-wider text-primary uppercase">Поддержка</span>
            </div>
            <h3 className="text-lg font-bold text-foreground leading-snug">
              Иногда нужен кто-то, кто поможет разобраться
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Карьерный консультант — это не человек, который скажет «иди туда». Это тот, кто поможет тебе услышать себя и найти свой следующий шаг.
            </p>
            <a
              href="https://t.me/KemjeIstanu_LadoslavaF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-4 text-sm text-foreground transition-all hover:border-primary/60 hover:bg-primary/10"
            >
              <div className="flex-1">
                <p className="font-medium">Карьерный консультант</p>
                <p className="text-muted-foreground text-xs mt-0.5">@KemjeIstanu_LadoslavaF · Telegram</p>
              </div>
              <ExternalLink size={16} className="text-primary shrink-0" />
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground gap-1"
                onClick={() => setScreen("heavy")}
              >
                <ArrowLeft size={14} /> Назад
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerQuiz;
