import Link from "next/link";
import { ArrowRight, Bot, Brain, Code2, Database, Sigma } from "lucide-react";

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
            Учебные материалы StackMIREA: отдельные треки Python, AI, BigData, Java и Algorithms. Каждая страница
            оформлена как техническая документация с кодом, разбором и привязкой к исходникам.
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
              href="/docs/python"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-border/80 bg-background/70 sm:w-auto")}
            >
              Python трек
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {tracks.map((track, index) => {
          const Icon = track.icon;
          return (
            <Link
              key={track.title}
              href={track.href}
              className="group rounded-2xl border border-border/70 bg-card/70 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
              style={{ animation: "fade-up 660ms ease-out forwards", animationDelay: `${120 + index * 100}ms` }}
            >
              <div className="mb-4 inline-flex rounded-lg border border-border/70 bg-background/70 p-2 text-muted-foreground transition-colors group-hover:text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">{track.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{track.subtitle}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
                Перейти
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
