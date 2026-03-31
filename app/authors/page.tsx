import type { Metadata } from "next";

import { ContributorsSection } from "@/components/contributors/ContributorsSection";
import { getContributorsOverview } from "@/lib/contributors";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Авторы и разработчики",
  description: "Список авторов публикаций и участников команды разработки StackMIREA."
};

export default function AuthorsPage() {
  const { authors, devTeam } = getContributorsOverview();

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      <ContributorsSection
        authors={authors}
        devTeam={devTeam}
        title="Авторы и разработчики"
        description="Здесь собраны все, кто публикует материалы на сайте и развивает саму платформу StackMIREA."
        showContacts
      />
    </div>
  );
}
