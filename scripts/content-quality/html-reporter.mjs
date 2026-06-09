import fs from "node:fs";
import path from "node:path";

import { contentReportHtmlPath } from "../content-report.mjs";

export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMetricRows(metrics) {
  return Object.entries(metrics)
    .map(
      ([name, value]) =>
        `<tr><th scope="row">${escapeHtml(name)}</th><td>${escapeHtml(value)}</td></tr>`
    )
    .join("");
}

function renderIssues(issues) {
  if (issues.length === 0) {
    return "<p>No content quality issues found.</p>";
  }

  return issues
    .map((issue) => {
      const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
      const metadata = [
        issue.value !== null ? `value=${issue.value}` : "",
        issue.threshold !== null ? `threshold=${issue.threshold}` : ""
      ]
        .filter(Boolean)
        .join(", ");

      return `
        <article class="issue issue-${escapeHtml(issue.severity)}">
          <div><strong>${escapeHtml(issue.ruleId)}</strong> · ${escapeHtml(issue.severity)}</div>
          <div class="location">${escapeHtml(location)}</div>
          <p>${escapeHtml(issue.message)}</p>
          ${metadata ? `<div class="metadata">${escapeHtml(metadata)}</div>` : ""}
        </article>
      `;
    })
    .join("");
}

export function renderHtmlReport(report) {
  const title = `Content quality: ${report.status}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light dark; font-family: system-ui, sans-serif; }
    body { max-width: 1100px; margin: 0 auto; padding: 32px 20px; line-height: 1.5; }
    h1 { margin-bottom: 4px; }
    .summary { display: flex; flex-wrap: wrap; gap: 12px; margin: 24px 0; }
    .card { border: 1px solid #8886; border-radius: 8px; padding: 12px 16px; min-width: 130px; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 28px; }
    th, td { border-bottom: 1px solid #8886; padding: 8px; text-align: left; }
    .issue { border: 1px solid #8886; border-left-width: 5px; border-radius: 6px; margin: 12px 0; padding: 12px 16px; }
    .issue-error { border-left-color: #c62828; }
    .issue-warning { border-left-color: #ef6c00; }
    .location, .metadata { color: #777; font-family: ui-monospace, monospace; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div>Generated at ${escapeHtml(report.generatedAt)}</div>
  <section class="summary" aria-label="Summary">
    <div class="card"><strong>Documents</strong><br>${escapeHtml(report.summary.documents)}</div>
    <div class="card"><strong>Resources</strong><br>${escapeHtml(report.summary.resources)}</div>
    <div class="card"><strong>Search chunks</strong><br>${escapeHtml(report.summary.searchChunks)}</div>
    <div class="card"><strong>Errors</strong><br>${escapeHtml(report.summary.errors)}</div>
    <div class="card"><strong>Warnings</strong><br>${escapeHtml(report.summary.warnings)}</div>
  </section>
  <h2>Metrics</h2>
  <table><tbody>${renderMetricRows(report.metrics)}</tbody></table>
  <h2>Issues</h2>
  ${renderIssues(report.issues)}
</body>
</html>
`;
}

export function writeHtmlReport(report, targetPath = contentReportHtmlPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, renderHtmlReport(report), "utf8");
}
