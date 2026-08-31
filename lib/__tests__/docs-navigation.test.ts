import assert from "node:assert/strict";
import test from "node:test";

import { getActiveSidebarGroup, normalizeDocPath } from "../docs-navigation";
import type { SidebarGroup } from "../navigation";

const groups: SidebarGroup[] = [
  {
    id: "python",
    title: "Python",
    items: [
      { title: "Python", href: "/docs/python", order: 1 },
      { title: "Обзор", href: "/docs/python/overview", order: 2 }
    ]
  }
];

test("normalizeDocPath treats trailing slashes consistently", () => {
  assert.equal(normalizeDocPath("/docs/python///"), "/docs/python");
  assert.equal(normalizeDocPath("/"), "/");
});

test("getActiveSidebarGroup returns the matching documentation group", () => {
  assert.equal(getActiveSidebarGroup(groups, "/docs/python/overview/")?.id, "python");
});

test("getActiveSidebarGroup does not select an unrelated fallback group", () => {
  assert.equal(getActiveSidebarGroup(groups, "/docs"), null);
});
