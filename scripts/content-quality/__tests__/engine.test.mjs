import assert from "node:assert/strict";
import test from "node:test";

import { ValidationEngine } from "../engine.mjs";

test("ValidationEngine collects issues from all rules", () => {
  const engine = new ValidationEngine([
    {
      id: "first",
      evaluate: () => [
        {
          ruleId: "first",
          severity: "warning",
          file: "docs/first.mdx",
          message: "First issue"
        }
      ]
    },
    {
      id: "second",
      evaluate: () => [
        {
          ruleId: "second",
          severity: "error",
          file: "docs/second.mdx",
          message: "Second issue"
        }
      ]
    }
  ]);

  const issues = engine.run({});

  assert.equal(issues.length, 2);
  assert.equal(issues[0].ruleId, "first");
  assert.equal(issues[1].ruleId, "second");
});

test("ValidationEngine returns an empty array when rules pass", () => {
  const engine = new ValidationEngine([
    {
      id: "valid",
      evaluate: () => []
    }
  ]);

  assert.deepEqual(engine.run({}), []);
});

test("ValidationEngine rejects a non-array rule result", () => {
  const engine = new ValidationEngine([
    {
      id: "invalid",
      evaluate: () => null
    }
  ]);

  assert.throws(
    () => engine.run({}),
    /Content quality rule "invalid" must return an array/
  );
});
