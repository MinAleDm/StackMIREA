import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="mb-3 text-sm uppercase tracking-[0.12em] text-muted-foreground">404</p>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mb-8 text-muted-foreground">Запрошенная страница не найдена или была перемещена.</p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          На главную
        </Link>
        <Link href="/docs" className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground">
          Открыть docs
        </Link>
      </div>
    </div>
  );
}
