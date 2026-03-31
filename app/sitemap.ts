import type { MetadataRoute } from "next";

import { getAllDocs } from "@/lib/navigation";
import { buildAbsoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/docs", "/ask"];
  const docs = getAllDocs().map((doc) => doc.href);
  const allRoutes = [...staticRoutes, ...docs];

  return allRoutes.map((route) => ({
    url: buildAbsoluteUrl(route ? `${route}/` : "/"),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
    lastModified: new Date()
  }));
}
