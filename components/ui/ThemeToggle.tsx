"use client";

import { Moon, Sun } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { Button } from "@/components/ui/button";

type ThemeName = "light" | "dark";

type ViewTransition = {
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="Переключить тему" className="text-muted-foreground" />;
  }

  const isDark = resolvedTheme !== "light";
  const nextTheme: ThemeName = isDark ? "light" : "dark";

  const toggleTheme = async (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const transitionDocument = document as ViewTransitionDocument;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof transitionDocument.startViewTransition !== "function"
    ) {
      setTheme(nextTheme);
      return;
    }

    const button = buttonRef.current;
    const rect = button?.getBoundingClientRect();
    const fallbackX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const fallbackY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const x = event.clientX || fallbackX;
    const y = event.clientY || fallbackY;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.dataset.themeTransition = "wave";
    root.style.setProperty("--theme-transition-x", `${x}px`);
    root.style.setProperty("--theme-transition-y", `${y}px`);
    root.style.setProperty("--theme-transition-radius", `${radius}px`);

    const transition = transitionDocument.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    try {
      await transition.finished;
    } finally {
      delete root.dataset.themeTransition;
      root.style.removeProperty("--theme-transition-x");
      root.style.removeProperty("--theme-transition-y");
      root.style.removeProperty("--theme-transition-radius");
    }
  };

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      aria-label="Переключить тему"
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
