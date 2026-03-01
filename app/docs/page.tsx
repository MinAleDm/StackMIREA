import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MobileDocsMenu } from "@/components/layout/MobileDocsMenu";
import { getSidebarGroups } from "@/lib/navigation";

export const dynamic = "force-static";

export default function DocsIndexPage() {
  const groups = getSidebarGroups();

  return (
    <>
      <MobileDocsMenu groups={groups} currentPath="/docs" />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Documentation</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Structured tracks for Python, Java, and algorithms with scalable static architecture.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.id} className="rounded-xl border border-border/80 bg-card/70 p-5">
              <h2 className="mb-4 text-lg font-medium">{group.title}</h2>
              <ul className="space-y-2">
                {group.items.slice(0, 7).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowRight className="size-3.5" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
