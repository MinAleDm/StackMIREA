import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  escapeHtml,
  renderHtmlReport,
  writeHtmlReport
} from "../html-reporter.mjs";

function createReport() {
  return {
    status: "passed",
    generatedAt: "2026-06-06T00:00:00.000Z",
    summary: {
      documents: 1,
      resources: 2,
      searchChunks: 3,
      errors: 0,
      warnings: 0
    },
    metrics: {
      missingDescriptions: 0
    },
    issues: []
  };
}

test("escapeHtml escapes unsafe markup", () => {
  assert.equal(
    escapeHtml('<script>"test" & \'value\'</script>'),
    "&lt;script&gt;&quot;test&quot; &amp; &#039;value&#039;&lt;/script&gt;"
  );
});

test("renderHtmlReport includes report summary", () => {
  const html = renderHtmlReport(createReport());

  assert.match(html, /Content quality: passed/);
  assert.match(html, /Documents/);
  assert.match(html, />1</);
});

test("renderHtmlReport escapes issue content", () => {
  const report = createReport();
  report.issues.push({
    ruleId: "broken-link",
    severity: "error",
    file: "docs/<unsafe>.mdx",
    line: 5,
    message: "<script>alert(1)</script>",
    value: null,
    threshold: null
  });

  const html = renderHtmlReport(report);

  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test("writeHtmlReport writes a standalone HTML file", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "content-html-"));
  const targetPath = path.join(directory, "report.html");

  try {
    writeHtmlReport(createReport(), targetPath);
    assert.match(fs.readFileSync(targetPath, "utf8"), /^<!doctype html>/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
