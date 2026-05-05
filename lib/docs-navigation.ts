import type { SidebarGroup } from "@/lib/navigation";

export function normalizeDocPath(value: string) {
  return value.replace(/\/+$/, "") || "/";
}

export function getActiveSidebarGroup(groups: SidebarGroup[], currentPath: string) {
  const normalizedCurrentPath = normalizeDocPath(currentPath);

  return (
    groups.find((group) => group.items.some((item) => normalizeDocPath(item.href) === normalizedCurrentPath)) ??
    groups[0] ??
    null
  );
}
