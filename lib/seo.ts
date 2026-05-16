import type { Metadata } from "next";

import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/utils";

const socialImage = `${SITE_ORIGIN}${BASE_PATH}/preview.png`;

export const DEFAULT_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1
  }
};

export function ensureTrailingSlash(pathname = "/") {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

interface BuildPageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
}

export function buildPageMetadata({ title, description, pathname }: BuildPageMetadataOptions): Metadata {
  const canonicalPath = ensureTrailingSlash(pathname);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    robots: DEFAULT_ROBOTS,
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `Превью ${SITE_NAME}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    }
  };
}

export { socialImage, SITE_DESCRIPTION, SITE_NAME };
