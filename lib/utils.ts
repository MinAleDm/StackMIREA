import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const SITE_NAME = "StackMIREA";
export const SITE_DESCRIPTION =
  "Production-grade documentation platform for Python, AI, BigData, Java and algorithms practices.";
export const REPO_OWNER = "MinAleDm";
export const REPO_NAME = "StackMIREA";
export const DEFAULT_BRANCH = "main";
export const SITE_ORIGIN = "https://minaledm.github.io";
export const BASE_PATH = "/StackMIREA";
export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
export const DOCS_ROOT = "/docs";
export const GITHUB_EDIT_ROOT = `${REPO_URL}/edit/${DEFAULT_BRANCH}/content`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildAbsoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${BASE_PATH}${normalizedPath}`;
}

export function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
