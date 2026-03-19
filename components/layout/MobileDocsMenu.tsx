"use client";

import Link from "next/link";
import { BookOpenText, ChevronDown, ChevronRight, ExternalLink, Tag } from "lucide-react";
import { useMemo, useState } from "react";

import { DeploymentVersion } from "@/components/layout/DeploymentVersion";
import type { BuildInfo } from "@/lib/build-info";
import { type SidebarGroup } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileDocsMenuProps {
  buildInfo: BuildInfo;
  groups: SidebarGroup[];
  currentPath: string;
}

function normalizePath(value: string) {
  return value.replace(/\/+$/, "") || "/";
}

export function MobileDocsMenu({ buildInfo, groups, currentPath }: MobileDocsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const normalizedCurrentPath = normalizePath(currentPath);

  const activeGroup = useMemo(
    () =>
      groups.find((group) =>
        group.items.some((item) => normalizePath(item.href) === normalizedCurrentPath)
      ) ?? groups[0],
    [groups, normalizedCurrentPath]
  );

  if (!groups.length) {
    return null;
  }

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
    <div className="sticky top-14 z-30 border-b border-border/80 bg-background/95 px-4 py-3 backdrop-blur md:hidden">
      <button
        className="flex items-center gap-1 py-1 text-sm font-medium text-foreground"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <ChevronDown className={cn("size-4 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
        <span>Menu</span>
      </button>

      {isOpen ? (
        <div className="pt-3">
          <div className="space-y-2 border-b border-border/70 pb-3">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border border-border/80 bg-card/80 p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary">
                <BookOpenText className="size-4" />
              </div>
              <div className="min-w-0 text-left">
                <p className="break-words text-sm font-medium leading-5">{activeGroup?.title ?? "Documentation"}</p>
                <p className="text-xs text-muted-foreground">Current section</p>
              </div>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>

            <Link
              href={buildInfo.href}
              target="_blank"
              rel="noreferrer"
              className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-md border border-border/80 bg-card/80 p-2 transition-colors hover:bg-muted/70"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/50 bg-primary/10 text-primary">
                <Tag className="size-4" />
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium">Версия сборки</p>
                <DeploymentVersion buildInfo={buildInfo} />
              </div>
              <ExternalLink className="size-4 text-muted-foreground" />
            </Link>
          </div>

          <div className="relative mt-3 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-3 w-full bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-background to-transparent" />

            <nav aria-label="Mobile docs navigation" className="max-h-[65vh] overflow-y-auto pb-4 pr-1">
              <ul className="space-y-2">
                {groups.map((group) => {
                  const containsActive = group.items.some(
                    (item) => normalizePath(item.href) === normalizedCurrentPath
                  );
                  const expanded = isGroupExpanded(group.id, containsActive);

                  return (
                    <li key={group.id}>
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.id, containsActive)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm font-medium transition-colors",
                          containsActive
                            ? "text-primary"
                            : "text-foreground hover:bg-muted/70 hover:text-foreground"
                        )}
                      >
                        <span className="min-w-0 break-words pr-2 leading-5">{group.title}</span>
                        <ChevronRight
                          className={cn("mt-0.5 size-4 shrink-0 transition-transform", expanded ? "rotate-90" : "rotate-0")}
                        />
                      </button>

                      {expanded ? (
                        <ul className="mt-1 border-l border-border/70 pl-3">
                          {group.items.map((item) => {
                            const isActive = normalizePath(item.href) === normalizedCurrentPath;

                            return (
                              <li key={item.href} className="my-1">
                                <Link
                                  href={item.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "block rounded-md px-2 py-1.5 text-sm leading-5 transition-colors",
                                    isActive
                                      ? "bg-primary/12 font-medium text-primary"
                                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                                  )}
                                >
                                  <span className="break-words">{item.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
