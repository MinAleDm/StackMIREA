export const contentQualityConfig = {
  pageSize: {
    warningBytes: 512 * 1024,
    errorBytes: 1024 * 1024
  },
  searchChunk: {
    maxCharacters: 420
  },
  sectionIndex: {
    minTextCharacters: 80
  },
  orphanPages: {
    ignoredSlugs: []
  },
  resources: {
    ignoredPaths: ["resources/bigdata/README.md"]
  }
};
