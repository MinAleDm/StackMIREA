import searchTopics from "@/lib/search-topics.json";
import { getAllDocs } from "@/lib/navigation";
import { getTrackDefinitions } from "@/lib/tracks";

export const materialTypeLabels = {
  theory: "Теория",
  practice: "Практика",
  notebook: "Notebook",
  guide: "Гайд",
  reference: "Справочник"
} as const;

export const difficultyLabels = {
  beginner: "Начальный",
  intermediate: "Средний",
  advanced: "Продвинутый"
} as const;

const topicLabels = new Map(searchTopics.map((topic) => [topic.id, topic.label]));

export interface TrackOverview {
  id: string;
  title: string;
  description: string;
  href: string;
  iconKey: ReturnType<typeof getTrackDefinitions>[number]["iconKey"];
  materialsCount: number;
  topics: string[];
  materialTypes: string[];
}

export function getTopicLabel(topicId: string) {
  return topicLabels.get(topicId) ?? topicId;
}

export function getTrackOverviews(): TrackOverview[] {
  const docs = getAllDocs();

  return getTrackDefinitions().map((track) => {
    const materials = docs.filter(
      (doc) => doc.section === track.id && !doc.isSectionIndex && doc.status === "published"
    );
    const topicFrequency = new Map<string, number>();
    for (const rawTopic of materials.flatMap((doc) => [...doc.topics, ...doc.tags])) {
      const topic = getTopicLabel(rawTopic);
      topicFrequency.set(topic, (topicFrequency.get(topic) ?? 0) + 1);
    }

    return {
      id: track.id,
      title: track.title,
      description: track.homeSubtitle,
      href: `/docs/${track.id}`,
      iconKey: track.iconKey,
      materialsCount: materials.length,
      topics: [...topicFrequency.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, 4)
        .map(([topic]) => topic),
      materialTypes: [...new Set(materials.map((doc) => materialTypeLabels[doc.materialType]))]
    };
  });
}

export function getCatalogStats() {
  const tracks = getTrackOverviews();
  return {
    materialsCount: tracks.reduce((sum, track) => sum + track.materialsCount, 0),
    populatedTracksCount: tracks.filter((track) => track.materialsCount > 0).length
  };
}

export function getCourseMaterials(section: string) {
  return getAllDocs().filter(
    (doc) => doc.section === section && !doc.isSectionIndex && doc.status === "published"
  );
}

export interface CourseRoadmapGroup {
  title: string;
  description: string;
  materials: ReturnType<typeof getCourseMaterials>;
}

function splitMaterials<T>(materials: T[], sizes: number[]) {
  const result: T[][] = [];
  let start = 0;
  for (const size of sizes) {
    result.push(materials.slice(start, start + size));
    start += size;
  }
  if (start < materials.length) result.push(materials.slice(start));
  return result.filter((group) => group.length > 0);
}

export function getCourseRoadmap(section: string): CourseRoadmapGroup[] {
  const materials = getCourseMaterials(section);
  if (!materials.length) return [];

  const configuredGroups: Record<string, Array<[string, string, number]>> = {
    java: [
      ["Основы языка и ООП", "Классы, наследование, интерфейсы и базовая структура программ.", 7],
      ["Алгоритмы и интерфейсы", "GUI, рекурсия, сортировки, очереди и работа с файлами.", 8],
      ["Архитектура приложений", "MVC, исключения, утилиты и организация прикладного кода.", 5],
      ["Итоговые практики", "ADT, паттерны проектирования и сборка законченных приложений.", 5]
    ],
    ai: [
      ["Подготовка", "Python, NumPy и pandas для дальнейшей работы с моделями.", 2],
      ["Классическое машинное обучение", "KNN, регрессия и деревья решений.", 3],
      ["Продвинутые методы", "Оптимизация, нейронные сети и кластеризация.", 3]
    ],
    bigdata: [
      ["Данные и анализ", "Подготовка данных, первичный анализ и регрессия.", 3],
      ["Модели", "Классификация, кластеризация и ансамблевые методы.", 4],
      ["Итог", "Оформление и проверка результата.", 1]
    ]
  };
  const configuration = configuredGroups[section];

  if (configuration) {
    const groups = splitMaterials(materials, configuration.map((item) => item[2]));
    return groups.map((group, index) => ({
      title: configuration[index]?.[0] ?? "Продолжение курса",
      description: configuration[index]?.[1] ?? "Дополнительные материалы направления.",
      materials: group
    }));
  }

  return [{ title: "Материалы курса", description: "Изучайте материалы по порядку или выберите нужную тему.", materials }];
}
