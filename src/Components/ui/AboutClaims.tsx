"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface EvidenceItem {
  label: string;
  detail: string;
  href?: string;
}

interface Claim {
  id: string;
  prefix: string;
  highlight: string;
  suffix: string;
  reason: string;
  evidence: EvidenceItem[];
}

const claims: Claim[] = [
  {
    id: "ai-products",
    prefix: "Full Stack Developer who ",
    highlight: "ships AI-powered products",
    suffix: " that real users rely on.",
    reason: "Production-ready AI apps built for real users and real workflows.",
    evidence: [
      { label: "CappyChat", detail: "30+ AI models, real-time sync across devices.", href: "/projects/cappychat" },
      { label: "MemContext", detail: "Memory layer for agents.", href: "/projects/memcontext" },
      { label: "Bashio", detail: "AI CLI on npm.", href: "/projects/bashio" },
      { label: "ResuMate", detail: "AI resume builder.", href: "/projects/resumate" },
    ],
  },
  {
    id: "end-to-end",
    prefix: " I focus on ",
    highlight: "end-to-end implementation",
    suffix: ", UI to API to infra.",
    reason: "I take projects from empty repo to deployed product.",
    evidence: [
      { label: "MUJ General", detail: "Next.js + Drizzle + Neon + Better Auth + R2.", href: "/projects/muj-general" },
      { label: "CappyChat", detail: "Real-time chat with AI integration.", href: "/projects/cappychat" },
      { label: "Quoridor", detail: "SSE + Upstash Redis real-time.", href: "/projects/quoridor-online" },
    ],
  },
  {
    id: "ux-quality",
    prefix: " I care about ",
    highlight: "high-quality user experience",
    suffix: ", motion and polish included.",
    reason: "Giving high-quality UX is a core part of my work.",
    evidence: [
      { label: "MemContext", detail: "Full marketing site + dashboard UI.", href: "/projects/memcontext" },
      { label: "CappyUI", detail: "Animated component library.", href: "/projects/cappyui" },
      { label: "Quoridor", detail: "Polished real-time game UI.", href: "/projects/quoridor-online" },
    ],
  },
  {
    id: "ship-fast",
    prefix: " I ",
    highlight: "ship fast under deadlines",
    suffix: " without dropping quality.",
    reason: "Tight timelines do not slow me down.",
    evidence: [
      { label: "Quoridor", detail: "Multiplayer game in 2 days.", href: "/projects/quoridor-online" },
      { label: "MUJ General", detail: "Full repository in 4 days.", href: "/projects/muj-general" },
      { label: "SkillCompass", detail: "48-hour hackathon build.", href: "/projects/skillcompass" },
      { label: "Bashio", detail: "Multi-provider AI CLI in 1 week.", href: "/projects/bashio" },
    ],
  },
  {
    id: "internal-tools",
    prefix: " And I love building ",
    highlight: "internal tools that lift team productivity",
    suffix: ".",
    reason: "Tools that lift team productivity and help everyone ship faster.",
    evidence: [
      { label: "Kakiyo", detail: "Built the hiring platform and an AI-assisted content dashboard the team uses daily.", href: "/#experience" },
      { label: "CappyUI", detail: "Shared component library.", href: "/projects/cappyui" },
    ],
  },
];

export default function AboutClaims() {
  const [openClaim, setOpenClaim] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenClaim((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-2">
      <div className="text-md md:text-lg text-center md:text-left text-neutral-600 leading-relaxed">
        {claims.map((claim) => {
          const isOpen = openClaim === claim.id;
          return (
            <Fragment key={claim.id}>
              <span>{claim.prefix}</span>
              <button
                onClick={() => toggle(claim.id)}
                className={`inline cursor-pointer rounded px-1 -mx-1 text-neutral-600 hover:bg-neutral-200 transition-colors underline-offset-4 decoration-dotted decoration-neutral-400 ${
                  isOpen ? "bg-neutral-200 underline" : ""
                }`}
                aria-expanded={isOpen}
                aria-label={`Show evidence for: ${claim.highlight}`}
              >
                {claim.highlight}
              </button>
              <span>{claim.suffix}</span>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block overflow-hidden my-2"
                  >
                    <div className="pl-4 border-l-2 border-foreground py-1">
                      <div className="text-xs md:text-sm text-neutral-600 leading-relaxed">
                        <span className="text-foreground">{claim.reason}</span>{" "}
                        {claim.evidence.map((item, idx) => (
                          <Fragment key={item.label}>
                            {item.href ? (
                              <Link
                                href={item.href}
                                className="group inline-flex items-baseline gap-0.5 font-semibold text-foreground hover:underline decoration-neutral-400 underline-offset-4"
                              >
                                {item.label}
                                <ExternalLink className="w-3 h-3 self-center text-neutral-400 group-hover:text-foreground transition-colors" />
                              </Link>
                            ) : (
                              <span className="font-semibold text-foreground">
                                {item.label}
                              </span>
                            )}
                            <span> {item.detail}</span>
                            {idx < claim.evidence.length - 1 && <span> </span>}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Fragment>
          );
        })}
      </div>

    </div>
  );
}
