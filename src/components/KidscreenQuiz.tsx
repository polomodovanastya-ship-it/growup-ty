import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface KidscreenQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Two answer scales used by KIDSCREEN-52
const SCALE_INTENSITY = ["вообще нет", "немного", "достаточно", "очень", "в высшей степени"];
const SCALE_FREQUENCY = ["никогда", "редко", "довольно часто", "очень часто", "постоянно"];
const SCALE_HEALTH = ["отличное", "очень хорошее", "хорошее", "ниже среднего", "слабое"];

type Scale = typeof SCALE_INTENSITY | typeof SCALE_FREQUENCY | typeof SCALE_HEALTH;

interface Question {
  id: string;
  text: string;
  scale: Scale;
}

interface Section {
  title: string;
  intro?: string;
  questions: Question[];
}

// Based on KIDSCREEN-52, Child and Adolescent Version (Russian)
const sections: Section[] = [
  {
    title: "1. Физическая активность и здоровье",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "h1", text: "Как бы ты в целом охарактеризовал(а) состояние своего здоровья?", scale: SCALE_HEALTH },
      { id: "h2", text: "Был(а) ли ты в отличной форме и чувствовал(а) ли себя хорошо?", scale: SCALE_INTENSITY },
      { id: "h3", text: "Занимался(лась) ли ты физической активностью (бег, велосипед, скалолазание и т.д.)?", scale: SCALE_INTENSITY },
      { id: "h4", text: "Был(а) ли ты в достаточной физической форме для занятий бегом?", scale: SCALE_INTENSITY },
      { id: "h5", text: "Чувствовал(а) ли ты себя бодро?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "2. Чувства",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "f1", text: "Получал(а) ли ты удовольствие от жизни?", scale: SCALE_INTENSITY },
      { id: "f2", text: "Испытывал(а) ли ты чувство радости от того, что ты живёшь?", scale: SCALE_INTENSITY },
      { id: "f3", text: "Был(а) ли ты доволен(ьна) своей жизнью?", scale: SCALE_INTENSITY },
      { id: "f4", text: "Был(а) ли ты в хорошем настроении?", scale: SCALE_FREQUENCY },
      { id: "f5", text: "Испытывал(а) ли ты чувство радости?", scale: SCALE_FREQUENCY },
      { id: "f6", text: "Веселился(ась) ли ты?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "3. Общее состояние",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "m1", text: "Чувствовал(а) ли ты, что тебе всё опротивело?", scale: SCALE_FREQUENCY },
      { id: "m2", text: "Чувствовал(а) ли ты грусть?", scale: SCALE_FREQUENCY },
      { id: "m3", text: "Чувствовал(а) ли ты себя настолько плохо, что не хотел(а) что-либо делать?", scale: SCALE_FREQUENCY },
      { id: "m4", text: "Было ли у тебя ощущение, что всё в жизни идёт не так?", scale: SCALE_FREQUENCY },
      { id: "m5", text: "Чувствовал(а) ли ты, что тебе всё надоело?", scale: SCALE_FREQUENCY },
      { id: "m6", text: "Чувствовал(а) ли ты себя одиноким(ой)?", scale: SCALE_FREQUENCY },
      { id: "m7", text: "Ощущал(а) ли ты на себе давление со стороны окружающих?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "4. Что ты думаешь о себе",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "s1", text: "Был(а) ли ты доволен(ьна) собой?", scale: SCALE_FREQUENCY },
      { id: "s2", text: "Был(а) ли ты доволен(ьна) своей одеждой?", scale: SCALE_FREQUENCY },
      { id: "s3", text: "Был(а) ли ты обеспокоен(а) тем, как ты выглядишь?", scale: SCALE_FREQUENCY },
      { id: "s4", text: "Завидовал(а) ли ты тому, как выглядят другие мальчики и девочки?", scale: SCALE_FREQUENCY },
      { id: "s5", text: "Хотел(а) ли ты что-то изменить в своём теле?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "5. Свободное время",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "ft1", text: "Было ли у тебя достаточно времени для себя?", scale: SCALE_FREQUENCY },
      { id: "ft2", text: "Мог(ла) ли ты делать в свободное время то, что тебе нравится?", scale: SCALE_FREQUENCY },
      { id: "ft3", text: "Было ли у тебя достаточно времени, чтобы находиться на свежем воздухе?", scale: SCALE_FREQUENCY },
      { id: "ft4", text: "Было ли у тебя достаточно времени, чтобы встречаться с друзьями?", scale: SCALE_FREQUENCY },
      { id: "ft5", text: "Была ли у тебя возможность выбрать, чем заняться в свободное время?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "6. Дом и семья",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "fa1", text: "Понимал(и) ли тебя родитель(и)?", scale: SCALE_INTENSITY },
      { id: "fa2", text: "Ощущал(а) ли ты, что родитель(и) тебя любит(ят)?", scale: SCALE_INTENSITY },
      { id: "fa3", text: "Был(а) ли ты счастлив(а) дома?", scale: SCALE_FREQUENCY },
      { id: "fa4", text: "Уделяли ли тебе родители достаточно времени?", scale: SCALE_FREQUENCY },
      { id: "fa5", text: "Относились ли к тебе родители справедливо?", scale: SCALE_FREQUENCY },
      { id: "fa6", text: "Мог(ла) ли ты говорить с родителями, когда хотел(а)?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "7. Карманные деньги",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "mo1", text: "Хватало ли тебе денег, чтобы делать то же, что и твои друзья?", scale: SCALE_INTENSITY },
      { id: "mo2", text: "Хватало ли тебе денег на твои необходимые расходы?", scale: SCALE_INTENSITY },
      { id: "mo3", text: "Было ли у тебя достаточно денег, чтобы проводить время с друзьями?", scale: SCALE_INTENSITY },
    ],
  },
  {
    title: "8. Друзья",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "fr1", text: "Проводил(а) ли ты время со своими друзьями?", scale: SCALE_FREQUENCY },
      { id: "fr2", text: "Занимался(ась) ли ты чем-нибудь вместе со своими друзьями?", scale: SCALE_FREQUENCY },
      { id: "fr3", text: "Веселился(ась) ли ты со своими друзьями?", scale: SCALE_FREQUENCY },
      { id: "fr4", text: "Помогали ли тебе друзья?", scale: SCALE_FREQUENCY },
      { id: "fr5", text: "Мог(ла) ли ты положиться на своих друзей?", scale: SCALE_FREQUENCY },
      { id: "fr6", text: "Чувствовал(а) ли ты, что друзья тебя понимают?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "9. Школа и учёба",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "sc1", text: "Был(а) ли ты счастлив(а) в школе?", scale: SCALE_INTENSITY },
      { id: "sc2", text: "Хорошая ли была у тебя успеваемость в школе?", scale: SCALE_INTENSITY },
      { id: "sc3", text: "Был(а) ли ты доволен(а) своими учителями?", scale: SCALE_INTENSITY },
      { id: "sc4", text: "Мог(ла) ли ты хорошо концентрироваться?", scale: SCALE_FREQUENCY },
      { id: "sc5", text: "Нравилось ли тебе ходить в школу?", scale: SCALE_FREQUENCY },
      { id: "sc6", text: "Был(а) ли ты в хороших отношениях со своими учителями?", scale: SCALE_FREQUENCY },
    ],
  },
  {
    title: "10. Твои отношения с окружающими",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "b1", text: "Боялся(ась) ли ты других мальчиков и девочек?", scale: SCALE_FREQUENCY },
      { id: "b2", text: "Подшучивали ли над тобой другие мальчики и девочки?", scale: SCALE_FREQUENCY },
      { id: "b3", text: "Дразнили ли тебя другие мальчики и девочки?", scale: SCALE_FREQUENCY },
    ],
  },
];

const KidscreenQuiz = ({ open, onOpenChange }: KidscreenQuizProps) => {
  const [screen, setScreen] = useState<"intro" | "questions" | "done">("intro");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const totalSections = sections.length;
  const currentSection = sections[sectionIndex];
  const progress = screen === "intro" ? 0 : screen === "done" ? 100 : ((sectionIndex + 1) / totalSections) * 100;

  const reset = () => {
    setScreen("intro");
    setSectionIndex(0);
    setAnswers({});
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const allCurrentAnswered = currentSection?.questions.every((q) => answers[q.id]);

  const handleNext = () => {
    if (sectionIndex < totalSections - 1) {
      setSectionIndex(sectionIndex + 1);
      // scroll to top of dialog body
      requestAnimationFrame(() => {
        const el = document.getElementById("kidscreen-body");
        if (el) el.scrollTop = 0;
      });
    } else {
      setScreen("done");
    }
  };

  const handleBack = () => {
    if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      requestAnimationFrame(() => {
        const el = document.getElementById("kidscreen-body");
        if (el) el.scrollTop = 0;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl max-h-[92vh] p-0 gap-0 rounded-3xl border-border/50 overflow-hidden flex flex-col">
        {/* Header with progress (sticky) */}
        {screen !== "intro" && (
          <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border/40 bg-background">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span className="font-medium">
                {screen === "done" ? "Готово" : `Шаг ${sectionIndex + 1} из ${totalSections}`}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div id="kidscreen-body" className="overflow-y-auto flex-1">
          {/* Intro */}
          {screen === "intro" && (
            <div className="p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={22} />
                <span className="text-xs font-bold tracking-wider text-primary uppercase">Как ты сейчас?</span>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Привет! Как дела? Как ты себя чувствуешь?
              </DialogTitle>
              <DialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Это короткий опросник о твоём самочувствии за последнюю неделю — про тело, настроение, друзей, школу и семью.
              </DialogDescription>
              <ul className="space-y-2 text-base text-muted-foreground">
                <li>• Это <span className="text-foreground font-medium">не тест</span> — здесь нет правильных и неправильных ответов.</li>
                <li>• Думай о <span className="text-foreground font-medium">последних 7 днях</span>.</li>
                <li>• Выбирай ответ, который <span className="text-foreground font-medium">первым приходит в голову</span>.</li>
                <li>• Твои ответы остаются <span className="text-foreground font-medium">только у тебя</span>.</li>
              </ul>
              <Button
                size="lg"
                className="rounded-full gap-2 text-base px-8"
                onClick={() => setScreen("questions")}
              >
                Начать <ArrowRight size={18} />
              </Button>
            </div>
          )}

          {/* Questions */}
          {screen === "questions" && currentSection && (
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{currentSection.title}</h2>
                {currentSection.intro && (
                  <p className="mt-1 text-sm md:text-base text-muted-foreground">{currentSection.intro}</p>
                )}
              </div>

              <div className="space-y-5">
                {currentSection.questions.map((q, qi) => (
                  <div key={q.id} className="rounded-2xl border border-border/60 bg-card p-4 md:p-5">
                    <p className="text-base md:text-lg font-medium text-foreground leading-snug mb-3">
                      <span className="text-primary mr-1.5">{qi + 1}.</span>
                      {q.text}
                    </p>
                    <RadioGroup
                      value={answers[q.id] ?? ""}
                      onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2"
                    >
                      {q.scale.map((opt) => {
                        const inputId = `${q.id}-${opt}`;
                        const checked = answers[q.id] === opt;
                        return (
                          <Label
                            key={opt}
                            htmlFor={inputId}
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 cursor-pointer transition-all text-sm md:text-base ${
                              checked
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border/60 bg-background hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
                            }`}
                          >
                            <RadioGroupItem id={inputId} value={opt} />
                            <span className="leading-tight">{opt}</span>
                          </Label>
                        );
                      })}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  className="gap-1 text-muted-foreground"
                  onClick={handleBack}
                  disabled={sectionIndex === 0}
                >
                  <ArrowLeft size={16} /> Назад
                </Button>
                <Button
                  size="lg"
                  className="rounded-full gap-2 px-6"
                  onClick={handleNext}
                  disabled={!allCurrentAnswered}
                >
                  {sectionIndex === totalSections - 1 ? "Завершить" : "Далее"} <ArrowRight size={16} />
                </Button>
              </div>
              {!allCurrentAnswered && (
                <p className="text-xs text-muted-foreground text-center">
                  Ответь на все вопросы, чтобы перейти дальше
                </p>
              )}
            </div>
          )}

          {/* Done */}
          {screen === "done" && (
            <div className="p-6 md:p-8 space-y-5 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <CheckCircle2 className="text-primary" size={40} />
                </div>
              </div>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
                Спасибо, что прошёл(ла) опросник!
              </DialogTitle>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Ты сделал(а) важный шаг — остановился(ась) и прислушался(ась) к себе. Это уже забота о себе.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button size="lg" className="rounded-full gap-2 px-6" onClick={() => handleClose(false)}>
                  Закрыть
                </Button>
                <Button size="lg" variant="outline" className="rounded-full gap-2 px-6" onClick={reset}>
                  Пройти заново
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KidscreenQuiz;
