"use client";

import Link from "next/link";
import { BookOpenText, ChevronRight, ExternalLink, Tag } from "lucide-react";
import { useMemo, useState } from "react";

import { DeploymentVersion } from "@/components/layout/DeploymentVersion";
import { type SidebarGroup } from "@/lib/navigation";
import { cn, DEPLOYMENTS_URL } from "@/lib/utils";

interface SidebarProps {
  groups: SidebarGroup[];
  currentPath: string;
}

function normalizePath(value: string) {
  return value.replace(/\/+$/, "") || "/";
}

export function Sidebar({ groups, currentPath }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const normalizedCurrentPath = normalizePath(currentPath);

  const activeGroup = useMemo(
    () =>
      groups.find((group) =>
        group.items.some((item) => normalizePath(item.href) === normalizedCurrentPath)
      ) ?? groups[0],
    [groups, normalizedCurrentPath]
  );

  const isGroupExpanded = (groupId: string, containsActive: boolean) => {
    if (expandedGroups[groupId] !== undefined) {
      return expandedGroups[groupId];
    }

    return containsActive;
  };

  const toggleGroup = (groupId: string, containsActive: boolean) => {
    setExpandedGroups((state) => ({
      ...state,
      [groupId]: !isGroupExpanded(groupId, containsActive)
    }));
  };

  return (
    <aside className="hidden w-full lg:sticky lg:top-[4.5rem] lg:block lg:max-h-[calc(100vh-5rem)] lg:overflow-y-auto lg:pr-3">
      <nav aria-label="Documentation sidebar" className="space-y-6 pb-12">
        <div className="space-y-2 border-b border-border/70 pb-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-2 rounded-md border border-border/80 bg-card/80 p-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary">
              <BookOpenText className="size-4" />
            </div>
            <div className="min-w-0 text-left">
              <p className="break-words text-sm font-medium leading-5">{activeGroup?.title ?? "Documentation"}</p>
              <p className="text-xs text-muted-foreground">Current section</p>
            </div>
          </div>

          <Link
            href={DEPLOYMENTS_URL}
            target="_blank"
            rel="noreferrer"
            className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border border-border/80 bg-card/80 p-2 transition-colors hover:bg-muted/70"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary">
              <Tag className="size-4" />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-medium">Deployment version</p>
              <DeploymentVersion />
            </div>
            <ExternalLink className="size-4 text-muted-foreground" />
          </Link>
        </div>

        {groups.map((group) => {
          const containsActive = group.items.some((item) => normalizePath(item.href) === normalizedCurrentPath);
          const expanded = isGroupExpanded(group.id, containsActive);

          return (
            <section key={group.id}>
              <button
                type="button"
                onClick={() => toggleGroup(group.id, containsActive)}
                className={cn(
                  "mb-2 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors",
                  containsActive
                    ? "text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                <span className="min-w-0 break-words pr-2">{group.title}</span>
                <ChevronRight className={cn("size-4 shrink-0 transition-transform", expanded ? "rotate-90" : "rotate-0")} />
              </button>

              {expanded ? (
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = normalizePath(item.href) === normalizedCurrentPath;

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
              ) : null}
            </section>
          );
        })}
      </nav>
    </aside>
  );
}
