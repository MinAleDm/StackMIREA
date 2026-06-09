export class ValidationEngine {
  constructor(rules) {
    this.rules = rules;
  }

  run(context) {
    const issues = [];

    for (const rule of this.rules) {
      const ruleIssues = rule.evaluate(context);

      if (!Array.isArray(ruleIssues)) {
        throw new TypeError(`Content quality rule "${rule.id}" must return an array`);
      }

      issues.push(...ruleIssues);
    }

    return issues;
  }
}
