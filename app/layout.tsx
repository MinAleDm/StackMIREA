import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BASE_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/utils";

import "./globals.css";

const socialImage = `${SITE_ORIGIN}${BASE_PATH}/social-card.svg`;

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}${BASE_PATH}/`),
  title: {
    default: `${SITE_NAME} Docs`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: ["Next.js docs", "documentation platform", "python", "java", "algorithms", "mdx", "shiki"],
  openGraph: {
    type: "website",
    title: `${SITE_NAME} Docs`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social card`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} Docs`,
    description: SITE_DESCRIPTION,
    images: [socialImage]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="site-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
