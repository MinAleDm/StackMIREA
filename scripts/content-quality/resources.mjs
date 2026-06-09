import fs from "node:fs";
import path from "node:path";

function normalizePath(value) {
  return value.split(path.sep).join("/");
}

export function collectResourceFiles(projectRoot) {
  const resourcesRoot = path.join(projectRoot, "resources");
  const files = [];

  if (!fs.existsSync(resourcesRoot)) {
    return files;
  }

  const directories = [resourcesRoot];

  while (directories.length > 0) {
    const currentDirectory = directories.pop();

    for (const entry of fs.readdirSync(currentDirectory, { withFileTypes: true })) {
      const entryPath = path.join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        directories.push(entryPath);
      } else if (entry.isFile()) {
        files.push(normalizePath(path.relative(projectRoot, entryPath)));
      }
    }
  }

  return files.sort((left, right) => left.localeCompare(right));
}
