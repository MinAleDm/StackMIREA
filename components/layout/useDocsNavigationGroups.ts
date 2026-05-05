"use client";

import { useMemo, useState } from "react";

import { getActiveSidebarGroup, normalizeDocPath } from "@/lib/docs-navigation";
import type { SidebarGroup } from "@/lib/navigation";

interface UseDocsNavigationGroupsResult {
  activeGroup: SidebarGroup | null;
  normalizedCurrentPath: string;
  isGroupExpanded: (groupId: string, containsActive: boolean) => boolean;
  toggleGroup: (groupId: string, containsActive: boolean) => void;
}

export function useDocsNavigationGroups(
  groups: SidebarGroup[],
  currentPath: string
): UseDocsNavigationGroupsResult {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const normalizedCurrentPath = normalizeDocPath(currentPath);

  const activeGroup = useMemo(
    () => getActiveSidebarGroup(groups, normalizedCurrentPath),
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

  return {
    activeGroup,
    normalizedCurrentPath,
    isGroupExpanded,
    toggleGroup
  };
}
