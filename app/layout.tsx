import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { DEFAULT_ROBOTS, SITE_DESCRIPTION, SITE_NAME, socialImage } from "@/lib/seo";
import { BASE_PATH, SITE_ORIGIN, withBasePath } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}${BASE_PATH}/`),
  title: {
    default: `Учебные материалы МИРЭА | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: withBasePath("/favicon.svg"),
    shortcut: withBasePath("/favicon.svg"),
    apple: withBasePath("/favicon.png")
  },
  keywords: ["МИРЭА", "учебные материалы", "практики", "Python", "AI", "Big Data", "Java", "алгоритмы"],
  robots: DEFAULT_ROBOTS,
  openGraph: {
    type: "website",
    url: "/",
    title: `Учебные материалы МИРЭА | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
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
    title: `Учебные материалы МИРЭА | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [socialImage]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="site-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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
