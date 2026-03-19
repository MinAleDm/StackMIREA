import packageJson from "@/package.json";
import { DEFAULT_BRANCH, REPO_URL } from "@/lib/utils";

export interface BuildInfo {
  href: string;
  label: string;
  details: string;
}

export function getBuildInfo(): BuildInfo {
  const fullSha = process.env.GITHUB_SHA;
  const shortSha = fullSha?.slice(0, 7);
  const refName = process.env.GITHUB_REF_NAME || DEFAULT_BRANCH;
  const version = `v${packageJson.version}`;

  if (fullSha && shortSha) {
    return {
      href: `${REPO_URL}/commit/${fullSha}`,
      label: `${refName} · ${shortSha}`,
      details: version
    };
  }

  return {
    href: REPO_URL,
    label: version,
    details: "Локальная сборка"
  };
}
