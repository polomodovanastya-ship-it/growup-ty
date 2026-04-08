import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Compass, Target, Puzzle } from "lucide-react";

type Stage = "find" | "take" | "make";

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
    ],
  },
  {
    text: "Что мешает сильнее всего?",
    options: [
      { label: "Ничего не понятно, всё слишком большое", stage: "find" as Stage },
      { label: "Страшно ошибиться и облажаться", stage: "take" as Stage },
      { label: "Не хочу быть копией других", stage: "make" as Stage },
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

const results: Record<Stage, {
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

type Screen = "intro" | "question" | "tiebreaker" | "result";

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
    const counts: Record<Stage, number> = { find: 0, take: 0, make: 0 };
    ans.forEach((a) => counts[a]++);
    const max = Math.max(counts.find, counts.take, counts.make);
    const winners = (Object.keys(counts) as Stage[]).filter((k) => counts[k] === max);
    if (winners.length === 1) return winners[0];
    return "tie";
  };

  const handleAnswer = (stage: Stage) => {
    const newAnswers = [...answers, stage];
    setAnswers(newAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const res = computeResult(newAnswers);
      if (res === "tie") {
        setScreen("tiebreaker");
      } else {
        setResult(res);
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl border-border/50">
        {/* Intro */}
        {screen === "intro" && (
          <div className="p-6 space-y-4">
            <DialogTitle className="text-xl font-bold text-foreground leading-tight">
              Не знаешь, кем хочешь стать? Это нормально.
            </DialogTitle>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground/80">За 2 минуты поймём, где ты сейчас:</p>
              <p>ищешь, примеряешь или собираешь своё.</p>
              <p>Тут нет правильных ответов.</p>
              <p>Мы не выбираем профессию на всю жизнь.</p>
              <p className="font-medium text-foreground/80">Мы ищем только твой следующий шаг.</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Button
                size="lg"
                className="rounded-full gap-2"
                onClick={() => { setScreen("question"); setQuestionIndex(0); }}
              >
                Разобраться <ArrowRight size={16} />
              </Button>
              <Button
                variant="ghost"
                className="text-sm text-muted-foreground hover:text-primary"
                onClick={() => {
                  // Jump to result as "article" mode — show FIND as default overview
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
          <div className="p-6 space-y-5">
            <DialogTitle className="sr-only">Вопрос {questionIndex + 1}</DialogTitle>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{questionIndex + 1} / {totalSteps}</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-snug">
              {questions[questionIndex].text}
            </h3>
            <div className="flex flex-col gap-2.5">
              {questions[questionIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.stage)}
                  className="text-left rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {questionIndex > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => {
                  setAnswers(answers.slice(0, -1));
                  setQuestionIndex(questionIndex - 1);
                }}
              >
                <ArrowLeft size={14} /> Назад
              </Button>
            )}
          </div>
        )}

        {/* Tiebreaker */}
        {screen === "tiebreaker" && (
          <div className="p-6 space-y-5">
            <DialogTitle className="sr-only">Дополнительный вопрос</DialogTitle>
            <div className="space-y-2">
              <Progress value={100} className="h-1.5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground leading-snug">
              {tiebreakerQuestion.text}
            </h3>
            <div className="flex flex-col gap-2.5">
              {tiebreakerQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleTiebreaker(opt.stage)}
                  className="text-left rounded-xl border border-border/60 bg-card px-4 py-3.5 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
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
              <Button size="lg" className="rounded-full gap-2">
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
      </DialogContent>
    </Dialog>
  );
};

export default CareerQuiz;
