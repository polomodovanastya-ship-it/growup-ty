import { Link } from "react-router-dom";
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
  Link as LinkIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import logo from "@/assets/logo.png";

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

const HelpNearby = () => (
  <main className="min-h-screen bg-background">
    <header className="px-4 pt-6 pb-2 max-w-5xl mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={16} />
        На главную
      </Link>
      <img src={logo} alt="как ты" className="h-8 w-auto select-none" draggable={false} />
    </header>

    {/* Emergency */}
    <section className="px-4 pt-4 pb-8 max-w-5xl mx-auto">
      <ScrollReveal>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-2">Помощь рядом</h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl">
          Если чувствуешь, что можешь причинить себе вред прямо сейчас — звони в экстренную службу.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-6 rounded-[2rem] border border-destructive/40 bg-destructive/10 p-6 md:p-10 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2">Россия и страны ЕС</p>
          <p className="text-6xl md:text-8xl font-bold text-destructive leading-none">112</p>
          <p className="mt-2 text-base md:text-lg text-foreground">экстренная помощь</p>
          <a
            href="tel:112"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-destructive text-destructive-foreground px-8 py-4 text-base md:text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Phone size={20} /> Позвонить 112
          </a>
        </div>
      </ScrollReveal>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ScrollReveal>
          <div className="h-full rounded-3xl border bg-card p-6">
            <h2 className="font-bold text-lg text-foreground mb-1">Детский телефон доверия — Россия</h2>
            <p className="text-2xl font-bold text-primary">8 800 2000 122</p>
            <p className="text-sm text-muted-foreground">124 — с мобильного</p>
            <p className="mt-2 text-sm text-muted-foreground">Бесплатно. Анонимно. Круглосуточно.</p>
            <a
              href="tel:88002000122"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Phone size={15} /> Позвонить
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <div className="h-full rounded-3xl border bg-card p-6">
            <h2 className="font-bold text-lg text-foreground mb-1">Другая страна</h2>
            <p className="text-sm text-muted-foreground">Найди телефон или чат помощи в своей стране.</p>
            <a
              href="https://findahelpline.com/ru-RU"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Globe size={15} /> Найти помощь <ArrowRight size={14} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Если очень тяжело */}
    <section className="px-4 pb-8 max-w-5xl mx-auto">
      <ScrollReveal>
        <div className="rounded-3xl tint-coral border p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold tint-coral-ink mb-3">Если очень тяжело</h2>
          <div className="space-y-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>Если кажется, что выхода нет, или ты не справляешься — это состояние может измениться.</p>
            <p className="text-foreground font-medium">Сейчас важно выйти на связь с человеком.</p>
            <p>Это может быть родитель, родственник, психолог, учитель, тренер, врач или другой взрослый.</p>
            <p>Скажи или напиши:</p>
            <p className="text-foreground font-semibold">«Мне очень плохо. Мне нужна помощь сейчас. Побудь со мной, пожалуйста».</p>
            <p>Трудно говорить — отправь сообщение или покажи эту страницу.</p>
            <p className="text-foreground font-medium">Если есть мысли о самоубийстве, скажи прямо:</p>
            <p className="text-foreground font-semibold">«У меня мысли о самоубийстве. Мне нужна помощь сейчас».</p>
            <p className="text-foreground font-medium">Написать другу:</p>
            <p className="text-foreground font-semibold">«Мне нужна помощь сейчас. Помоги мне связаться со взрослым».</p>
            <p>Нет ответа — выбери следующий контакт. Продолжай, пока не свяжешься с человеком или службой.</p>
          </div>
        </div>
      </ScrollReveal>
    </section>

    {/* Пока ждёшь */}
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

    {/* Поговорить с психологом */}
    <section className="px-4 pb-8 max-w-5xl mx-auto">
      <ScrollReveal>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
          <MessageCircle className="text-primary" size={22} /> Поговорить с психологом
        </h2>
        <p className="text-sm text-muted-foreground mb-4">Если экстренная помощь не нужна — напиши психологу.</p>
      </ScrollReveal>
      <div className="grid gap-4 md:grid-cols-2">
        <ScrollReveal>
          <div className="h-full flex flex-col rounded-3xl border bg-card p-6">
            <h3 className="font-bold text-lg text-foreground mb-1">Твоя территория</h3>
            <p className="text-sm text-muted-foreground">Психологическая помощь подросткам и молодёжи.</p>
            <p className="mt-2 text-sm font-medium text-foreground">Ежедневно, 15:00–22:00 МСК</p>
            <a
              href="https://www.твоя-территория.онлайн/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto pt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={15} /> Написать психологу
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <div className="h-full flex flex-col rounded-3xl border bg-card p-6">
            <h3 className="font-bold text-lg text-foreground mb-1">1221.chat</h3>
            <p className="text-sm text-muted-foreground">Психологическая помощь подросткам и молодым людям 12–21 года. Бесплатно. Анонимно.</p>
            <p className="mt-2 text-sm font-medium text-foreground">Ежедневно, 14:00–21:30 МСК</p>
            <a
              href="https://1221.chat/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={15} /> Написать психологу
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Как помочь другу */}
    <section id="friend" className="px-4 pb-8 max-w-5xl mx-auto scroll-mt-20">
      <ScrollReveal>
        <div className="rounded-3xl tint-violet border p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold tint-violet-ink mb-3 flex items-center gap-2">
            <Users size={22} /> Как помочь другу
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-5">
            Если друг говорит, что ему очень плохо, что он не хочет жить или думает о самоубийстве — отнесись к этому серьёзно.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Останься на связи</h3>
              <p className="text-sm text-muted-foreground">Выслушай. Не торопи. Не спорь. Скажи: «Я тебя слышу». «Спасибо, что сказал мне». «Давай найдём взрослого, который сможет помочь».</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Спроси прямо</h3>
              <p className="text-sm text-muted-foreground">«Ты думаешь о самоубийстве?» Такой вопрос не подталкивает человека к самоубийству. Он помогает начать честный разговор.</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Подключи взрослого</h3>
              <p className="text-sm text-muted-foreground">Обратись к взрослому, которому доверяешь. Даже если друг просит никому не рассказывать, не оставайся с этим один. Можно сказать: «Ты мне важен. Поэтому я хочу позвать взрослого, который сможет помочь».</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Что лучше не говорить</h3>
              <p className="text-sm text-muted-foreground">Не обесценивай: «У всех бывает». Не спорь: «Но у тебя же всё хорошо». Не дави чувством вины: «Подумай, что будет с родителями». Не обещай хранить это в секрете.</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-foreground font-medium">
            Если опасность прямо сейчас — зови взрослого и обращайся в экстренную службу. Россия и страны ЕС — 112.
          </p>
        </div>
      </ScrollReveal>
    </section>

    {/* Родителям */}
    <section id="parents" className="px-4 pb-8 max-w-5xl mx-auto scroll-mt-20">
      <ScrollReveal>
        <div className="rounded-3xl tint-amber border p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold tint-amber-ink mb-3 flex items-center gap-2">
            <Heart size={22} /> Родителям
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-5">
            Если ребёнок говорит, что не хочет жить или думает о самоубийстве — отнеситесь к его словам серьёзно.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Сначала выслушайте</h3>
              <p className="text-sm text-muted-foreground">Остановитесь. Дайте ребёнку говорить. «Спасибо, что сказал мне». «Я хочу понять, что с тобой происходит». «Я рядом. Давай вместе найдём помощь». Не спешите объяснять, убеждать или искать решение.</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Спросите прямо</h3>
              <p className="text-sm text-muted-foreground">«У тебя сейчас есть мысли о самоубийстве?» Прямой вопрос не повышает риск и не «вкладывает эту мысль в голову». Он помогает понять, насколько срочно нужна помощь.</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Что лучше не говорить</h3>
              <p className="text-sm text-muted-foreground">«Ты же не сделаешь глупость?», «У тебя нет причин так себя чувствовать», «Другим гораздо хуже», «Подумай, что ты делаешь с нами». Не спорьте с чувствами ребёнка и не пытайтесь вызвать чувство вины.</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5">
              <h3 className="font-semibold text-foreground mb-2">Подключите специалиста</h3>
              <p className="text-sm text-muted-foreground">Помогите ребёнку связаться с психологом, психиатром, врачом или кризисной службой. Не ждите, что подросток сам организует эту помощь.</p>
            </div>
            <div className="rounded-2xl bg-card/70 p-5 md:col-span-2">
              <h3 className="font-semibold text-foreground mb-2">После разговора</h3>
              <p className="text-sm text-muted-foreground">Вернитесь к нему позже. Спросите: «Как ты сейчас?», «Удалось ли тебе поговорить со специалистом?». Продолжайте оставаться на связи, даже если острая ситуация прошла.</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-foreground font-medium">
            Если опасность прямо сейчас — оставайтесь рядом с ребёнком и звоните 112.
          </p>
        </div>
      </ScrollReveal>
    </section>

    {/* Полезные ресурсы */}
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
                <div className={`-mx-4 mb-3 h-16 overflow-hidden flex items-center justify-center ${l.emergency ? "bg-destructive/10" : "bg-primary/10"}`}>
                  {l.emergency ? (
                    <Phone className="text-destructive transition-transform duration-500 group-hover:scale-110" size={26} strokeWidth={1.5} />
                  ) : favicon ? (
                    <img src={favicon} alt="" className="w-8 h-8 rounded-lg transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
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

export default HelpNearby;
