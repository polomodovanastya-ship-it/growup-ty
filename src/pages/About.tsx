import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

type Creator = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

const creators: Creator[] = [
  {
    name: "Анастасия Поломодова",
    role: "Со-основательница проекта",
    bio: "Верит, что подросткам нужен честный разговор без морали и осуждения. Помогает разбираться с эмоциями простыми словами.",
    initials: "АП",
  },
  {
    name: "Наталья Сухова",
    role: "Со-основательница проекта",
    bio: "Заботится о том, чтобы каждый подросток знал: с любой непростой ситуацией можно справиться, и рядом всегда есть те, кто поддержит.",
    initials: "НС",
  },
];

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <header className="sticky top-0 z-30 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-5xl mx-auto px-4 h-14 md:h-16 flex items-center">
          <Link to="/" aria-label="как ты — на главную" className="flex items-center">
            <img src={logo} alt="как ты" className="h-7 md:h-9 w-auto select-none" draggable={false} />
          </Link>
        </div>
      </header>

      <section className="relative px-4 pt-8 pb-6 md:pt-14 md:pb-10 flex flex-col items-center text-center">
        <div className="blob w-48 h-48 md:w-72 md:h-72 bg-primary/30 -top-10 -left-10 md:-left-20" />
        <div
          className="blob w-40 h-40 md:w-64 md:h-64 bg-secondary/30 top-20 -right-8 md:-right-16"
          style={{ animationDelay: "2s" }}
        />

        <ScrollReveal>
          <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            О нас
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="relative mt-4 max-w-xl text-base md:text-lg text-muted-foreground">
            Кто стоит за проектом «Как ты» и зачем мы это делаем.
          </p>
        </ScrollReveal>
      </section>

      <section className="px-4 pb-10 max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="rounded-2xl border bg-card p-6 md:p-8 space-y-4">
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              «Как ты» — проект о ментальном здоровье подростков. Мы собрали в одном месте короткие
              опросы, подкасты и проверенные сервисы поддержки, чтобы в трудный момент было проще
              понять, что с тобой происходит и куда обратиться. Без сложных слов, без оценок —
              просто рядом.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Мы верим: говорить о чувствах — нормально, просить о помощи — нормально, не знать
              ответов — тоже нормально. Этот сайт мы делаем для тех, кому сейчас непросто, и для
              тех, кто рядом с ними: родителей, друзей, учителей. Чтобы поддержка была понятной,
              доступной и человечной.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="px-4 pb-16 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Создательницы
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {creators.map((c, i) => (
            <ScrollReveal key={c.name} delay={i * 80}>
              <div className="group h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {c.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {c.name}
                    </h3>
                    <p className="text-sm text-primary mt-0.5 flex items-center gap-1.5">
                      <Sparkles size={14} /> {c.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {c.bio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Heart size={14} className="text-primary" /> Сделано с заботой о подростках
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> На главную
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
