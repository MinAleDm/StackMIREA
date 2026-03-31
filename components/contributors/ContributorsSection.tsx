import { GitHubUserBadge } from "@/components/ui/GitHubUserBadge";
import type { AuthorWithSummary } from "@/lib/contributors";
import type { DevTeamMember } from "@/lib/authors";

interface ContributorsSectionProps {
  authors: AuthorWithSummary[];
  devTeam: DevTeamMember[];
  title: string;
  description: string;
  authorsTitle?: string;
  developersTitle?: string;
  className?: string;
  sectionId?: string;
  compact?: boolean;
  showContacts?: boolean;
}

export function ContributorsSection({
  authors,
  devTeam,
  title,
  description,
  authorsTitle = "Авторы публикаций",
  developersTitle = "Команда разработки",
  className,
  sectionId,
  compact = false,
  showContacts = false
}: ContributorsSectionProps) {
  const visibleAuthors = compact ? authors.slice(0, 6) : authors;

  return (
    <section id={sectionId} className={className}>
      <header className="mb-8">
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <div>
          <h3 className="mb-4 text-xl font-semibold tracking-tight">{authorsTitle}</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {visibleAuthors.map((author) => (
              <article key={author.github} className="rounded-xl border border-border/80 bg-card/70 p-4">
                <GitHubUserBadge person={author} description={`Публикаций: ${author.docsCount}`} />
                <p className="mt-3 text-sm text-muted-foreground">{author.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold tracking-tight">{developersTitle}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {devTeam.map((member) => (
              <GitHubUserBadge key={member.github} person={member} description={member.role} />
            ))}
          </div>

          {compact && authors.length > visibleAuthors.length ? (
            <p className="mt-4 text-sm text-muted-foreground">
              На главной показаны самые активные авторы. Остальные участники автоматически подтягиваются из материалов
              документации.
            </p>
          ) : null}
        </div>
      </div>

      {showContacts ? (
        <div className="mt-10 rounded-xl border border-border/80 bg-card/70 p-5">
          <h3 className="text-xl font-semibold tracking-tight">Контакты команды</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Для связи с командой разработки:{" "}
            <a href="mailto:petrushenko184@mail.ru" className="text-primary transition-opacity hover:opacity-80">
              petrushenko184@mail.ru
            </a>
            .
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Чтобы письмо обработали быстрее, укажите в теме: <span className="text-foreground">StackMIREA - ваш вопрос</span>.
          </p>
        </div>
      ) : null}
    </section>
  );
}
