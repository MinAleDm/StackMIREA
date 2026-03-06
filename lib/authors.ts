import { REPO_OWNER } from "@/lib/utils";

export interface GitHubPerson {
  github: string;
  profileUrl: string;
  avatarUrl: string;
}

export interface DevTeamMember extends GitHubPerson {
  role: string;
}

const DEFAULT_DOC_AUTHOR = REPO_OWNER;
const DEV_TEAM_MEMBERS: Array<{ github: string; role: string }> = [
  { github: REPO_OWNER, role: "CPO" }
];

function normalizeGitHubLogin(rawValue: string) {
  const trimmed = rawValue.trim();
  const githubUrlMatch = /github\.com\/([A-Za-z0-9-]+)/i.exec(trimmed);

  if (githubUrlMatch?.[1]) {
    return githubUrlMatch[1];
  }

  const withoutAt = trimmed.replace(/^@/, "");
  return withoutAt.split("/").filter(Boolean).at(-1) ?? withoutAt;
}

export function toGitHubPerson(rawGitHub: string): GitHubPerson {
  const github = normalizeGitHubLogin(rawGitHub);

  return {
    github,
    profileUrl: `https://github.com/${github}`,
    avatarUrl: `https://github.com/${github}.png?size=120`
  };
}

export function getDefaultDocAuthor() {
  return toGitHubPerson(DEFAULT_DOC_AUTHOR);
}

export function getDevTeamMembers() {
  const uniqueMembers = new Map<string, DevTeamMember>();

  for (const member of DEV_TEAM_MEMBERS) {
    const person = toGitHubPerson(member.github);
    uniqueMembers.set(person.github.toLowerCase(), { ...person, role: member.role });
  }

  return [...uniqueMembers.values()];
}
