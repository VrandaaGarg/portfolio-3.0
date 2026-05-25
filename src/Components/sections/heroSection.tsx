"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import RotatingText from "../ui/RotatingText";
import Skills from "./skills";
import Stats from "./Stats";
import Projects from "./projects";
import Experience from "./experience";
import Contact from "./contact";
import PixelTransition from "../ui/PixelTransition";
import AboutClaims from "../ui/AboutClaims";
import SkillsMarquee from "../ui/SkillsMarquee";
import Image from "next/image";
import Link from "next/link";
import { socialLinks, type SocialLink } from "@/data/social";
import { Mail, Plus } from "lucide-react";
import { HiOutlineDocumentText } from "react-icons/hi2";

function SocialIconWithTooltip({
  link,
  index,
}: {
  link: SocialLink;
  index: number;
}) {
  const Icon = link.icon;
  const [isHovered, setIsHovered] = React.useState(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.5 + index * 0.1,
      }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all duration-200 group"
          aria-label={link.title}
          onMouseMove={handleMouseMove}
        >
          <Icon className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors duration-200" />
        </Link>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-lg border border-foreground bg-foreground z-50 shadow-xl px-4 py-1.5"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-linear-to-r from-transparent via-emerald-500 to-transparent h-px" />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-linear-to-r from-transparent via-sky-500 to-transparent h-px" />
            <div className="font-bold text-background relative z-30 text-sm">
              {link.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HeroSection() {
  const roles = [
    "A Full Stack Developer",
    "A Frontend Expert",
    "A Website Designer",
  ];

  return (
    <section className="min-h-screen max-w-4xl mx-auto flex items-center justify-center ">
      <div className="w-full border-l border-r border-neutral-200 relative">
        <div className=" mt-24  mx-4 md:mx-8 bg-card border border-neutral-200 shadow-sm rounded-2xl p-5 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-2 md:space-y-4"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 lg:gap-8">
              <div className="flex-1">
                <h1 className="text-2xl text-center md:text-left md:text-5xl font-semibold text-foreground">
                  Hi,I&apos;m

                </h1>
                <h1 className="text-2xl text-center md:text-left md:text-6xl mt-2 font-semibold text-foreground">
                  Vranda Garg
                </h1>

                <div className="text-xl flex items-center justify-center md:justify-start gap-2 md:text-4xl font-semibold text-neutral-700 mt-4">

                  <RotatingText
                    texts={roles}
                    rotationInterval={3000}
                    staggerDuration={0.015}
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    mainClassName="px-3 text-lg md:text-4xl bg-gradient-to-tl from-neutral-100 to-neutral-300 text-neutral-900 overflow-hidden py-2 justify-center rounded-lg border border-neutral-200"
                    splitLevelClassName="overflow-hidden md:pb-1"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="shrink-0"
              >
                <div className="w-28 h-28 md:w-40 md:h-40">
                  <PixelTransition
                    firstContent={
                      <Image
                        src="https://res.cloudinary.com/dyetf2h9n/image/upload/v1763065667/032c0f5b-f53e-4c4f-be53-d5697d0872a0_oczzk2.png"
                        alt="Vranda Garg"
                        width={400}
                        height={400}
                        className="w-full bg-neutral-200 h-full object-cover"
                      />
                    }
                    secondContent={
                      <Image
                        src="https://github.com/VrandaaGarg.png"
                        alt="Vranda Garg"
                        width={400}
                        height={400}
                        className="w-full bg-neutral-200 h-full object-cover"
                      />
                    }
                    gridSize={12}
                    pixelColor="var(--background)"
                    once={false}
                    animationStepDuration={0.4}
                    aspectRatio="100%"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="space-y-3 my-4 md:my-8"
            >
              <AboutClaims />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col  items-center sm:items-start gap-4"
            >
              <div className="flex flex-nowrap justify-center gap-3 text-center">
                <Link
                  href="#contact"
                  className="group w-full md:w-auto relative inline-flex h-8 md:h-12 items-center outline-1 outline-neutral-50 justify-center overflow-hidden rounded-lg border border-neutral-300 font-medium"
                >

                  <div className="inline-flex w-full md:w-auto text-sm md:text-base h-8 md:h-12 items-center justify-center bg-neutral-800 hover:bg-neutral-700 px-6 text-background">
                    <Mail className="md:w-4 md:h-4 h-3 w-3 mr-2" />
                    Contact
                  </div>
                </Link>
                <Link
                  href="/VrandaGargResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full md:w-auto  inline-flex text-sm md:text-base h-8 md:h-12 items-center outline-1 outline-neutral-50 justify-center overflow-hidden rounded-lg border border-neutral-200 font-medium"
                >
                  <div className="inline-flex w-full md:w-auto text-sm md:text-base h-8 md:h-12 items-center justify-center bg-linear-to-r from-neutral-200 via-neutral-100 to-neutral-200 hover:from-neutral-100 hover:via-neutral-200 hover:to-neutral-100 px-6 transition-colors text-foreground">
                    <HiOutlineDocumentText className="md:w-4 md:h-4 h-3 w-3 mr-2" />
                    Resume
                  </div>
                </Link>
              </div>

              <div className="flex mx-auto md:mx-0 justify-center md:justify-start items-center gap-4">
                {socialLinks.map((link, index) => (
                  <SocialIconWithTooltip
                    key={link.title}
                    link={link}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="border-t border-neutral-200 mt-16 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <SkillsMarquee />

        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <Skills />
        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <Stats />
        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <Experience />
        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <Projects limit={4} />
        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
        <Contact />
        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
      </div>
    </section>
  );
}
