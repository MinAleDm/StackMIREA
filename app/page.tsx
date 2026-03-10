import Link from "next/link";
import { ArrowRight, Bot, Brain, Code2, Database, ExternalLink, GitPullRequest, ListChecks, Sigma, Users } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

const tracks = [
  // Keep cards in the same order as sidebar section ordering for predictable navigation.
  {
    title: "Python",
    subtitle: "Практики по OOP, тестированию и функциональному стилю",
    href: "/docs/python",
    icon: Code2
  },
  {
    title: "AI",
    subtitle: "Ноутбуки Notebook1..Notebook8 по курсу ИИ",
    href: "/docs/ai",
    icon: Bot
  },
  {
    title: "BigData",
    subtitle: "Практики по анализу данных, классификации и кластеризации",
    href: "/docs/bigdata",
    icon: Database
  },
  {
    title: "Java",
    subtitle: "24 практики по ООП, коллекциям, MVC и паттернам",
    href: "/docs/java",
    icon: Brain
  },
  {
    title: "Algorithms",
    subtitle: "Методические материалы и структурированные разборы",
    href: "/docs/algorithms",
    icon: Sigma
  },
  {
    title: "Процедурное программирование",
    subtitle: "Базовые конструкции, декомпозиция и процедурный стиль",
    href: "/docs/procedural-programming",
    icon: Code2
  },
  {
    title: "Объектно ориентированное программирование",
    subtitle: "Классы, инкапсуляция, наследование и полиморфизм",
    href: "/docs/object-oriented-programming",
    icon: Brain
  },
  {
    title: "Структуры и алгоритмы обработки данных (часть 1)",
    subtitle: "Введение в структуры данных и базовые алгоритмы",
    href: "/docs/data-structures-and-algorithms-part-1",
    icon: Sigma
  },
  {
    title: "React",
    subtitle: "Компонентная разработка и построение интерфейсов",
    href: "/docs/react",
    icon: Bot
  },
  {
    title: "Структуры и алгоритмы обработки данных (часть 2)",
    subtitle: "Продвинутые алгоритмы и анализ производительности",
    href: "/docs/data-structures-and-algorithms-part-2",
    icon: Sigma
  },
  {
    title: "Конфигурационное управление",
    subtitle: "Версионирование, окружения и управление изменениями",
    href: "/docs/configuration-management",
    icon: GitPullRequest
  },
  {
    title: "Анализ и концептуальное моделирование систем (часть 1)",
    subtitle: "Системный анализ, требования и концептуальные модели",
    href: "/docs/systems-analysis-and-conceptual-modeling-part-1",
    icon: Database
  },
  {
    title: "Технология разработки программных приложений (часть 1)",
    subtitle: "Процессы, паттерны и практики разработки приложений",
    href: "/docs/software-application-development-part-1",
    icon: Code2
  },
  {
    title: "Интернет вещей",
    subtitle: "IoT-архитектуры, обмен данными и интеграции устройств",
    href: "/docs/internet-of-things",
    icon: Bot
  },
  {
    title: "Моделирование бизнес процессов",
    subtitle: "Модели процессов, роли, события и оптимизация",
    href: "/docs/business-process-modeling",
    icon: Database
  },
  {
    title: "Разработка баз данных",
    subtitle: "Проектирование схем, SQL и практика работы с БД",
    href: "/docs/database-development",
    icon: Database
  },
  {
    title: "Тестирование и верификация ПО",
    subtitle: "Unit/Integration тестирование и контроль качества",
    href: "/docs/software-testing-and-verification",
    icon: ListChecks
  },
  {
    title: "Системное администрирование",
    subtitle: "Серверы, сервисы, сети и эксплуатация инфраструктуры",
    href: "/docs/system-administration",
    icon: Brain
  },
  {
    title: "Управление проектами",
    subtitle: "Планирование, сроки, риски и командные процессы",
    href: "/docs/project-management",
    icon: GitPullRequest
  }
];

const publicationRules = [
  {
    title: "Публикуй материал в нужный трек",
    description: "Размещай файл в соответствующем разделе документации и соблюдай структуру текущего трека."
  },
  {
    title: "Соблюдай единый формат",
    description: "Используй понятную структуру: цель, шаги решения, код, результат и краткие выводы."
  },
  {
    title: "Оформляй кодовые примеры",
    description: "Добавляй язык в код-блоки и оставляй только воспроизводимые, проверенные фрагменты."
  },
  {
    title: "Фиксируй контекст и источники",
    description: "Если материал опирается на внешние источники, обязательно оставляй ссылки и пояснения."
  },
  {
    title: "Проверяй изменения перед PR",
    description: "Перед публикацией запускай `npm run lint` и `npm run typecheck`, чтобы не ломать сборку."
  }
];

const pullRequestLinks = [
  {
    title: "Создать Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/compare?expand=1",
    description: "Откроет форму сравнения веток и создания PR для публикации."
  },
  {
    title: "Все Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/pulls",
    description: "Список открытых и закрытых PR по проекту."
  },
  {
    title: "Открытые Pull Request",
    href: "https://github.com/MinAleDm/StackMIREA/pulls?q=is%3Apr+is%3Aopen",
    description: "Быстрый фильтр для проверки, что уже находится на ревью."
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-14 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/65 px-6 py-14 sm:px-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Brain className="size-3.5" />
            StackMIREA documentation hub
          </p>

          <h1
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground opacity-0 sm:text-6xl"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "120ms" }}
          >
            Практики и ноутбуки
            <br />
            в едином формате docs
          </h1>

          <p
            className="mt-6 max-w-3xl text-pretty text-base leading-7 text-muted-foreground opacity-0 sm:text-lg"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "220ms" }}
          >
            Учебные материалы StackMIREA по ключевым IT-дисциплинам. Каждая страница оформлена как техническая
            документация с кодом, разбором и привязкой к исходникам.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row"
            style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "320ms" }}
          >
            <Link href="/docs" className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
              Открыть документацию
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/authors"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-border/80 bg-background/70 sm:w-auto")}
            >
              <Users className="size-4" />
              Авторы
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {tracks.map((track, index) => {
          const Icon = track.icon;
          return (
            <Link
              key={track.title}
              href={track.href}
              className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card sm:p-5"
              style={{ animation: "fade-up 660ms ease-out forwards", animationDelay: `${120 + index * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-border/70 bg-background/70 p-2 text-muted-foreground transition-colors group-hover:text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-base font-semibold leading-snug tracking-tight break-words">{track.title}</h2>
              <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">{track.subtitle}</p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                Перейти
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          );
        })}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <ListChecks className="size-3.5" />
            Правила публикации
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Как публиковать материалы в StackMIREA</h2>
          <ol className="mt-5 space-y-4">
            {publicationRules.map((rule, index) => (
              <li key={rule.title} className="flex gap-3 rounded-xl border border-border/70 bg-background/60 p-4">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{rule.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{rule.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-2xl border border-border/70 bg-card/70 p-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <GitPullRequest className="size-3.5" />
            Публикация через PR
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Ссылки на Pull Request</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Для публикации открывай PR с изменениями в документации. В описании укажи, что именно добавлено и в каком
            треке лежит материал.
          </p>

          <div className="mt-5 space-y-3">
            {pullRequestLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-background/60 p-4 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                </span>
                <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
