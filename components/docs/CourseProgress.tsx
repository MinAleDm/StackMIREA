"use client";

import { Check, Circle } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "stackmirea:completed-materials";
const PROGRESS_EVENT = "stackmirea:progress-change";

function readCompleted() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return new Set<string>(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

function writeCompleted(completed: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    window.dispatchEvent(new Event(PROGRESS_EVENT));
  } catch {
    // Storage may be disabled; the page remains fully usable without progress persistence.
  }
}

function useCompletedMaterials() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const update = () => setCompleted(readCompleted());
    update();
    window.addEventListener(PROGRESS_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return completed;
}

export function CourseProgress({ materialIds }: { materialIds: string[] }) {
  const completed = useCompletedMaterials();
  const completedCount = materialIds.filter((id) => completed.has(id)).length;
  const percent = materialIds.length ? Math.round((completedCount / materialIds.length) * 100) : 0;

  return (
    <section aria-label="Прогресс курса" className="rounded-2xl border border-border bg-card/70 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4 text-sm"><span className="font-medium">Пройдено {completedCount} из {materialIds.length}</span><span className="text-muted-foreground">{percent}%</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={materialIds.length} aria-valuenow={completedCount} aria-label={`Пройдено ${completedCount} из ${materialIds.length}`}><div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${percent}%` }} /></div>
      <p className="mt-2 text-xs text-muted-foreground">Прогресс хранится только в этом браузере.</p>
    </section>
  );
}

export function MaterialCompletion({ materialId }: { materialId: string }) {
  const completed = useCompletedMaterials();
  const isCompleted = completed.has(materialId);

  function toggle() {
    const next = readCompleted();
    if (next.has(materialId)) next.delete(materialId);
    else next.add(materialId);
    writeCompleted(next);
  }

  return (
    <button type="button" onClick={toggle} aria-pressed={isCompleted} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {isCompleted ? <Check className="size-4 text-primary" /> : <Circle className="size-4 text-muted-foreground" />}
      {isCompleted ? "Изучено" : "Отметить как изученное"}
    </button>
  );
}
