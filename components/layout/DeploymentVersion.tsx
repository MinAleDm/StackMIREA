"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { DEPLOYMENTS_API_URL } from "@/lib/utils";

interface DeploymentSummary {
  environment: string;
  ref: string;
  sha: string;
  createdAt: string;
}

interface GitHubDeployment {
  environment?: string;
  ref?: string;
  sha?: string;
  created_at?: string;
}

let deploymentCache: DeploymentSummary | null = null;
let deploymentPromise: Promise<DeploymentSummary | null> | null = null;

function formatDeploymentDate(value: string) {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsed);
}

async function getLatestDeployment() {
  if (deploymentCache) {
    return deploymentCache;
  }

  if (deploymentPromise) {
    return deploymentPromise;
  }

  deploymentPromise = fetch(DEPLOYMENTS_API_URL, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`GitHub deployments request failed with status ${response.status}`);
      }

      const deployments = (await response.json()) as GitHubDeployment[];
      const latest = deployments[0];

      if (!latest?.sha || !latest.ref || !latest.created_at) {
        return null;
      }

      const summary: DeploymentSummary = {
        environment: latest.environment ?? "production",
        ref: latest.ref,
        sha: latest.sha.slice(0, 7),
        createdAt: formatDeploymentDate(latest.created_at)
      };

      deploymentCache = summary;
      return summary;
    })
    .catch(() => null)
    .finally(() => {
      deploymentPromise = null;
    });

  return deploymentPromise;
}

export function DeploymentVersion() {
  const [deployment, setDeployment] = useState<DeploymentSummary | null>(deploymentCache);
  const [isLoading, setIsLoading] = useState(!deploymentCache);

  useEffect(() => {
    let isMounted = true;

    void getLatestDeployment().then((latest) => {
      if (!isMounted) {
        return;
      }

      setDeployment(latest);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        Loading deployments
      </p>
    );
  }

  if (!deployment) {
    return <p className="text-xs text-muted-foreground">Deployment data unavailable</p>;
  }

  return (
    <div className="text-left">
      <p className="text-xs font-medium text-foreground">
        {deployment.ref} · {deployment.sha}
      </p>
      <p className="text-xs text-muted-foreground">
        {deployment.environment} · {deployment.createdAt}
      </p>
    </div>
  );
}
