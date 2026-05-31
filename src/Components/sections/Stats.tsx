"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconBrandLinkedin, IconBrandDiscord } from "@tabler/icons-react";
import { RiTwitterXLine } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";
import SpotlightCard from "../ui/SpotlightCard";

interface WakaTimeStats {
    humanReadableTotal: string;
    error?: string;
}

export default function Stats() {
    const [wakaTime, setWakaTime] = useState<WakaTimeStats | null>(null);
    const [loading, setLoading] = useState(true);
    const { resolvedTheme } = useTheme();
    const colorScheme = resolvedTheme === "light" ? "light" : "dark";

    useEffect(() => {
        const STORAGE_KEY = 'wakatime_stats';
        const STORAGE_DATE_KEY = 'wakatime_stats_date';

        const fetchWakaTimeStats = async () => {
            try {
                const response = await fetch('/api/wakatime');
                const data = await response.json();

                // Store in localStorage with current date
                const today = new Date().toDateString();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                localStorage.setItem(STORAGE_DATE_KEY, today);

                setWakaTime(data);
            } catch (error) {
                console.error('Failed to fetch WakaTime stats:', error);
                setWakaTime({ humanReadableTotal: '53h', error: 'Failed to load' });
            } finally {
                setLoading(false);
            }
        };

        const loadWakaTimeStats = () => {
            const today = new Date().toDateString();
            const cachedDate = localStorage.getItem(STORAGE_DATE_KEY);
            const cachedData = localStorage.getItem(STORAGE_KEY);

            // Check if we have cached data for today
            if (cachedDate === today && cachedData) {
                try {
                    const parsedData = JSON.parse(cachedData);
                    setWakaTime(parsedData);
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to parse cached data:', error);
                    fetchWakaTimeStats();
                }
            } else {
                // Fetch fresh data if date doesn't match or no cache exists
                fetchWakaTimeStats();
            }
        };

        loadWakaTimeStats();
    }, []);

    return (
        <section className="py-10 relative z-20 px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">

                {/* GitHub Repo Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 h-48"
                >
                    <Link href="https://github.com/cyberboyayush/cappychat" target="_blank" className="h-full block">
                        <div className="h-full flex flex-col justify-between  border border-neutral-300/70 rounded-xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png')] bg-cover bg-center opacity-100 blur-[2px] transition-opacity duration-500 " />


                            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="h-10 w-10 rounded-full bg-background/50 backdrop-blur-md border border-neutral-300 flex items-center justify-center">
                                        <IconBrandGithub className="w-6 h-6 text-foreground" />
                                    </div>
                                    <span className="bg-background/50 backdrop-blur-md border border-neutral-200 text-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3" /> Stars
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                                        cappychat
                                        <span className="text-slate-100 font-normal text-sm">/ cyberboyayush</span>
                                    </h3>
                                    <p className="text-slate-50 text-sm line-clamp-1">
                                        Next-generation AI chat platform engineered for performance and scalability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Avatar Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 h-48 rounded-xl shadow-sm"
                >
                    <Link href="https://github.com/VrandaaGarg/" target="_blank" className="h-full block">
                        <div className="h-full bg-card border border-neutral-200 rounded-xl relative overflow-hidden p-0">
                            <Image
                                src="https://github.com/VrandaaGarg.png"
                                alt="Avatar"
                                fill
                                className="object-cover blur-[1px] transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 right-3 bg-neutral-900 backdrop-blur-sm p-2 rounded-full border border-white/10">
                                <ArrowUpRight className="w-4 h-4 text-background" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-neutral-200 to-transparent">
                                <p className="text-foreground font-bold  ">Vranda Garg</p>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Socials & WakaTime */}
                <div className="md:col-span-1 flex flex-col gap-4 h-48">
                    <div className="flex gap-4 h-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="flex-1 shadow-sm rounded-xl"
                        >
                            <Link href="https://www.linkedin.com/in/vrandagarg/" target="_blank" className="h-full block">
                                <div className="h-full bg-[#0077b5] border border-neutral-300 rounded-xl flex items-center justify-center hover:brightness-110 transition-all">
                                    <IconBrandLinkedin className="w-8 h-8 text-white" />
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="flex-1 shadow-sm rounded-xl"
                        >
                            <Link href="https://x.com/vrandaagarg" target="_blank" className="h-full block">
                                <SpotlightCard
                                    className="h-full bg-card rounded-xl flex items-center justify-center hover:bg-neutral-100 transition-all"
                                    spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
                                >
                                    <div className="flex items-center justify-center h-full w-full">
                                        <RiTwitterXLine className="w-8 h-8 text-foreground" />
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="h-1/2"
                    >
                        <SpotlightCard
                            className="h-full bg-card hover:bg-neutral-100 transition-all shadow-sm rounded-xl flex items-center justify-center relative overflow-hidden"
                            spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
                        >
                          <div className="h-full w-full flex items-center justify-center">
                              <div className="text-center relative z-10 rotate-2">
                                <Code className="w-6 mx-auto h-6 text-neutral-400 mb-1" />
                                <h3 className="text-md font-mono font-bold text-foreground">
                                    {loading ? '...' : wakaTime?.humanReadableTotal || '0h'}
                                </h3>
                                <p className="text-[10px] text-neutral-600">
                                    coding stats (last 7 days) <br />
                                </p>
                            </div>
                          </div>
                           
                        </SpotlightCard>
                    </motion.div>
                </div>

                {/* Discord Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="md:col-span-1 h-48"
                >
                    <SpotlightCard
                        className="h-full bg-card rounded-xl shadow flex items-center justify-center relative overflow-hidden group"
                        spotlightColor="rgba(var(--glow-color), var(--glow-opacity))"
                    >
                       <div className="h-full w-full flex items-center justify-center">
                         <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <IconBrandDiscord className="w-40 h-40 text-foreground rotate-12" />
                        </div>

                        <div className="relative z-10 text-center px-3">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-neutral-400 font-medium tracking-widest uppercase text-[10px]">Discord</span>
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">vrandagarg</h3>
                            <p className="text-neutral-500 text-[10px] leading-tight">Let&apos;s chat about tech &amp; projects</p>
                        </div>
                       </div>
                    </SpotlightCard>
                </motion.div>

                {/* GitHub Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="md:col-span-3 h-48"
                >
                    <div className="h-full bg-card border border-neutral-300/70 rounded-xl px-4 py-3 flex flex-col shadow-sm relative gh-cal-wrapper overflow-hidden">
                        <div className="mb-1 shrink-0">
                            <span className="text-sm font-semibold text-foreground">
                                GitHub Contributions
                            </span>
                        </div>
                        <div className="w-full flex-1 flex items-center">
                            <GitHubCalendar
                                username="VrandaaGarg"
                                colorScheme={colorScheme}
                                theme={{
                                    light: ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
                                    dark: ['#161B22', '#0E4429', '#006D32', '#26A641', '#39D353'],
                                }}
                                blockSize={8}
                                blockMargin={3}
                                blockRadius={2}
                                fontSize={11}
                                showColorLegend
                                showTotalCount
                                showMonthLabels
                                style={{ color: '#a3a3a3' }}
                                labels={{
                                    totalCount: '{{count}} contributions in {{year}}',
                                }}
                                tooltips={{
                                    activity: {
                                        text: (activity) => {
                                            const formatted = new Date(activity.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            });
                                            return activity.count === 0
                                                ? `No contributions on ${formatted}`
                                                : `${activity.count} contribution${activity.count === 1 ? '' : 's'} on ${formatted}`;
                                        },
                                        offset: 8,
                                        withArrow: true,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
