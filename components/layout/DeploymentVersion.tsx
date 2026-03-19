import type { BuildInfo } from "@/lib/build-info";

interface DeploymentVersionProps {
  buildInfo: BuildInfo;
}

export function DeploymentVersion({ buildInfo }: DeploymentVersionProps) {
  return (
    <div className="text-left">
      <p className="text-xs font-medium text-foreground">{buildInfo.label}</p>
      <p className="text-xs text-muted-foreground">{buildInfo.details}</p>
    </div>
  );
}
