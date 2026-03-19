import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MobileDocsMenu } from "@/components/layout/MobileDocsMenu";
import { getBuildInfo } from "@/lib/build-info";
import { getSidebarGroups } from "@/lib/navigation";

export const dynamic = "force-static";

export default function DocsIndexPage() {
  const buildInfo = getBuildInfo();
  const groups = getSidebarGroups();

  return (
    <>
      <MobileDocsMenu buildInfo={buildInfo} groups={groups} currentPath="/docs" />

      <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">StackMIREA Docs - актуальные треки</h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Структурированные треки по основным ИТ-дисциплинам с масштабируемой архитектурой статической документации.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.id} className="rounded-xl border border-border/80 bg-card/70 p-5">
              <h2 className="mb-4 text-lg font-medium">{group.title}</h2>
              <ul className="space-y-2">
                {/* Show the full list of works per section instead of a shortened preview. */}
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowRight className="mt-1 size-3.5 shrink-0" />
                      <span className="break-words leading-6">{item.title}</span>
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
