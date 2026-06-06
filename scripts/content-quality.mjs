import { buildSearchIndex, writeSearchIndex } from "./build-search-index.mjs";
import {
  ContentRepository,
  ManifestBuilder,
  projectRoot
} from "./content-manifest.mjs";
import { contentQualityConfig } from "./content-quality-config.mjs";
import { ValidationEngine } from "./content-quality/engine.mjs";
import { writeHtmlReport } from "./content-quality/html-reporter.mjs";
import { collectResourceFiles } from "./content-quality/resources.mjs";
import { contentQualityRules } from "./content-quality/rules/index.mjs";
import {
  createContentReport,
  finalizeReport,
  writeJsonReport
} from "./content-report.mjs";

function toStructuredManifestIssue(issue) {
  return {
    ruleId: issue.code,
    severity: issue.severity,
    file: issue.file ?? `generated:${issue.virtualPath ?? "content-manifest"}`,
    message: issue.message,
    details: {
      virtualPath: issue.virtualPath ?? null
    }
  };
}

const manifestBuilder = new ManifestBuilder(new ContentRepository(), "error");
const manifest = manifestBuilder.write();
const searchIndex = buildSearchIndex(manifest);
const resources = collectResourceFiles(projectRoot);

writeSearchIndex(searchIndex);

const engine = new ValidationEngine(contentQualityRules);
const issues = engine.run({
  projectRoot,
  manifest,
  searchIndex,
  resources,
  config: contentQualityConfig
});

const report = createContentReport("quality");
report.summary.documents = manifest.docs.length;
report.summary.resources = resources.length;
report.summary.searchChunks = searchIndex.docs.reduce(
  (total, doc) => total + doc.chunks.length,
  0
);
report.issues.push(
  ...manifestBuilder.report.issues
    .filter((issue) => !["missing-description", "duplicate-slug"].includes(issue.code))
    .map(toStructuredManifestIssue),
  ...issues
);

finalizeReport(report);
writeJsonReport(report);
writeHtmlReport(report);

const summary = `${report.summary.errors} error(s), ${report.summary.warnings} warning(s)`;
console.log(`Content quality ${report.status}: ${summary}.`);
console.log("Reports generated at .cache/content-report.json and .cache/content-report.html.");

process.exitCode = report.summary.errors > 0 ? 1 : 0;
