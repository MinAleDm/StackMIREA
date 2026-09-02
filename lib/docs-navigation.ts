import type { SidebarGroup } from "@/lib/navigation";
import { getTrackTitle } from "@/lib/tracks";
import { toTitleCase } from "@/lib/utils";

export function normalizeDocPath(value: string) {
  return value.replace(/\/+$/, "") || "/";
}

export function getActiveSidebarGroup(groups: SidebarGroup[], currentPath: string) {
  const normalizedCurrentPath = normalizeDocPath(currentPath);

  return groups.find((group) =>
    group.items.some((item) => normalizeDocPath(item.href) === normalizedCurrentPath)
  ) ?? null;
}

export function getDocBreadcrumbParents(slug: string[]) {
  return [
    { href: "/", label: "Главная" },
    ...slug.slice(0, -1).map((segment, index) => ({
      href: `/docs/${slug.slice(0, index + 1).join("/")}`,
      label: index === 0 ? getTrackTitle(segment) : toTitleCase(segment)
    }))
  ];
}
