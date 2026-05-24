"use client";

import Link from "next/link";
import { socialLinks } from "@/data/social";
import Magnetic from "@/Components/ui/Magnetic";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState<string>("");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full relative overflow-hidden border-t border-neutral-200 bg-background/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          {/* Left Side: Big Text */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">

              <span className="text-neutral-500 text-sm font-mono mb-2">
                Got an idea?
              </span>
              <Link
                href={`mailto:${email}`}
                className="text-3xl md:text-5xl font-bold tracking-tighter hover:text-neutral-600 transition-colors"
              >
                Let&apos;s build it.
              </Link>
            </div>
            <p className="text-neutral-500 max-w-sm">
              Full Stack Developer focused on building beautiful and functional web
              experiences.
            </p>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-col items-start md:items-end gap-6">
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Magnetic key={link.title}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-neutral-200 hover:text-foreground transition-all"
                      aria-label={link.title}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  </Magnetic>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 md:mt-16 pt-8 border-t border-neutral-200/50 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-neutral-500">
          <p>© {currentYear} Vranda Garg. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <span className="hover:text-black transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-black transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
