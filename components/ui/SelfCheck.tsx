interface SelfCheckItem {
  question: string;
  answer: string;
}

export function SelfCheck({ questions }: { questions: SelfCheckItem[] }) {
  return (
    <section className="not-prose my-8 rounded-2xl border border-border bg-card/60 p-5" aria-labelledby="self-check-title">
      <h2 id="self-check-title" className="text-xl font-semibold tracking-tight">Проверь себя</h2>
      <div className="mt-4 space-y-2">{questions.map((item, index) => <details key={item.question} className="rounded-xl border border-border bg-background/70 p-4"><summary className="min-h-7 cursor-pointer text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{index + 1}. {item.question}</summary><p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p></details>)}</div>
    </section>
  );
}
