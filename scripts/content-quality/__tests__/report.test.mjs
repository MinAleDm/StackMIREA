import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  createContentReport,
  createIssue,
  finalizeReport,
  writeJsonReport
} from "../../content-report.mjs";

test("finalizeReport calculates status, summary, metrics, and stable ordering", () => {
  const report = createContentReport("quality");
  report.issues.push(
    {
      ruleId: "unused-resource",
      severity: "warning",
      file: "resources/unused.csv",
      message: "Unused"
    },
    {
      ruleId: "broken-link",
      severity: "error",
      file: "docs/example.mdx",
      line: 3,
      message: "Broken link"
    },
    {
      ruleId: "missing-description",
      severity: "error",
      file: "docs/another.mdx",
      message: "Missing description"
    }
  );

  finalizeReport(report);

  assert.equal(report.status, "failed");
  assert.equal(report.summary.errors, 2);
  assert.equal(report.summary.warnings, 1);
  assert.equal(report.metrics.missingDescriptions, 1);
  assert.equal(report.metrics.unusedResources, 1);
  assert.deepEqual(
    report.issues.map((issue) => issue.ruleId),
    ["broken-link", "missing-description", "unused-resource"]
  );
});

test("createIssue rejects incomplete issues", () => {
  assert.throws(
    () => createIssue({ severity: "error", message: "Invalid", file: "docs/a.mdx" }),
    /requires ruleId/
  );
});

test("writeJsonReport writes a parseable report", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "content-report-"));
  const targetPath = path.join(directory, "report.json");

  try {
    const report = createContentReport("quality");
    writeJsonReport(report, targetPath);

    assert.deepEqual(JSON.parse(fs.readFileSync(targetPath, "utf8")), report);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
