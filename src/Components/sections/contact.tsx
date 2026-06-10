"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks } from "@/data/social";
import {
    Check,
    Play,
    CalendarClock,
    Loader2,
    AlertCircle,
    Code2,
    MessageSquare,
    Send,
    Files,
    Search,
    GitBranch,
    Settings,
    ChevronRight,
    ChevronDown,
    FileCode,
    Blocks
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import Magnetic from "@/Components/ui/Magnetic";
import RotatingText from "@/Components/ui/RotatingText";
import { calButtonConfig, calLink, calNamespace } from "@/lib/cal";

export default function Contact() {
    const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [view, setView] = useState<"technical" | "non-technical">("technical");
    const [activeFile, setActiveFile] = useState<"contact.tsx" | "socialLinks.tsx" | "meeting.tsx">("contact.tsx");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFormState("submitting");

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormState("success");
                (event.target as HTMLFormElement).reset();
            } else {
                setFormState("error");
            }
        } catch {
            setFormState("error");
        }
    }

    return (
        <section id="contact" className="w-full py-10 md:py-20 px-4 md:px-8 relative overflow-hidden  ">
            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="text-center mb-3 md:mb-6 space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                            Let&apos;s work on
                        </h2>
                        <div className="h-14 md:h-16 flex items-center justify-center md:mt-2 overflow-hidden">
                            <RotatingText
                                texts={["New Projects", "Collaborations", "Ideas", "Growth"]}
                                rotationInterval={2000}
                                staggerDuration={0.02}
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                mainClassName="text-3xl md:text-5xl font-bold text-foreground "
                                splitLevelClassName="overflow-hidden pb-2"
                            />
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-neutral-600 leading-tight  text-md max-w-lg mx-auto"
                    >
                        Whether you have a question, a project proposal, or just want to say hi, I&apos;ll try my best to get back to you!
                    </motion.p>
                </div>

                {/* View Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-5"
                >
                    <div className="bg-card backdrop-blur-xs p-1.5 rounded-xl border border-neutral-200  inline-flex items-center gap-1 shadow-inner">
                        {[
                            { id: "non-technical" as const, icon: MessageSquare, label: "Standard" },
                            { id: "technical" as const, icon: Code2, label: "Developer" }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={cn(
                                    "px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 relative",
                                    view === item.id ? "text-background " : "text-neutral-600  hover:text-neutral-700 "
                                )}
                            >
                                {view === item.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 "
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Card Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="bg-card  backdrop-blur-sm border border-neutral-200  rounded-xl shadow-sm overflow-hidden">
                        <div className="relative min-h-[450px]">
                            <AnimatePresence mode="wait">
                                {view === "technical" ? (
                                    <motion.div
                                        key="technical"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="w-full h-full bg-card rounded-xl overflow-hidden font-mono text-sm shadow-inner  flex flex-col"
                                    >
                                        {/* VS Code Header */}
                                        <div className="bg-neutral-100 px-4 py-3 flex items-center justify-between border-b border-neutral-100 select-none  outline-none">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1.5 mr-4">
                                                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                                                </div>
                                                <div className="hidden md:flex items-center gap-2 text-neutral-700 text-xs">
                                                    <span>portfolio</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                    <span>src</span>
                                                    <ChevronRight className="w-3 h-3" />
                                                    {/* <span>components</span>
                                                    <ChevronRight className="w-3 h-3" /> */}
                                                    <span className="text-foreground">{activeFile}</span>
                                                </div>
                                            </div>
                                            <div className="text-xs text-neutral-700 flex items-center gap-3">
                                                <div className="hidden  w-40 h-6 bg-neutral-200 border border-neutral-300 rounded md:flex items-center justify-start pl-2">
                                                    <Search className="w-3 h-3 mr-2" />
                                                    portfolio
                                                </div>
                                            </div>
                                        </div>

                                        {/* IDE Body */}
                                        <div className="flex flex-1 overflow-hidden  outline-none">
                                            {/* Activity Bar */}
                                            <div className="w-8 min-h-[430px] md:w-12 bg-neutral-100 flex flex-col items-center py-4 gap-6 text-neutral-700 border-r border-t border-neutral-200 shrink-0 z-10  outline-none">
                                                <div className="text-neutral-800 border-l-2 border-blue-400 pl-2 pr-2 ">
                                                    <Files className="md:w-6 h-4 md:h-6 w-4" />
                                                </div>
                                                <Search className="md:w-6 h-4 md:h-6 w-4 text-neutral-950 transition-colors cursor-pointer" />
                                                <GitBranch className="md:w-6 h-4 md:h-6 w-4 text-neutral-950 transition-colors cursor-pointer" />
                                                <Blocks className="md:w-6 h-4 md:h-6 w-4 text-neutral-950 transition-colors cursor-pointer" />
                                                <div className="mt-auto">
                                                    <Settings className="md:w-6 h-4 md:h-6 w-4 text-neutral-950 transition-colors cursor-pointer" />
                                                </div>
                                            </div>

                                            {/* Explorer Pane */}
                                            <div className="w-48 bg-neutral-100 min-h-[400px] border-r border-t border-neutral-200 hidden md:flex flex-col text-neutral-700 shrink-0  outline-none">
                                                <div className="text-[11px] font-bold px-4 py-3 text-neutral-700">EXPLORER</div>
                                                <div className="px-2">
                                                    <div className="flex items-center gap-1 py-1 px-2 text-xs font-bold text-blue-400 hover:bg-card cursor-pointer rounded-sm outline-none focus:outline-none ring-0">
                                                        <ChevronDown className="w-3 h-3" />
                                                        PORTFOLIO
                                                    </div>
                                                    <div className="pl-3">
                                                        <div className="flex items-center gap-1 py-1 px-2 text-xs hover:bg-card cursor-pointer rounded-sm select-none">
                                                            <ChevronRight className="w-3 h-3 text-neutral-700" />
                                                            <span className="text-neutral-700">.output</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 py-1 px-2 text-xs hover:bg-card cursor-pointer rounded-sm select-none">
                                                            <ChevronDown className="w-3 h-3 text-neutral-700" />
                                                            <span className="text-neutral-700">src</span>
                                                        </div>
                                                        <div className="pl-4">
                                                            <div
                                                                onClick={() => setActiveFile("contact.tsx")}
                                                                onMouseDown={(e) => e.preventDefault()}
                                                                className={cn(
                                                                    "flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm transition-colors select-none",
                                                                    activeFile === "contact.tsx" ? "bg-card border border-neutral-200 text-foreground" : "text-neutral-700 hover:bg-card border border-transparent"
                                                                )}
                                                                tabIndex={-1}
                                                            >
                                                                <FileCode className="w-3 h-3 text-blue-400" />
                                                                contact.tsx
                                                            </div>
                                                            <div
                                                                onClick={() => setActiveFile("socialLinks.tsx")}
                                                                onMouseDown={(e) => e.preventDefault()}
                                                                className={cn(
                                                                    "flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm transition-colors select-none",
                                                                    activeFile === "socialLinks.tsx" ? "bg-card border border-neutral-200 text-foreground" : "text-neutral-700 hover:bg-card border border-transparent"
                                                                )}
                                                                tabIndex={-1}
                                                            >
                                                                <FileCode className="w-3 h-3 text-yellow-400" />
                                                                socialLinks.tsx
                                                            </div>
                                                            <div
                                                                onClick={() => setActiveFile("meeting.tsx")}
                                                                onMouseDown={(e) => e.preventDefault()}
                                                                className={cn(
                                                                    "flex items-center gap-1 py-1 px-2 text-xs cursor-pointer rounded-sm transition-colors select-none",
                                                                    activeFile === "meeting.tsx" ? "bg-card border border-neutral-200 text-foreground" : "text-neutral-700 hover:bg-card border border-transparent"
                                                                )}
                                                                tabIndex={-1}
                                                            >
                                                                <FileCode className="w-3 h-3 text-green-400" />
                                                                meeting.tsx
                                                            </div>
                                                            <div className="flex items-center gap-1 py-1 px-2 text-xs hover:bg-card cursor-pointer rounded-sm select-none">
                                                                <FileCode className="w-3 h-3 text-blue-300" />
                                                                globals.css
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Editor Area */}
                                            <div className="flex-1 flex flex-col bg-neutral-100 min-w-0  outline-none">
                                                {/* Tab Bar */}
                                                <div className="flex bg-neutral-100 overflow-x-auto scrollbar-hide border-b border-t border-neutral-200  outline-none">
                                                    <div
                                                        onClick={() => setActiveFile("contact.tsx")}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={cn(
                                                            "flex items-center gap-2 px-3 py-2 border-t-2 text-xs cursor-pointer min-w-fit transition-colors select-none",
                                                            activeFile === "contact.tsx"
                                                                ? "bg-card rounded-t-sm border-t-blue-400 text-foreground"
                                                                : "bg-neutral-100 border-t-transparent text-[#969696] hover:bg-neutral-100"
                                                        )}
                                                        tabIndex={-1}
                                                    >
                                                        <FileCode className="w-3 h-3 text-blue-400" />
                                                        contact.tsx
                                                        <span className="ml-2 hover:bg-[#333] rounded-sm p-0.5">×</span>
                                                    </div>
                                                    <div
                                                        onClick={() => setActiveFile("socialLinks.tsx")}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={cn(
                                                            "flex items-center gap-2 px-3 py-2 border-t-2 text-xs cursor-pointer min-w-fit transition-colors select-none",
                                                            activeFile === "socialLinks.tsx"
                                                                ? "bg-card rounded-t-sm border-t-yellow-400 text-foreground"
                                                                : "bg-neutral-100 border-t-transparent  text-[#969696] hover:bg-neutral-100"
                                                        )}
                                                        tabIndex={-1}
                                                    >
                                                        <FileCode className="w-3 h-3 text-yellow-400" />
                                                        socialLinks.tsx
                                                        <span className="ml-2 hover:bg-[#333] rounded-sm p-0.5">×</span>
                                                    </div>
                                                    <div
                                                        onClick={() => setActiveFile("meeting.tsx")}
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        className={cn(
                                                            "flex items-center gap-2 px-3 py-2 border-t-2 text-xs cursor-pointer min-w-fit transition-colors select-none",
                                                            activeFile === "meeting.tsx"
                                                                ? "bg-card rounded-t-sm border-t-green-400 text-foreground"
                                                                : "bg-neutral-100 border-t-transparent  text-[#969696] hover:bg-neutral-100"
                                                        )}
                                                        tabIndex={-1}
                                                    >
                                                        <FileCode className="w-3 h-3 text-green-400" />
                                                        meeting.tsx
                                                        <span className="ml-2 hover:bg-[#333] rounded-sm p-0.5">×</span>
                                                    </div>
                                                </div>

                                                {/* Editor Content */}
                                                <div className="md:p-6 min-h-[400px] bg-card overflow-auto flex-1">
                                                    {activeFile === "contact.tsx" ? (
                                                        formState === "success" ? (
                                                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
                                                                >
                                                                    <Check className="w-8 h-8 text-green-500" />
                                                                </motion.div>
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-neutral-700">Message Sent!</h3>
                                                                    <p className="text-neutral-500 mt-1 text-xs">Function execution completed successfully.</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => setFormState("idle")}
                                                                    className="text-blue-400 hover:text-blue-300 text-xs underline decoration-dashed underline-offset-4"
                                                                >
                                                                    reset_form()
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <form onSubmit={handleSubmit} className="space-y-1.5 min-h-[400px] relative font-mono text-[13px] md:text-sm leading-relaxed">
                                                                <div className="flex group">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">1</span>
                                                                    <div className="flex flex-wrap">
                                                                        <span className="text-[#c678dd]">const</span>&nbsp;
                                                                        <span className="text-[#61afef]">sendMessage</span>&nbsp;
                                                                        <span className="text-neutral-400">=</span>&nbsp;
                                                                        <span className="text-[#c678dd]">async</span>&nbsp;
                                                                        <span className="text-neutral-400">(</span>
                                                                        <span className="text-[#e06c75]">data</span>
                                                                        <span className="text-neutral-400">)</span>&nbsp;
                                                                        <span className="text-[#c678dd]">=&gt;</span>&nbsp;
                                                                        <span className="text-neutral-400">{`{`}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex group items-baseline">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">2</span>
                                                                    <div className="flex-1 flex flex-wrap items-center">
                                                                        <span className="text-[#e06c75] ml-4">name</span>
                                                                        <span className="text-neutral-400">:</span>&nbsp;
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <input
                                                                            type="text"
                                                                            name="name"
                                                                            required
                                                                            placeholder="Your Name"
                                                                            className="bg-transparent  outline-none text-[#98c379] placeholder-[#98c379]/60 min-w-[100px] flex-1 p-0 focus:ring-0 h-auto"
                                                                        />
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex group items-baseline">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">3</span>
                                                                    <div className="flex-1 flex flex-wrap items-center">
                                                                        <span className="text-[#e06c75] ml-4">email</span>
                                                                        <span className="text-neutral-400">:</span>&nbsp;
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <input
                                                                            type="email"
                                                                            name="email"
                                                                            required
                                                                            placeholder="you@email.com"
                                                                            className="bg-transparent  outline-none text-[#98c379] placeholder-[#98c379]/60 min-w-[100px] flex-1 p-0 focus:ring-0 h-auto"
                                                                        />
                                                                        <span className="text-[#98c379]">&quot;</span>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex group items-start">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none pt-1">4</span>
                                                                    <div className="flex-1 flex flex-wrap">
                                                                        <span className="text-[#e06c75] ml-4 pt-1">message</span>
                                                                        <span className="text-neutral-400 pt-1">:</span>&nbsp;
                                                                        <span className="text-[#98c379] pt-1">&quot;</span>
                                                                        <textarea
                                                                            name="message"
                                                                            required
                                                                            rows={2}
                                                                            placeholder="Let's build something cool..."
                                                                            className="bg-transparent  outline-none text-[#98c379] placeholder-[#98c379]/60 w-full p-0 focus:ring-0 resize-none leading-relaxed pt-1"
                                                                        />
                                                                        <span className="text-[#98c379] pt-1">&quot;</span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex group">
                                                                    <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">5</span>
                                                                    <span className="text-neutral-400">{`}`}</span>
                                                                </div>

                                                                <div className="mt-8 absolute bottom-4 right-4 flex justify-end">
                                                                    <button
                                                                        type="submit"
                                                                        disabled={formState === "submitting"}
                                                                        className="group flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-950 cursor-pointer text-neutral-200 border border-neutral-700 text-xs font-mono transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        {formState === "submitting" ? (
                                                                            <>
                                                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                                <span>Processing...</span>
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <Play className="w-3.5 h-3.5 fill-current text-green-400 group-hover:text-green-300" />
                                                                                <span>Run Script</span>
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                             </form>
                                                         )
                                                     ) : activeFile === "socialLinks.tsx" ? (
                                                         // Social Links Code View
                                                         <div className="space-y-1.5 font-mono text-[13px] md:text-sm leading-relaxed">
                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">1</span>
                                                                <div className="flex flex-wrap">
                                                                    <span className="text-[#c678dd]">export</span>&nbsp;
                                                                    <span className="text-[#c678dd]">const</span>&nbsp;
                                                                    <span className="text-[#e5c07b]">socialLinks</span>&nbsp;
                                                                    <span className="text-neutral-400">=</span>&nbsp;
                                                                    <span className="text-neutral-400">[</span>
                                                                </div>
                                                            </div>
                                                            {socialLinks.map((link, index) => (
                                                                <div key={link.title} className="group">
                                                                    <div className="flex">
                                                                        <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">{index * 4 + 2}</span>
                                                                        <span className="text-neutral-400 ml-4">{`{`}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">{index * 4 + 3}</span>
                                                                        <span className="text-[#e06c75] ml-8">name</span>
                                                                        <span className="text-neutral-400">:</span>&nbsp;
                                                                        <span className="text-[#98c379]">&quot;{link.title}&quot;</span>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">{index * 4 + 4}</span>
                                                                        <span className="text-[#e06c75] ml-8">url</span>
                                                                        <span className="text-neutral-400">:</span>&nbsp;
                                                                        <a
                                                                            href={link.href}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-[#98c379] hover:underline decoration-dashed underline-offset-4 cursor-pointer"
                                                                        >
                                                                            &quot;{link.href}&quot;
                                                                        </a>
                                                                        <span className="text-neutral-400">,</span>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">{index * 4 + 5}</span>
                                                                        <span className="text-neutral-400 ml-4">{`},`}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6  text-right mr-2 shrink-0 md:mr-4 select-none">{(socialLinks.length * 4) + 2}</span>
                                                                <span className="text-neutral-400">];</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // Meeting Config Code View
                                                        <div className="space-y-1.5 min-h-[400px] relative font-mono text-[13px] md:text-sm leading-relaxed">
                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">1</span>
                                                                <div className="flex flex-wrap">
                                                                    <span className="text-[#c678dd]">const</span>&nbsp;
                                                                    <span className="text-[#e5c07b]">meeting</span>&nbsp;
                                                                    <span className="text-neutral-400">=</span>&nbsp;
                                                                    <span className="text-neutral-400">{`{`}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex group items-baseline">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">2</span>
                                                                <div className="flex-1 flex flex-wrap items-center">
                                                                    <span className="text-[#e06c75] ml-4">type</span>
                                                                    <span className="text-neutral-400">:</span>&nbsp;
                                                                    <span className="text-[#98c379]">&quot;Introduction Call&quot;</span>
                                                                    <span className="text-neutral-400">,</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex group items-baseline">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">3</span>
                                                                <div className="flex-1 flex flex-wrap items-center">
                                                                    <span className="text-[#e06c75] ml-4">duration</span>
                                                                    <span className="text-neutral-400">:</span>&nbsp;
                                                                    <span className="text-[#d19a66]">30</span>
                                                                    <span className="text-neutral-400">,</span>&nbsp;
                                                                    <span className="text-[#5c6370] italic">{`// minutes`}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex group items-baseline">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">4</span>
                                                                <div className="flex-1 flex flex-wrap items-center">
                                                                    <span className="text-[#e06c75] ml-4">platform</span>
                                                                    <span className="text-neutral-400">:</span>&nbsp;
                                                                    <span className="text-[#98c379]">&quot;Google Meet&quot;</span>
                                                                    <span className="text-neutral-400">,</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex group items-baseline">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">5</span>
                                                                <div className="flex-1 flex flex-wrap items-center">
                                                                    <span className="text-[#e06c75] ml-4">topics</span>
                                                                    <span className="text-neutral-400">:</span>&nbsp;
                                                                    <span className="text-neutral-400">[</span>
                                                                    <span className="text-[#98c379]">&quot;ideas&quot;</span>
                                                                    <span className="text-neutral-400">,</span>&nbsp;
                                                                    <span className="text-[#98c379]">&quot;projects&quot;</span>
                                                                    <span className="text-neutral-400">,</span>&nbsp;
                                                                    <span className="text-[#98c379]">&quot;collab&quot;</span>
                                                                    <span className="text-neutral-400">],</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">6</span>
                                                                <span className="text-neutral-400">{`};`}</span>
                                                            </div>

                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">7</span>
                                                                <span>&nbsp;</span>
                                                            </div>

                                                            <div className="flex group">
                                                                <span className="text-[#495162] w-6 md:w-8 text-right mr-2 shrink-0 md:mr-4 select-none">8</span>
                                                                <div className="flex flex-wrap">
                                                                    <span className="text-[#61afef]">bookCall</span>
                                                                    <span className="text-neutral-400">(</span>
                                                                    <span className="text-[#e5c07b]">meeting</span>
                                                                    <span className="text-neutral-400">);</span>
                                                                </div>
                                                            </div>

                                                            <div className="mt-8 absolute bottom-4 right-4 flex justify-end">
                                                                <button
                                                                    type="button"
                                                                    data-cal-link={calLink}
                                                                    data-cal-namespace={calNamespace}
                                                                    data-cal-config={calButtonConfig}
                                                                    className="group flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-950 cursor-pointer text-neutral-200 border border-neutral-700 text-xs font-mono transition-all"
                                                                >
                                                                    <CalendarClock className="w-3.5 h-3.5 text-green-400 group-hover:text-green-300" />
                                                                    <span>Book Meeting</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="non-technical"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="p-6 md:p-8"
                                    >
                                        {formState === "success" ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-12 text-center"
                                            >
                                                <div className="w-20 h-20 rounded-full bg-green-100  flex items-center justify-center mb-6 animate-pulse">
                                                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-neutral-800  mb-2">Message Received!</h3>
                                                <p className="text-neutral-500  mb-8 max-w-xs mx-auto">
                                                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setFormState("idle")}
                                                    className="rounded-full hover:bg-neutral-700 hover:text-background cursor-pointer text-background bg-foreground"
                                                >
                                                    Send another message
                                                </Button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name" className="text-neutral-600  font-medium">Name</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            placeholder="John Doe"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-50 border-neutral-200  focus:border-neutral-400  focus:ring-0 rounded-xl h-12 text-neutral-900  placeholder:text-neutral-700 "
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email" className="text-neutral-600  font-medium">Email</Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            placeholder="john@example.com"
                                                            required
                                                            disabled={formState === "submitting"}
                                                            className="bg-neutral-50  border-neutral-200  focus:border-neutral-400  focus:ring-0 rounded-xl h-12 text-neutral-900  placeholder:text-neutral-400 "
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="message" className="text-neutral-600  font-medium">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        name="message"
                                                        placeholder="Tell me about your project..."
                                                        className="bg-neutral-50  border-neutral-200  focus:border-neutral-400  focus:ring-0 rounded-xl min-h-[150px] resize-none p-4 text-neutral-900  placeholder:text-neutral-400 "
                                                        required
                                                        disabled={formState === "submitting"}
                                                    />
                                                </div>

                                                <div className="pt-2">
                                                    <Button
                                                        type="submit"
                                                        className="w-full h-12 cursor-pointer rounded-xl bg-neutral-900 hover:bg-neutral-800   text-background  font-medium transition-all hover:scale-[1.01]"
                                                        disabled={formState === "submitting"}
                                                    >
                                                        {formState === "submitting" ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Send Message
                                                                <Send className="w-4 h-4 ml-2" />
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                {formState === "error" && (
                                                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                                        <span>Something went wrong. Please try again later.</span>
                                                    </div>
                                                )}
                                            </form>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Footer / Socials */}
                {view === "non-technical" && (
                    <div className="flex flex-col items-center gap-4 md:gap-8">
                        <div className="h-px w-full max-w-xs bg-linear-to-r from-transparent via-neutral-200  to-transparent" />

                        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Magnetic key={link.title}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="md:w-12 md:h-12 w-10 h-10 flex items-center justify-center rounded-full bg-card  border border-neutral-200  shadow-sm hover:shadow-md text-neutral-600  hover:text-foreground  transition-all group"
                                            aria-label={link.title}
                                        >
                                            <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                        </a>
                                    </Magnetic>
                                );
                            })}

                            <Magnetic>
                                <button
                                    type="button"
                                    data-cal-link={calLink}
                                    data-cal-namespace={calNamespace}
                                    data-cal-config={calButtonConfig}
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-card  border border-neutral-200  shadow-sm hover:shadow-md text-neutral-600 cursor-pointer hover:text-foreground  transition-all group"
                                    aria-label="Schedule a call"
                                >
                                    <CalendarClock className="w-5 h-5 transition-transform group-hover:scale-110" />
                                </button>
                            </Magnetic>
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}
