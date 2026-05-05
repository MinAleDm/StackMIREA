import fs from "node:fs";
import path from "node:path";

export const contentReportPath = path.join(process.cwd(), ".cache", "content-report.json");

export function writeContentReport(report, targetPath = contentReportPath) {
	fs.mkdirSync(path.dirname(targetPath), { recursive: true });
	fs.writeFileSync(targetPath, `${JSON.stringify(report, null, 2)}\n`, "utf-8");
}

export function createContentReport(mode) {
	return {
		version: 1,
		mode,
		generatedAt: new Date().toISOString(),
		summary: {
			errors: 0,
			warnings: 0,
			documents: 0,
			autofixSuggestions: 0
		},
		issues: [],
		autofixSuggestions: []
	};
}
