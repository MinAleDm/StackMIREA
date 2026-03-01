import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const dynamic = "force-static";

const tracks = [
  { title: "Python", href: "/docs/python", variant: "default" as const },
  { title: "Java", href: "/docs/java", variant: "secondary" as const },
  { title: "Algorithms", href: "/docs/algorithms", variant: "ghost" as const }
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-20 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl text-center">
        <p className="inline-flex animate-fade-up rounded-full border border-border/80 bg-card/70 px-3 py-1 text-xs text-muted-foreground">
          Static-first documentation platform
        </p>
        <h1
          className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground opacity-0 sm:text-6xl"
          style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "120ms" }}
        >
          Practice Make Perfect
          <br />
          Engineering Docs
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground opacity-0 sm:text-lg"
          style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "240ms" }}
        >
          Production-grade docs platform with MDX, Shiki highlighting and fully static export for GitHub Pages.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
          style={{ animation: "fade-up 720ms ease-out forwards", animationDelay: "340ms" }}
        >
          {tracks.map((track) => (
            <Link key={track.title} href={track.href} className="w-full sm:w-auto">
              <Button variant={track.variant} className="w-full sm:w-auto">
                {track.title}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
