import { ArrowLeft, ShieldCheck, MessageCircle, Wallet, Search, ThumbsUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

const steps = [
  {
    icon: Search,
    title: "Проверь образование",
    text: "У психолога — профильное высшее образование. У психотерапевта — плюс обучение в методе (КПТ, схема-терапия и т. д.). У психиатра — медицинский диплом. Спросить об этом прямо — нормально.",
  },
  {
    icon: MessageCircle,
    title: "Сформулируй запрос своими словами",
    text: "Не нужно диагнозов и умных терминов. Достаточно: «не сплю», «поссорился с мамой», «не понимаю, куда поступать». Специалист поможет уточнить.",
  },
  {
    icon: Wallet,
    title: "Уточни формат и цену заранее",
    text: "Сколько длится встреча, онлайн или очно, сколько стоит, есть ли бесплатные варианты. Школьный психолог и психолог в поликлинике — бесплатно.",
  },
  {
    icon: ShieldCheck,
    title: "Спроси про конфиденциальность",
    text: "Что расскажут родителям, а что нет. Специалист обязан хранить тайну, исключение — угроза жизни и здоровью.",
  },
  {
    icon: ThumbsUp,
    title: "Дай себе 1–3 встречи на «примерку»",
    text: "Ориентир: тебя слушают, не оценивают, объясняют, что происходит и куда идёте. Если после встреч спокойнее и понятнее — это твой человек.",
  },
];

const redFlags = [
  "Обещает «вылечить за одну встречу» или гарантирует результат",
  "Оценивает и стыдит: «сам виноват», «ерунда, все так живут»",
  "Даёт советы вместо разбора и настаивает на своём решении",
  "Психолог (не врач) назначает лекарства",
  "Нарушает границы: пишет ночью, зовёт дружить, обсуждает тебя с другими",
  "Обижается, если ты хочешь сменить специалиста",
];

const HowToChoose = () => (
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
        <span className="text-border">·</span>
        <Link
          to="/articles/who-helps"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          К кому обратиться
        </Link>
      </div>
      <img src={logo} alt="как ты" className="h-8 w-auto select-none" draggable={false} />
    </header>

    <section className="px-4 pt-4 pb-12 max-w-3xl mx-auto">
      <ScrollReveal>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Как выбрать специалиста</h1>
        <p className="text-muted-foreground mb-8">
          Пять простых шагов и список тревожных признаков. Ошибиться не страшно: специалиста всегда можно сменить.
        </p>
      </ScrollReveal>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 60}>
            <article className="rounded-2xl border bg-card p-4 md:p-5 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 flex items-center justify-center w-10 h-10 shrink-0">
                  <s.icon className="text-primary" size={19} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground leading-tight">
                    {i + 1}. {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="mt-10 rounded-2xl border border-destructive/40 bg-destructive/5 p-4 md:p-6">
          <h2 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
            <AlertTriangle className="text-destructive" size={20} />
            Когда стоит насторожиться
          </h2>
          <ul className="space-y-2">
            {redFlags.map((f) => (
              <li key={f} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-destructive">—</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <p className="mt-8 text-sm text-muted-foreground">
          Если сейчас очень тяжело — загляни в блок{" "}
          <Link to="/help" className="text-primary underline underline-offset-4">
            «Помощь рядом»
          </Link>
          : там телефоны доверия и бесплатные чаты поддержки.
        </p>
      </ScrollReveal>
    </section>
  </main>
);

export default HowToChoose;
