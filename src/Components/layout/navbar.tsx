"use client";

import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import Link from "@/Components/ui/Link";
import { AnimatePresence, motion } from "framer-motion";
import { Home, FolderOpen, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/Components/ui/AnimatedThemeToggler";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({

    transition: isSelected
      ? { type: "spring" as const, bounce: 0, duration: 0.5, stiffness: 300, damping: 30 }
      : { type: "spring" as const, bounce: 0, duration: 0.35, stiffness: 400, damping: 35 },
  }),
};

const spanVariants = {
  initial: {
    width: 0,
    opacity: 0,
  },
  animate: {
    width: "auto",
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0, duration: 0.5, stiffness: 300, damping: 30 }
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { type: "spring" as const, bounce: 0, duration: 0.35, stiffness: 400, damping: 35 }
  },
};

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    const handleThemeInit = () => {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

      document.documentElement.setAttribute("data-theme", currentTheme);
      setIsClient(true);
    };

    handleThemeInit();
  }, []);

  useEffect(() => {
    const updateSelected = () => {
      const navItems = [
        { href: "/" },
        { href: "/projects" },
        { href: "/#contact" },
      ];

      const currentIndex = navItems.findIndex((item) => {
        if (item.href === "/#contact") {
          return pathname === "/" && window.location.hash === "#contact";
        }
        return pathname === item.href || pathname?.startsWith(item.href + "/");
      });

      if (currentIndex !== -1) {
        setSelected(currentIndex);
      }
    };

    updateSelected();
    window.addEventListener("hashchange", updateSelected);

    return () => {
      window.removeEventListener("hashchange", updateSelected);
    };
  }, [pathname]);

  if (!isClient) return null;

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Contact", href: "/#contact", icon: Mail },
  ];

  return (
    <motion.nav
      className="fixed top-4  left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="flex p-2  items-center gap-3 rounded-full border border-neutral-200/60 bg-linear-to-tl from-neutral-50/80 via-neutral-100/80 to-neutral-50/80 py-1.5 shadow-[0_4px_16px_rgba(var(--glow-color),0.08)] backdrop-blur-xl"
      >
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={selected === index}
            >
              <Link
                href={item.href}
                onClick={() => setSelected(index)}
                className={cn(
                  "relative flex items-center rounded-full px-3 py-2.5 my-0.5 text-sm font-medium transition-colors duration-200",
                  selected === index
                    ? "bg-neutral-800 text-background "
                    : "text-neutral-700 hover:bg-card hover:text-foreground"
                )}
                aria-label={item.name}
              >
                <Icon size={20} className="shrink-0" />

                <AnimatePresence initial={false}>
                  {selected === index && (
                    <motion.div variants={spanVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit" className="hidden md:flex items-center gap-2">
                      <motion.div

                        className="w-.5  "
                      />
                      <motion.span

                        className="overflow-hidden whitespace-nowrap"
                      >

                        {item.name}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}

        <div className="mx-0.5 h-6 w-px bg-neutral-300/60" />

        <AnimatedThemeToggler
          duration={400}
          className="relative mr-2 flex items-center rounded-full px-3 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:bg-neutral-100 hover:text-foreground"
        />
      </div>
    </motion.nav>
  );
}
