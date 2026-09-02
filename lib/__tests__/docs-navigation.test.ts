import assert from "node:assert/strict";
import test from "node:test";

import { getActiveSidebarGroup, getDocBreadcrumbParents, normalizeDocPath } from "../docs-navigation";
import { getCourseMaterials, getTrackOverviews } from "../catalog";
import { getDocPagination, type SidebarGroup } from "../navigation";

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

test("breadcrumbs use the readable course title and canonical links", () => {
  assert.deepEqual(getDocBreadcrumbParents(["java", "task-15-mvc-pattern"]), [
    { href: "/", label: "Главная" },
    { href: "/docs/java", label: "Java" }
  ]);
});

test("pagination stays inside the current course", () => {
  const materials = getCourseMaterials("java");
  const first = getDocPagination(materials[0].slug);
  const last = getDocPagination(materials.at(-1)?.slug ?? []);

  assert.equal(first.prev, null);
  assert.match(first.next?.href ?? "", /^\/docs\/java\//);
  assert.match(last.prev?.href ?? "", /^\/docs\/java\//);
  assert.equal(last.next, null);
});

test("catalog separates populated and upcoming tracks from manifest counts", () => {
  const tracks = getTrackOverviews();
  const java = tracks.find((track) => track.id === "java");
  const react = tracks.find((track) => track.id === "react");

  assert.ok((java?.materialsCount ?? 0) > 0);
  assert.equal(react?.materialsCount, 0);
});
