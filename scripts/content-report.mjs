import fs from "node:fs";
import path from "node:path";

export const contentReportJsonPath = path.join(
  process.cwd(),
  ".cache",
  "content-report.json"
);

export const contentReportHtmlPath = path.join(
  process.cwd(),
  ".cache",
  "content-report.html"
);

export const contentReportPath = contentReportJsonPath;

const metricByRuleId = {
  "missing-description": "missingDescriptions",
  "duplicate-slug": "duplicateSlugs",
  "invalid-author": "invalidAuthors",
  "oversized-page": "oversizedPages",
  "unused-resource": "unusedResources",
  "orphan-page": "orphanPages",
  "empty-section-index": "emptySectionIndexes",
  "oversized-search-chunk": "oversizedSearchChunks"
};

export function createIssue(issue) {
  if (!issue.ruleId || !issue.severity || !issue.message || !issue.file) {
    throw new TypeError("Content issue requires ruleId, severity, message, and file");
  }

  if (!["error", "warning"].includes(issue.severity)) {
    throw new TypeError(`Unsupported content issue severity "${issue.severity}"`);
  }

  return {
    line: null,
    value: null,
    threshold: null,
    details: {},
    ...issue
  };
}

export function finalizeReport(report) {
  report.issues = report.issues
    .map(createIssue)
    .sort(
      (left, right) =>
        (left.severity === right.severity ? 0 : left.severity === "error" ? -1 : 1) ||
        left.ruleId.localeCompare(right.ruleId) ||
        left.file.localeCompare(right.file) ||
        (left.line ?? 0) - (right.line ?? 0) ||
        left.message.localeCompare(right.message)
    );

  report.summary.errors = report.issues.filter((issue) => issue.severity === "error").length;
  report.summary.warnings = report.issues.filter((issue) => issue.severity === "warning").length;
  report.status = report.summary.errors > 0 ? "failed" : "passed";

  for (const metric of Object.values(metricByRuleId)) {
    report.metrics[metric] = 0;
  }

  for (const issue of report.issues) {
    const metric = metricByRuleId[issue.ruleId];

    if (metric) {
      report.metrics[metric] += 1;
    }
  }

  return report;
}

export function writeJsonReport(report, targetPath = contentReportJsonPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

export function writeContentReport(report, targetPath = contentReportPath) {
  writeJsonReport(report, targetPath);
}

export function createContentReport(mode = "error") {
  return {
    version: 1,
    mode,
    generatedAt: new Date().toISOString(),
    status: "passed",
    summary: {
      documents: 0,
      resources: 0,
      searchChunks: 0,
      errors: 0,
      warnings: 0,
      autofixSuggestions: 0
    },
    metrics: {
      missingDescriptions: 0,
      duplicateSlugs: 0,
      invalidAuthors: 0,
      oversizedPages: 0,
      unusedResources: 0,
      orphanPages: 0,
      emptySectionIndexes: 0,
      oversizedSearchChunks: 0
    },
    issues: [],
    autofixSuggestions: []
  };
}
