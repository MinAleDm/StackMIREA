import Link from "next/link";

import { type SidebarGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  groups: SidebarGroup[];
  currentPath: string;
}

export function Sidebar({ groups, currentPath }: SidebarProps) {
  return (
    <aside className="hidden w-full lg:sticky lg:top-[4.5rem] lg:block lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pr-3">
      <nav aria-label="Documentation sidebar" className="space-y-8 pb-12">
        {groups.map((group) => (
          <section key={group.id}>
            <h2 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.title}
            </h2>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = item.href === currentPath;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-2 py-1.5 text-sm leading-6 transition-colors",
                        isActive
                          ? "bg-primary/12 text-primary"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  );
}
