"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import Image from "@/Components/ui/Image";
import Link from "@/Components/ui/Link";
import { IconBrandGithub } from "@tabler/icons-react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import SpotlightCard from "./SpotlightCard";
import { getOptimizedMediaUrl } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  video?: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({
  name,
  description,
  image,
  video,
  techStack,
  githubUrl,
  liveDemoUrl,
  index,
  featured,
}: ProjectCardProps) {
  const hasVideo = !!video;
  const [showVideo, setShowVideo] = useState(hasVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const projectSlug = name.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    if (!videoRef.current || !showVideo) return;

    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.currentTime = 0;
            videoElement.play();
          } else {
            videoElement.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => observer.disconnect();
  }, [showVideo]);

  const handleCardClick = () => {
    navigate({ to: "/projects/$name", params: { name: projectSlug } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <SpotlightCard
        className="group h-full bg-neutral-100 border-neutral-200 transition-all duration-300 flex flex-col cursor-pointer"
        spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
        onClick={handleCardClick}
      >
        <div className="relative h-48 w-full overflow-hidden">
          {featured && (
            <div className="absolute top-3 right-3 z-20">
              {/* offset black shadow layer */}
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black rounded-md" />
              <div className="relative inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-lime-300 text-black border-2 border-black">
                <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                Featured
              </div>
            </div>
          )}
          {hasVideo && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo((prev) => !prev);
                }}
                className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all bg-black/50 text-white hover:bg-black/70"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVideo((prev) => !prev);
                }}
                className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all bg-black/50 text-white hover:bg-black/70"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {showVideo && video ? (
            <video
              ref={videoRef}
              src={getOptimizedMediaUrl(video, "video")}
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              className="w-full h-full object-cover pointer-events-none"
            />
          ) : (
            <Image
              src={getOptimizedMediaUrl(image, "image")}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="p-3 md:p-6 flex flex-col grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl md:text-2xl font-bold text-foreground hover:underline decoration-neutral-400 underline-offset-4 transition-all">
              {name}
            </h3>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full border border-neutral-300 bg-card hover:bg-neutral-200 transition-colors z-10"
              aria-label="View GitHub"
            >
              <IconBrandGithub className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          <div className="text-sm text-left text-neutral-600 mb-2 md:mb-4 leading-relaxed line-clamp-3 grow prose prose-sm prose-neutral max-w-none">
            <ReactMarkdown
              components={{
                strong: ({ children }) => (
                  <strong className="font-bold text-neutral-700">
                    {children}
                  </strong>
                ),
                p: ({ children }) => <span>{children}</span>,
              }}
            >
              {description}
            </ReactMarkdown>
          </div>

          <div className="flex flex-wrap gap-2 mb-3 md:mb-6">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-lg border border-neutral-300 bg-card text-foreground"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-3 py-1 text-xs rounded-lg border border-neutral-300 bg-card text-foreground">
                +{techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-auto z-10 relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate({ to: "/projects/$name", params: { name: projectSlug } });
              }}
              className="flex-1 px-4 py-2.5 rounded-lg border border-foreground bg-neutral-800 text-background hover:bg-neutral-950 transition-colors text-center text-sm font-medium cursor-pointer"
            >
              Details
            </button>
            {liveDemoUrl && (
              <Link
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-4 py-2.5 bg-card hover:bg-neutral-100 rounded-lg border border-neutral-300 hover:border-neutral-400 transition-colors text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
              >
                Live
              </Link>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
