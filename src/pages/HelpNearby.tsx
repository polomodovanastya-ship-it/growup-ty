import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Globe,
  Heart,
  Users,
  LifeBuoy,
  Wind,
  HandHeart,
  Link as LinkIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const faviconFor = (url: string) => {
  try {
    const u = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${u.hostname}`;
  } catch {
    return null;
  }
};

type HelpLink = {
  title: string;
  description: string;
  url: string;
  emergency?: boolean;
};

type Audience = "self" | "friend" | "parent";

const AUDIENCES: {
  id: Audience;
  title: string;
  description: string;
  icon: typeof HandHeart;
  tint: string;
  targetId: string;
}[] = [
  {
    id: "self",
    title: "Мне сейчас тяжело",
    description: "Что сделать, если плохо тебе",
    icon: HandHeart,
    tint: "tint-coral",
    targetId: "self",
  },
  {
    id: "friend",
    title: "Помочь другу",
    description: "Если другу очень плохо",
    icon: Users,
    tint: "tint-violet",
    targetId: "friend",
  },
  {
    id: "parent",
    title: "Я родитель",
    description: "Если тяжело ребёнку",
    icon: Heart,
    tint: "tint-amber",
    targetId: "parents",
  },
];

const helpLinks: HelpLink[] = [
  {
    title: "112 — единый номер экстренных служб",
    description: "Бесплатно, с любого телефона, даже без сим-карты.",
    url: "tel:112",
    emergency: true,
  },
  {
    title: "Телефон доверия для детей и подростков",
    description: "8-800-2000-122 — анонимно, бесплатно, круглосуточно по всей России.",
    url: "tel:88002000122",
    emergency: true,
  },
  {
    title: "Помощь рядом",
    description: "Психологическая поддержка для подростков онлайн — чат с психологом.",
    url: "https://pomoschryadom.ru/",
  },
  {
    title: "Твоя территория (1221.chat)",
    description: "Онлайн-консультации психологов в чате — анонимно и бесплатно.",
    url: "https://1221.chat/",
  },
  {
    title: "Подростковая гостиная Благосфера",
    description: "Безопасное пространство для подростков: общение, поддержка и досуг.",
    url: "https://blagosfera.ru/podrostkovaja-gostinaja/",
  },
  {
    title: "Classgames",
    description: "Игры и активности про общение, эмоции и взаимодействие в группе.",
    url: "https://classgames.ru/",
  },
  {
    title: "Верим тебе",
    description: "Платформа поддержки подростков: консультации, чаты, онлайн-помощь.",
    url: "https://teen.verimtebe.ru/",
  },
  {
    title: "Тебе поверят",
    description: "Бесплатная психологическая и юридическая помощь при сексуализированном насилии.",
    url: "https://tebepoveryat.ru/",
  },
];

function audienceFromHash(hash: string): Audience | null {
  const id = hash.replace(/^#/, "");
  if (id === "self" || id === "friend" || id === "parents" || id === "parent") {
    return id === "parents" ? "parent" : id === "parent" ? "parent" : id;
  }
  return null;
}

const HelpNearby = () => {
  const location = useLocation();
  const [audience, setAudience] = useState<Audience | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = audienceFromHash(location.hash);
    if (fromHash) setAudience(fromHash);
  }, [location.hash]);

  const selectAudience = useCallback((next: Audience, targetId: string) => {
    setAudience(next);
    const hash = `#${targetId}`;
    window.history.replaceState(null, "", hash);
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setFlashId(targetId);
        window.setTimeout(() => setFlashId((cur) => (cur === targetId ? null : cur)), 1600);
      }
    });
  }, []);

  const soft = (ids: Audience[]) => {
    if (!audience) return "opacity-100";
    return ids.includes(audience)
      ? "opacity-100 transition-opacity duration-300"
      : "opacity-40 transition-opacity duration-300";
  };

  const flashRing = (id: string) =>
    flashId === id ? "ring-2 ring-primary/40 ring-offset-2 ring-offset-background" : "";

  return (
    <main className="min-h-screen bg-background">
      <header className="px-4 pt-6 pb-2 max-w-5xl mx-auto flex items-center justify-between">
        <Seo
          title="Помощь рядом — куда обратиться за поддержкой — Как ты?"
          description="Экстренные службы, телефоны доверия и бесплатные чаты с психологом для подростков, друзей и родителей."
          path="/help"
        />
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          На главную
        </Link>
        <img src={logo} alt="как ты" className="h-8 w-auto select-none" draggable={false} />
      </header>

      {/* Emergency — всегда видно */}
      <section className="px-4 pt-4 pb-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">Помощь рядом</h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl">
            Если чувствуешь, что можешь причинить себе вред прямо сейчас — звони в экстренную службу.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
            <div className="h-full rounded-2xl md:rounded-3xl border border-destructive/40 bg-destructive/10 p-4 md:p-5 flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-destructive leading-tight tracking-tight">112</h2>
              <p className="mt-2 text-sm text-muted-foreground">Экстренная помощь. Бесплатно</p>
              <div className="mt-auto pt-5">
                <a
                  href="tel:112"
                  className="inline-flex w-full sm:w-auto h-9 items-center justify-center gap-2 rounded-full bg-destructive text-destructive-foreground px-5 text-sm font-semibold shadow-md hover:opacity-90 transition-opacity"
                >
                  <Phone size={15} className="shrink-0" />
                  <span>Позвонить</span>
                </a>
              </div>
            </div>

            <div className="h-full rounded-2xl md:rounded-3xl border bg-card p-4 md:p-5 flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">124</h2>
              <p className="mt-1.5 text-base font-semibold text-primary">8 800 2000 122</p>
              <p className="mt-2 text-sm text-muted-foreground">Служба доверия. Анонимно. Бесплатно.</p>
              <div className="mt-auto pt-5">
                <a
                  href="tel:88002000122"
                  className="inline-flex w-full sm:w-auto h-9 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Phone size={15} className="shrink-0" />
                  <span>Позвонить</span>
                </a>
              </div>
            </div>

            <div className="h-full rounded-2xl md:rounded-3xl border bg-card p-4 md:p-5 flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight tracking-tight">Другая страна</h2>
              <p className="mt-2 text-sm text-muted-foreground flex-1">Поиск помощи в другой стране</p>
              <div className="mt-auto pt-5">
                <a
                  href="https://findahelpline.com/ru-RU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto h-9 items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Globe size={15} className="shrink-0" />
                  <span>Найти помощь</span>
                  <ArrowRight size={14} className="shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Выбор аудитории */}
      <section className="px-4 pb-8 max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Кому нужна помощь?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Выбери свой путь — мы подсветим нужный блок. Остальное останется на странице, просто чуть спокойнее.
          </p>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
            {AUDIENCES.map((a) => {
              const Icon = a.icon;
              const active = audience === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => selectAudience(a.id, a.targetId)}
                  className={cn(
                    "group text-left rounded-2xl md:rounded-3xl border p-4 md:p-5 transition-all duration-300",
                    a.tint,
                    active
                      ? "ring-2 ring-foreground/15 shadow-md scale-[1.01]"
                      : "hover:shadow-md hover:scale-[1.01] opacity-90 hover:opacity-100",
                  )}
                  aria-pressed={active}
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-xl bg-card/70 p-2.5 shrink-0">
                      <Icon size={20} className="text-foreground" />
                    </span>
                    <span>
                      <span className="block font-semibold text-foreground leading-snug">{a.title}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{a.description}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          {audience && (
            <button
              type="button"
              onClick={() => {
                setAudience(null);
                window.history.replaceState(null, "", window.location.pathname);
              }}
              className="mt-3 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Сбросить выбор — показать всё одинаково
            </button>
          )}
        </ScrollReveal>
      </section>

      {/* Маршрут: себе */}
      <div
        id="self"
        className={cn("scroll-mt-20 space-y-0", soft(["self"]), flashRing("self") && "rounded-3xl")}
      >
        <section className="px-4 pb-8 max-w-5xl mx-auto">
          <ScrollReveal>
            <div
              className={cn(
                "rounded-3xl tint-coral border p-6 md:p-8 transition-shadow duration-500",
                flashRing("self"),
              )}
            >
              <h2 className="text-xl md:text-2xl font-bold tint-coral-ink mb-3">Если очень тяжело</h2>
              <p className="text-sm md:text-base text-muted-foreground mb-5">
                Если кажется, что выхода нет, или ты не справляешься — это состояние может измениться. Сейчас важен один шаг: выйти на связь с человеком.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-card/70 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Выйди на связь</h3>
                  <p className="text-sm text-muted-foreground">
                    Это может быть родитель, родственник, психолог, учитель, тренер, врач или другой взрослый, которому ты доверяешь.
                  </p>
                </div>
                <div className="rounded-2xl bg-card/70 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Скажи или напиши</h3>
                  <p className="text-sm text-muted-foreground mb-2">Можно просто отправить сообщение или показать эту страницу:</p>
                  <p className="text-sm text-foreground font-semibold">
                    «Мне очень плохо. Мне нужна помощь сейчас. Побудь со мной, пожалуйста».
                  </p>
                </div>
                <div className="rounded-2xl bg-card/70 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Если мысли о самоубийстве</h3>
                  <p className="text-sm text-muted-foreground mb-2">Скажи прямо:</p>
                  <p className="text-sm text-foreground font-semibold">
                    «У меня мысли о самоубийстве. Мне нужна помощь сейчас».
                  </p>
                </div>
                <div className="rounded-2xl bg-card/70 p-5">
                  <h3 className="font-semibold text-foreground mb-2">Напиши другу</h3>
                  <p className="text-sm text-muted-foreground mb-2">Если легче обратиться к другу:</p>
                  <p className="text-sm text-foreground font-semibold mb-2">
                    «Мне нужна помощь сейчас. Помоги мне связаться со взрослым».
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Нет ответа — выбери следующий контакт. Продолжай, пока не свяжешься с человеком или службой.
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-foreground font-medium">
                Если опасность прямо сейчас — звони в экстренную службу. Россия и страны ЕС — 112.
              </p>
            </div>
          </ScrollReveal>
        </section>

        <section className="px-4 pb-8 max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl tint-teal border p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold tint-teal-ink mb-4 flex items-center gap-2">
                <Wind size={22} /> Пока ждёшь ответа
              </h2>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground leading-relaxed list-disc pl-5">
                <li>Поставь обе ступни на пол. Почувствуй опору.</li>
                <li>Посмотри вокруг. Назови пять вещей рядом с собой.</li>
                <li>Сделай спокойный вдох через нос.</li>
                <li>Медленно выдохни через рот, как будто дуешь через трубочку.</li>
              </ul>
              <p className="mt-4 text-foreground font-medium">Повтори несколько раз. Сейчас нужен один шаг — выйти на связь.</p>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Общее: психологи — всегда ярко */}
      <section id="psychologists" className="px-4 pb-8 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <MessageCircle className="text-primary" size={22} /> Поговорить с психологом
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Если экстренная помощь не нужна — напиши психологу.</p>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-2">
          <ScrollReveal className="h-full">
            <div className="h-full rounded-3xl border bg-card px-6 pt-6 pb-4 flex flex-col">
              <h3 className="font-bold text-lg text-foreground mb-1">Твоя территория</h3>
              <p className="text-sm text-muted-foreground">Психологическая помощь подросткам и молодёжи.</p>
              <p className="mt-2 text-sm font-medium text-foreground">Ежедневно, 15:00–22:00 МСК</p>
              <a
                href="https://www.твоя-территория.онлайн/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={15} /> Написать психологу
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} className="h-full">
            <div className="h-full rounded-3xl border bg-card px-6 pt-6 pb-4 flex flex-col">
              <h3 className="font-bold text-lg text-foreground mb-1">1221.chat</h3>
              <p className="text-sm text-muted-foreground">Психологическая помощь с 12 до 21 года. Бесплатно. Анонимно.</p>
              <p className="mt-2 text-sm font-medium text-foreground">Ежедневно, 14:00–21:30 МСК</p>
              <a
                href="https://1221.chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={15} /> Написать психологу
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Другу */}
      <section id="friend" className={cn("px-4 pb-8 max-w-5xl mx-auto scroll-mt-20", soft(["friend"]))}>
        <ScrollReveal>
          <div
            className={cn(
              "rounded-3xl tint-violet border p-6 md:p-8 transition-shadow duration-500",
              flashRing("friend"),
            )}
          >
            <h2 className="text-xl md:text-2xl font-bold tint-violet-ink mb-3 flex items-center gap-2">
              <Users size={22} /> Как помочь другу
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5">
              Если друг говорит, что ему очень плохо, что он не хочет жить или думает о самоубийстве — отнесись к этому серьёзно.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Останься на связи</h3>
                <p className="text-sm text-muted-foreground">
                  Выслушай. Не торопи. Не спорь. Скажи: «Я тебя слышу». «Спасибо, что сказал мне». «Давай найдём взрослого, который сможет помочь».
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Спроси прямо</h3>
                <p className="text-sm text-muted-foreground">
                  «Ты думаешь о самоубийстве?» Такой вопрос не подталкивает человека к самоубийству. Он помогает начать честный разговор.
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Подключи взрослого</h3>
                <p className="text-sm text-muted-foreground">
                  Обратись к взрослому, которому доверяешь. Даже если друг просит никому не рассказывать, не оставайся с этим один. Можно сказать: «Ты мне важен. Поэтому я хочу позвать взрослого, который сможет помочь».
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Что лучше не говорить</h3>
                <p className="text-sm text-muted-foreground">
                  Не обесценивай: «У всех бывает». Не спорь: «Но у тебя же всё хорошо». Не дави чувством вины: «Подумай, что будет с родителями». Не обещай хранить это в секрете.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-foreground font-medium">
              Если опасность прямо сейчас — зови взрослого и обращайся в экстренную службу. Россия и страны ЕС — 112.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Родителям */}
      <section id="parents" className={cn("px-4 pb-8 max-w-5xl mx-auto scroll-mt-20", soft(["parent"]))}>
        <ScrollReveal>
          <div
            className={cn(
              "rounded-3xl tint-amber border p-6 md:p-8 transition-shadow duration-500",
              flashRing("parents"),
            )}
          >
            <h2 className="text-xl md:text-2xl font-bold tint-amber-ink mb-3 flex items-center gap-2">
              <Heart size={22} /> Родителям
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-5">
              Если ребёнок говорит, что не хочет жить или думает о самоубийстве — отнеситесь к его словам серьёзно.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Сначала выслушайте</h3>
                <p className="text-sm text-muted-foreground">
                  Остановитесь. Дайте ребёнку говорить. «Спасибо, что сказал мне». «Я хочу понять, что с тобой происходит». «Я рядом. Давай вместе найдём помощь». Не спешите объяснять, убеждать или искать решение.
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Спросите прямо</h3>
                <p className="text-sm text-muted-foreground">
                  «У тебя сейчас есть мысли о самоубийстве?» Прямой вопрос не повышает риск и не «вкладывает эту мысль в голову». Он помогает понять, насколько срочно нужна помощь.
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Что лучше не говорить</h3>
                <p className="text-sm text-muted-foreground">
                  «Ты же не сделаешь глупость?», «У тебя нет причин так себя чувствовать», «Другим гораздо хуже», «Подумай, что ты делаешь с нами». Не спорьте с чувствами ребёнка и не пытайтесь вызвать чувство вины.
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5">
                <h3 className="font-semibold text-foreground mb-2">Подключите специалиста</h3>
                <p className="text-sm text-muted-foreground">
                  Помогите ребёнку связаться с психологом, психиатром, врачом или кризисной службой. Не ждите, что подросток сам организует эту помощь.
                </p>
              </div>
              <div className="rounded-2xl bg-card/70 p-5 md:col-span-2">
                <h3 className="font-semibold text-foreground mb-2">После разговора</h3>
                <p className="text-sm text-muted-foreground">
                  Вернитесь к нему позже. Спросите: «Как ты сейчас?», «Удалось ли тебе поговорить со специалистом?». Продолжайте оставаться на связи, даже если острая ситуация прошла.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm text-foreground font-medium">
              Если опасность прямо сейчас — оставайтесь рядом с ребёнком и звоните 112.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Ресурсы — всегда */}
      <section id="resources" className="px-4 pb-16 max-w-5xl mx-auto scroll-mt-20">
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-1">
            <LifeBuoy className="text-primary" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Полезные ресурсы</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Материалы, подростковые пространства и другие проекты.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpLinks.map((l, i) => {
            const favicon = l.url.startsWith("http") ? faviconFor(l.url) : null;
            return (
              <ScrollReveal key={l.title} delay={i * 60}>
                <a
                  href={l.url}
                  target={l.url.startsWith("http") ? "_blank" : undefined}
                  rel={l.url.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`group rounded-2xl border bg-card p-4 pt-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] h-full flex flex-col ${
                    l.emergency ? "border-destructive/40" : ""
                  }`}
                >
                  <div
                    className={`-mx-4 mb-3 h-16 overflow-hidden flex items-center justify-center ${
                      l.emergency ? "bg-destructive/10" : "bg-primary/10"
                    }`}
                  >
                    {l.emergency ? (
                      <Phone className="text-destructive transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    ) : favicon ? (
                      <img
                        src={favicon}
                        alt=""
                        className="w-8 h-8 rounded-lg transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <LinkIcon className="text-primary transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{l.title}</h3>
                  <p className="text-xs text-muted-foreground">{l.description}</p>
                  <div className="mt-auto">
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
                      {l.url.startsWith("http") ? "Открыть сайт" : "Позвонить"} <ArrowRight size={12} />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="mt-10 text-center text-base text-muted-foreground">Ты не один(а). Мы рядом, когда тебе нужно.</p>
        </ScrollReveal>
      </section>
    </main>
  );
};

export default HelpNearby;
