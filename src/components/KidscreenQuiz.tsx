import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Loader2, AlertCircle, Download, ChevronDown, LifeBuoy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { computeProfile, answerToValue, type ProfileReport } from "@/kidscreen/scoring";
import { generateReportPdf } from "@/kidscreen/pdfReport";
import { RECOMMENDATIONS } from "@/kidscreen/recommendations";
import { WHAT_HELPS, focusScales, practicesForScale, needsHelpFirst, showBreathing } from "@/kidscreen/whatHelps";
import { BREATHING, BREATHING_INTRO } from "@/kidscreen/practices";

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
  /** Секцию можно пропустить */
  optional?: boolean;
}

// Based on KIDSCREEN-52, Child and Adolescent Version (Russian)
const baseSections: Section[] = [

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
    title: "10. Твои отношения с окружающими",
    intro: "Вспоминая последнюю неделю…",
    questions: [
      { id: "b1", text: "Боялся(ась) ли ты других мальчиков и девочек?", scale: SCALE_FREQUENCY },
      { id: "b2", text: "Подшучивали ли над тобой другие мальчики и девочки?", scale: SCALE_FREQUENCY },
      { id: "b3", text: "Дразнили ли тебя другие мальчики и девочки?", scale: SCALE_FREQUENCY },
    ],
  },
];

const SCHOOL_QUESTION_IDS = ["sc1", "sc2", "sc3", "sc4", "sc5", "sc6"];

const schoolSection = (isAdult: boolean): Section =>
  isAdult
    ? {
        title: "9. Институт и учёба",
        intro: "Вспоминая последнюю неделю…",
        optional: true,
        questions: [
          { id: "sc1", text: "Был(а) ли ты счастлив(а) в институте?", scale: SCALE_INTENSITY },
          { id: "sc2", text: "Хорошая ли была у тебя успеваемость в учёбе?", scale: SCALE_INTENSITY },
          { id: "sc3", text: "Был(а) ли ты доволен(а) своими преподавателями?", scale: SCALE_INTENSITY },
          { id: "sc4", text: "Мог(ла) ли ты хорошо концентрироваться?", scale: SCALE_FREQUENCY },
          { id: "sc5", text: "Нравилось ли тебе ходить на занятия?", scale: SCALE_FREQUENCY },
          { id: "sc6", text: "Был(а) ли ты в хороших отношениях с преподавателями?", scale: SCALE_FREQUENCY },
        ],
      }
    : {
        title: "9. Школа и учёба",
        intro: "Вспоминая последнюю неделю…",
        optional: true,
        questions: [
          { id: "sc1", text: "Был(а) ли ты счастлив(а) в школе?", scale: SCALE_INTENSITY },
          { id: "sc2", text: "Хорошая ли была у тебя успеваемость в школе?", scale: SCALE_INTENSITY },
          { id: "sc3", text: "Был(а) ли ты доволен(а) своими учителями?", scale: SCALE_INTENSITY },
          { id: "sc4", text: "Мог(ла) ли ты хорошо концентрироваться?", scale: SCALE_FREQUENCY },
          { id: "sc5", text: "Нравилось ли тебе ходить в школу?", scale: SCALE_FREQUENCY },
          { id: "sc6", text: "Был(а) ли ты в хороших отношениях со своими учителями?", scale: SCALE_FREQUENCY },
        ],
      };

const buildSections = (isAdult: boolean): Section[] => [
  ...baseSections.slice(0, 8),
  schoolSection(isAdult),
  ...baseSections.slice(8),
];

const AGE_OPTIONS = ["до 12", "12–14", "15–17", "18 и старше"];
const SEX_OPTIONS = [
  { value: "female", label: "девушка" },
  { value: "male", label: "парень" },
  { value: "other", label: "другое / не хочу указывать" },
];


const KidscreenQuiz = ({ open, onOpenChange }: KidscreenQuizProps) => {
  const [screen, setScreen] = useState<"intro" | "demographics" | "questions" | "loading" | "done" | "recommendations">("intro");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [profile, setProfile] = useState<ProfileReport | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [expandedScales, setExpandedScales] = useState<Record<string, boolean>>({});
  const [expandedPractices, setExpandedPractices] = useState<Record<string, boolean>>({});
  const [schoolSkipped, setSchoolSkipped] = useState(false);

  const isAdult = age === "18 и старше";
  const sections = useMemo(() => buildSections(isAdult), [isAdult]);
  const scaleNameOverrides = isAdult
    ? { school: { name: "Институт и учёба", short: "Учёба" } }
    : undefined;

  const handleDownloadPdf = async () => {
    if (!profile) return;
    setPdfLoading(true);
    try {
      const sexLabel = SEX_OPTIONS.find((s) => s.value === sex)?.label;
      await generateReportPdf({
        profile,
        answers,
        sections: schoolSkipped
          ? sections.filter((s) => s.questions[0]?.id !== "sc1")
          : sections,
        age,
        sex: sexLabel,
      });
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setPdfLoading(false);
    }
  };

  const totalSections = sections.length;
  const currentSection = sections[sectionIndex];
  const progress = screen === "intro" || screen === "demographics" ? 0 : screen === "done" || screen === "loading" || screen === "recommendations" ? 100 : ((sectionIndex + 1) / totalSections) * 100;

  const reset = () => {
    setScreen("intro");
    setSectionIndex(0);
    setAnswers({});
    setAge("");
    setSex("");
    setProfile(null);
    setSubmitError(null);
    setSchoolSkipped(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const allCurrentAnswered = currentSection?.questions.every((q) => answers[q.id]);


  const submit = async () => {
    setScreen("loading");
    setSubmitError(null);

    // Конвертируем строковые ответы в числа 1..5
    const numeric: Record<string, number> = {};
    for (const sec of sections) {
      for (const q of sec.questions) {
        if (schoolSkipped && SCHOOL_QUESTION_IDS.includes(q.id)) continue;
        const ans = answers[q.id];
        if (ans) numeric[q.id] = answerToValue(ans, q.scale);
      }
    }

    // Локальный профиль (как fallback, чтобы UX был мгновенным)
    const local = computeProfile(numeric, {
      skipScaleIds: schoolSkipped ? ["school"] : [],
      nameOverrides: scaleNameOverrides,
    });
    setProfile(local);


    // session_token
    let token = localStorage.getItem("kidscreen_session");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("kidscreen_session", token);
    }

    try {
      const ageNum = age === "до 12" ? 11 : age === "12–14" ? 13 : age === "15–17" ? 16 : age === "18 и старше" ? 18 : undefined;
      const { error } = await supabase.functions.invoke("submit-kidscreen", {
        body: { session_token: token, age: ageNum, sex: sex || undefined, answers: numeric },
      });
      if (error) console.warn("submit-kidscreen error:", error);
    } catch (e) {
      console.warn("submit-kidscreen failed:", e);
      setSubmitError("Не удалось сохранить результат на сервере, но твой профиль ниже.");
    }
    setScreen("done");
  };

  const goForward = () => {
    if (sectionIndex < totalSections - 1) {
      setSectionIndex(sectionIndex + 1);
      requestAnimationFrame(() => {
        const el = document.getElementById("kidscreen-body");
        if (el) el.scrollTop = 0;
      });
    } else {
      submit();
    }
  };

  const handleNext = () => {
    if (currentSection?.optional) setSchoolSkipped(false);
    goForward();
  };

  const handleSkipSection = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      for (const q of currentSection.questions) delete next[q.id];
      return next;
    });
    setSchoolSkipped(true);
    goForward();
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
      <DialogContent className="sm:max-w-5xl lg:max-w-6xl w-[96vw] max-h-[94vh] p-0 gap-0 rounded-3xl border-border/50 overflow-hidden flex flex-col">
        {/* Header with progress (sticky) */}
        {screen !== "intro" && (
          <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border/40 bg-background">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span className="font-medium">
                {screen === "done" || screen === "recommendations" ? "Готово" : `Шаг ${sectionIndex + 1} из ${totalSections}`}
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
                Спасибо за твой ответ
              </DialogTitle>
              <DialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Если хочешь детальнее понять себя, предлагаем пройти опросник о твоём самочувствии — про семью, друзей, школу и деньги.
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
                onClick={() => setScreen("demographics")}
              >
                Начать <ArrowRight size={18} />
              </Button>
            </div>
          )}

          {/* Demographics */}
          {screen === "demographics" && (
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                  Расскажи немного о себе
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Это поможет лучше понять контекст. Анонимно — имя не нужно.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Сколько тебе лет?</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AGE_OPTIONS.map((a) => {
                    const checked = age === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAge(a)}
                        className={`rounded-xl border-2 px-3 py-2.5 text-sm md:text-base transition-colors ${
                          checked
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/60 bg-background hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
                        }`}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-foreground">Кто ты?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SEX_OPTIONS.map((s) => {
                    const checked = sex === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSex(s.value)}
                        className={`rounded-xl border-2 px-3 py-2.5 text-sm md:text-base transition-colors ${
                          checked
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border/60 bg-background hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" className="gap-1 text-muted-foreground" onClick={() => setScreen("intro")}>
                  <ArrowLeft size={16} /> Назад
                </Button>
                <Button
                  size="lg"
                  className="rounded-full gap-2 px-6"
                  onClick={() => setScreen("questions")}
                  disabled={!age || !sex}
                >
                  Далее <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Questions */}
          {screen === "questions" && currentSection && (
            <div className="p-4 md:p-6 space-y-3">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-foreground">{currentSection.title}</h2>
                {currentSection.intro && (
                  <p className="mt-0.5 text-sm text-muted-foreground">{currentSection.intro}</p>
                )}
              </div>

              <div className="space-y-2">
                {currentSection.questions.map((q, qi) => (
                  <div key={q.id} className="rounded-xl border border-border/60 bg-card p-3">
                    <p className="text-sm md:text-base font-medium text-foreground leading-snug mb-2">
                      <span className="text-primary mr-1.5">{qi + 1}.</span>
                      {q.text}
                    </p>
                    <RadioGroup
                      value={answers[q.id] ?? ""}
                      onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1.5 items-stretch"
                    >
                      {q.scale.map((opt) => {
                        const inputId = `${q.id}-${opt}`;
                        const checked = answers[q.id] === opt;
                        return (
                          <label
                            key={opt}
                            htmlFor={inputId}
                            onClick={(e) => {
                              e.preventDefault();
                              setAnswers((prev) => ({ ...prev, [q.id]: opt }));
                            }}
                            className={`flex items-center gap-2 rounded-lg border-2 px-2.5 py-1.5 cursor-pointer transition-colors text-xs md:text-sm h-full min-h-[2.5rem] ${
                              checked
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border/60 bg-background hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
                            }`}
                          >
                            <RadioGroupItem id={inputId} value={opt} className="shrink-0" tabIndex={-1} />
                            <span className="leading-tight break-words min-w-0 flex-1">{opt}</span>
                          </label>
                        );
                      })}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-muted-foreground"
                  onClick={handleBack}
                  disabled={sectionIndex === 0}
                >
                  <ArrowLeft size={16} /> Назад
                </Button>
                <div className="flex items-center gap-2">
                  {currentSection.optional && (
                    <Button
                      variant="ghost"
                      className="rounded-full text-muted-foreground"
                      onClick={handleSkipSection}
                    >
                      Пропустить
                    </Button>
                  )}
                  <Button
                    className="rounded-full gap-2 px-5"
                    onClick={handleNext}
                    disabled={!allCurrentAnswered}
                  >
                    {sectionIndex === totalSections - 1 ? "Завершить" : "Далее"} <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
              {!allCurrentAnswered && (
                <p className="text-xs text-muted-foreground text-center">
                  {currentSection.optional
                    ? "Этот блок необязательный — можно ответить или пропустить"
                    : "Ответь на все вопросы, чтобы перейти дальше"}
                </p>
              )}

            </div>
          )}

          {/* Loading */}
          {screen === "loading" && (
            <div className="p-10 md:p-16 flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="text-primary animate-spin" size={40} />
              <p className="text-base md:text-lg text-muted-foreground">Считаем твой профиль…</p>
            </div>
          )}

          {/* Done — профиль */}
          {screen === "done" && profile && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <CheckCircle2 className="text-primary" size={36} />
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  Твой профиль самочувствия
                </DialogTitle>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Спасибо, что ответил(а). Это снимок последних семи дней.
                </p>
                {profile.summary?.trim() && (
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {profile.summary}
                  </p>
                )}
                {submitError && (
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-full px-3 py-1.5">
                    <AlertCircle size={14} /> {submitError}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                {profile.scales.map((s) => {
                  const barColor =
                    s.level === "low"
                      ? "bg-destructive"
                      : s.level === "below_avg"
                      ? "bg-orange-400"
                      : s.level === "average"
                      ? "bg-primary/70"
                      : "bg-primary";
                  const isOpen = !!expandedScales[s.scaleId];
                  return (
                    <div key={s.scaleId} className="rounded-2xl border border-border/60 bg-card p-4 md:p-5 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-foreground leading-tight">{s.name}</h3>
                        <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                          {s.levelLabel}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full ${barColor} transition-all`}
                          style={{ width: `${Math.max(4, s.tValue)}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedScales((prev) => ({ ...prev, [s.scaleId]: !prev[s.scaleId] }))
                        }
                        className="flex items-center gap-1 text-xs font-medium text-primary hover:underline pt-1"
                        aria-expanded={isOpen}
                      >
                        {isOpen ? "Свернуть" : "Подробнее"}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                          {RECOMMENDATIONS[s.scaleId][s.level]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  size="lg"
                  className="rounded-full gap-2 px-6"
                  onClick={() => {
                    setScreen("recommendations");
                    requestAnimationFrame(() => {
                      const el = document.getElementById("kidscreen-body");
                      if (el) el.scrollTop = 0;
                    });
                  }}
                >
                  Далее <ArrowRight size={18} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full gap-2 px-6"
                  onClick={handleDownloadPdf}
                  disabled={pdfLoading}
                >
                  {pdfLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Готовим PDF…
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Скачать PDF
                    </>
                  )}
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full gap-2 px-6" onClick={() => handleClose(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          )}

          {/* Что поможет */}
          {screen === "recommendations" && profile && (
            <div className="relative p-6 md:p-8 space-y-6">
              <div className="text-center space-y-3">
                <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  Что поможет
                </DialogTitle>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Здесь можно послушать или почитать, попробовать небольшую практику и выбрать следующий шаг. Бери то, что откликается — ничего обязательного тут нет.
                </p>
              </div>

              {(() => {
                const focus = focusScales(profile.scales);
                const loweredIds = focus.map((s) => s.scaleId);
                return (
                  <div className="space-y-4">
                    {focus.map((s) => {
                      const help = WHAT_HELPS[s.scaleId];
                      const isOpen = !!expandedPractices[s.scaleId];
                      const extra = isOpen ? practicesForScale(s.scaleId, loweredIds) : [];
                      return (
                        <div
                          key={s.scaleId}
                          className="rounded-2xl border border-border/60 bg-card p-4 md:p-5 space-y-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="font-semibold text-foreground leading-tight">{s.name}</h3>
                            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                              {s.levelLabel}
                            </span>
                          </div>

                          {needsHelpFirst(s) && (
                            <div className="rounded-xl bg-primary/10 p-3 md:p-4 space-y-2">
                              <p className="text-sm md:text-base text-foreground leading-relaxed">
                                Похоже, сейчас тебе правда тяжело. С этим не обязательно справляться в одиночку — рядом есть люди, к которым можно обратиться бесплатно и анонимно.
                              </p>
                              <a
                                href="/help"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                              >
                                Помощь рядом <ArrowRight size={14} />
                              </a>
                            </div>
                          )}

                          {help.listen.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Послушать / почитать
                              </p>
                              <ul className="space-y-1">
                                {help.listen.map((l) => (
                                  <li key={l.title} className="text-sm md:text-base">
                                    {l.href ? (
                                      <a
                                        href={l.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-primary hover:underline"
                                      >
                                        {l.title}
                                      </a>
                                    ) : (
                                      <span className="text-foreground">{l.title}</span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Попробовать
                            </p>
                            <p className="text-sm md:text-base font-medium text-foreground">{help.tryTitle}</p>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {help.tryText}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Следующий шаг
                            </p>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                              {help.nextStep}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setExpandedPractices((prev) => ({ ...prev, [s.scaleId]: !prev[s.scaleId] }))
                            }
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            aria-expanded={isOpen}
                          >
                            {isOpen ? "Свернуть" : "Ещё способы"}
                            <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </button>

                          {isOpen && extra.length > 0 && (
                            <div className="space-y-3">
                              {extra.map((p) => (
                                <div key={p.id} className="rounded-xl bg-muted/40 p-3 md:p-4 space-y-2">
                                  <p className="font-semibold text-foreground text-sm md:text-base">{p.title}</p>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{p.why}</p>
                                  <ul className="space-y-1">
                                    {p.what.map((step, i) => (
                                      <li key={i} className="text-sm text-foreground leading-relaxed">
                                        — {step}
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="text-sm text-muted-foreground leading-relaxed italic">{p.notice}</p>
                                </div>
                              ))}
                              <p className="text-xs text-muted-foreground">
                                Некоторые практики удобнее делать на бумаге — возьми лист или открой заметки.
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {showBreathing(focus) && (
                      <div className="rounded-2xl border border-border/60 bg-card p-4 md:p-5 space-y-3">
                        <h3 className="font-semibold text-foreground leading-tight">Дыхание</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {BREATHING_INTRO}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {BREATHING.map((b) => (
                            <div key={b.title} className="rounded-xl bg-muted/40 p-3 md:p-4 space-y-1">
                              <p className="font-semibold text-foreground text-sm md:text-base">{b.title}</p>
                              {b.steps.map((st, i) => (
                                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                                  {st}
                                </p>
                              ))}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Если какой-то вариант неудобен, можно выбрать другой.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full gap-2 px-6"
                  onClick={() => {
                    setScreen("done");
                    requestAnimationFrame(() => {
                      const el = document.getElementById("kidscreen-body");
                      if (el) el.scrollTop = 0;
                    });
                  }}
                >
                  <ArrowLeft size={18} /> К результатам
                </Button>
                <Button
                  size="lg"
                  className="rounded-full gap-2 px-6"
                  onClick={handleDownloadPdf}
                  disabled={pdfLoading}
                >
                  {pdfLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Готовим PDF…
                    </>
                  ) : (
                    <>
                      <Download size={18} /> Скачать PDF
                    </>
                  )}
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full gap-2 px-6" onClick={() => handleClose(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          )}

          {/* Постоянный маршрут «Помощь рядом» */}
          {(screen === "done" || screen === "recommendations") && (
            <a
              href="/help"
              className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              <LifeBuoy size={16} /> Помощь рядом
            </a>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KidscreenQuiz;
