import type { ComponentType, ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb, NotebookPen } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "note";

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  note: NotebookPen
} satisfies Record<CalloutType, ComponentType<{ className?: string }>>;

const classes: Record<CalloutType, string> = {
  info: "border-blue-500/30 bg-blue-500/8",
  warning: "border-amber-500/35 bg-amber-500/8",
  tip: "border-emerald-500/35 bg-emerald-500/8",
  note: "border-slate-500/35 bg-slate-500/8"
};

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn("my-8 rounded-lg border px-4 py-3 text-sm", classes[type])}>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
        <Icon className="size-4" />
        <span className="capitalize">{type}</span>
      </div>
      <div className="leading-7 text-muted-foreground [&_p]:m-0">{children}</div>
    </div>
  );
}
