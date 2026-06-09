import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import "../app/globals.css";
import Background from "@/Components/ui/Background";
import Navbar from "@/Components/layout/navbar";
import Footer from "@/Components/layout/footer";
import ThemeProvider from "@/Components/layout/ThemeProvider";
import { StructuredData } from "@/Components/seo/StructuredData";
import Link from "@/Components/ui/Link";

const siteUrl = "https://vrandagarg.in";
const siteName = "Vranda Garg - Full Stack Developer";
const description =
  "Full Stack Developer who ships AI-powered products end-to-end with strong UI/UX. Currently at Kakiyo OÜ. Creator of MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online. Specializing in TanStack Start, TypeScript, React, real-time systems, and AI integration.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteName },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Vranda Garg, Full Stack Developer, Frontend Developer, TanStack Start Developer, React Developer, TypeScript Developer, Web Developer, UI/UX Developer, Software Engineer, AI Developer, AI Product Engineer, Real-time Systems, MemContext, MUJ General, CappyChat, CappyUI, Bashio, Quoridor Online, ResuMate, SkillCompass, Kakiyo OÜ, Drizzle ORM, Neon Postgres, Better Auth, Cloudflare R2",
      },
      { name: "author", content: "Vranda Garg" },
      { name: "creator", content: "Vranda Garg" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: siteName },
      { property: "og:title", content: siteName },
      { property: "og:description", content: description },
      {
        property: "og:image",
        content: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
      },
      { property: "og:image:width", content: "2160" },
      { property: "og:image:height", content: "1215" },
      { property: "og:image:alt", content: "Vranda Garg - Full Stack Developer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteName },
      { name: "twitter:description", content: description },
      { name: "twitter:creator", content: "@vrandaagarg" },
      {
        name: "twitter:image",
        content: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
      },
      { name: "robots", content: "index, follow" },
      { name: "format-detection", content: "email=no, address=no, telephone=no" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap",
      },
      { rel: "icon", href: "/logo.jpg" },
      { rel: "shortcut icon", href: "/logo.jpg" },
      { rel: "apple-touch-icon", href: "/logo.jpg" },
      { rel: "canonical", href: siteUrl },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider>
        <StructuredData />
        <Background />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <div className="grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className="relative flex min-h-screen flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6">
      <div className="w-full relative">
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="font-serif text-6xl font-bold text-neutral-600 md:text-8xl">
            404
          </h1>
          <p className="mt-4 text-xl text-neutral-500 md:text-2xl">Page not found</p>
          <p className="mt-2 max-w-md px-4 text-neutral-500">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 rounded-lg bg-neutral-800 px-6 py-3 font-medium text-background transition-colors hover:bg-neutral-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
