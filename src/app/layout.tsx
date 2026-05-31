import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Background from "@/Components/ui/Background";
import Navbar from "@/Components/layout/navbar";
import Footer from "@/Components/layout/footer";
import ThemeProvider from "@/Components/layout/ThemeProvider";
import { StructuredData } from "@/Components/seo/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = "https://vrandagarg.in";
const siteName = "Vranda Garg - Full Stack Developer";
const description =
  "Full Stack Developer who ships AI-powered products end-to-end with strong UI/UX. Currently at Kakiyo OÜ. Creator of MemContext, MUJ General, CappyChat, CappyUI, Bashio, ResuMate, and Quoridor Online. Specializing in Next.js, TypeScript, React, real-time systems, and AI integration.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "Vranda Garg",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer",
    "UI/UX Developer",
    "Software Engineer",
    "AI Developer",
    "AI Product Engineer",
    "Real-time Systems",
    "MemContext",
    "MUJ General",
    "CappyChat",
    "CappyUI",
    "Bashio",
    "Quoridor Online",
    "ResuMate",
    "SkillCompass",
    "Kakiyo OÜ",
    "Drizzle ORM",
    "Neon Postgres",
    "Better Auth",
    "Cloudflare R2",
  ],
  authors: [{ name: "Vranda Garg" }],
  creator: "Vranda Garg",
  publisher: "Vranda Garg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteName,
    description,
    images: [
      {
        url: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png",
        width: 2160,
        height: 1215,
        alt: "Vranda Garg - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    creator: "@vrandaagarg",
    images: ["https://res.cloudinary.com/dyetf2h9n/image/upload/v1765637887/banner_hfyoau.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  // TODO: Add Google Search Console verification
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased flex flex-col min-h-screen relative font-sans`}
        suppressHydrationWarning
      >
        <StructuredData />
        <ThemeProvider>
          <Background />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
