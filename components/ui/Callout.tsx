import type { ComponentType, ReactNode } from "react";
import { AlertTriangle, BadgeAlert, Info, Lightbulb, NotebookPen } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "note" | "important";

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  note: NotebookPen,
  important: BadgeAlert
} satisfies Record<CalloutType, ComponentType<{ className?: string }>>;

const classes: Record<CalloutType, string> = {
  info: "border-primary/20 bg-primary/5",
  warning: "border-foreground/20 bg-foreground/5",
  tip: "border-primary/10 bg-primary/5",
  note: "border-border bg-muted/70",
  important: "border-primary/30 bg-primary/10"
};

const labels: Record<CalloutType, string> = {
  info: "Информация",
  warning: "Предупреждение",
  tip: "Совет",
  note: "Заметка",
  important: "Важно"
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
        <span>{labels[type]}</span>
      </div>
      <div className="leading-7 text-muted-foreground [&_p]:m-0">{children}</div>
    </div>
  );
}
