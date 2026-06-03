import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, LifeBuoy, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

type LinkItem = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  emergency?: boolean;
};

const links: LinkItem[] = [
  // Экстренные службы
  {
    title: "112 — Единый номер экстренных служб",
    description: "Звонок бесплатный, доступен с любого телефона, даже без сим-карты.",
    url: "tel:112",
    tags: ["экстренное", "помощь", "безопасность"],
    emergency: true,
  },
  {
    title: "Телефон доверия для детей и подростков",
    description: "8-800-2000-122 — анонимно, бесплатно, круглосуточно по всей России.",
    url: "tel:88002000122",
    tags: ["экстренное", "телефон доверия", "подросткам", "анонимно"],
    emergency: true,
  },
  {
    title: "Помощь рядом",
    description: "Психологическая поддержка для детей и подростков онлайн — чат с психологом.",
    url: "https://pomoschryadom.ru/",
    tags: ["психолог", "чат", "подросткам", "анонимно", "онлайн"],
  },
  {
    title: "Твоя территория (1221.chat)",
    description: "Онлайн-консультации психологов для подростков в чате — анонимно и бесплатно.",
    url: "https://1221.chat/",
    tags: ["психолог", "чат", "подросткам", "анонимно", "онлайн"],
  },
  {
    title: "Подростковая гостиная",
    description: "Безопасное пространство, где можно поговорить, побыть с собой и встретить других.",
    url: "https://podrostkovaya-gostinaya.ru/",
    tags: ["сообщество", "подросткам", "встречи", "поддержка"],
  },
  {
    title: "Classgames",
    description: "Игры и активности для подростков — про общение, эмоции и взаимодействие в группе.",
    url: "https://classgames.ru/",
    tags: ["игры", "подросткам", "общение", "эмоции"],
  },
];

const UsefulLinks = () => {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    links.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const [active, setActive] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActive((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const filtered = active.length === 0 ? links : links.filter((l) => active.every((t) => l.tags.includes(t)));

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/40">
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
            Полезные ссылки
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className="relative mt-4 max-w-xl text-base md:text-lg text-muted-foreground">
            Здесь собраны телефоны экстренных служб и проверенные сервисы, где можно получить поддержку.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="relative mt-6 flex flex-wrap justify-center gap-2 max-w-3xl">
            {allTags.map((t) => {
              const isActive = active.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`inline-block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              );
            })}
            {active.length > 0 && (
              <button
                onClick={() => setActive([])}
                className="inline-block rounded-full px-3.5 py-1.5 text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                сбросить
              </button>
            )}
          </div>
        </ScrollReveal>
      </section>

      <section className="px-4 pb-16 max-w-5xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">Ничего не нашли по выбранным тегам.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((l, i) => (
              <ScrollReveal key={l.title} delay={i * 60}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group block h-full rounded-2xl border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                    l.emergency ? "border-destructive/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`rounded-xl p-2.5 ${
                        l.emergency ? "bg-destructive/10" : "bg-primary/10"
                      }`}
                    >
                      {l.emergency ? (
                        <LifeBuoy className="text-destructive" size={20} />
                      ) : (
                        <LinkIcon className="text-primary" size={20} />
                      )}
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {l.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{l.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {l.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
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

export default UsefulLinks;
