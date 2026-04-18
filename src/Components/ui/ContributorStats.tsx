"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCommit, Plus, Minus, Loader2, AlertCircle, Users } from "lucide-react";
import type { ContributorStats as ContributorStatsType, GitHubStatsResponse } from "@/app/api/github-stats/route";
import SpotlightCard from "./SpotlightCard";

interface ContributorStatsProps {
  githubUrl: string;
}

interface CachedData {
  contributors: ContributorStatsType[];
  hasLineStats: boolean;
  timestamp: number;
}

type CacheStore = Record<string, CachedData>;

const CACHE_KEY = "contributor_stats_cache_v3";
const FULL_CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;
const PARTIAL_CACHE_EXPIRY_MS = 30 * 60 * 1000;
const MAX_CACHED_REPOS = 20; // Limit cache size

// Validate cached data structure
function isValidCachedData(data: unknown): data is CachedData {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  
  if (typeof obj.timestamp !== "number") return false;
  if (typeof obj.hasLineStats !== "boolean") return false;
  if (!Array.isArray(obj.contributors)) return false;
  
  // Validate first contributor structure if exists
  if (obj.contributors.length > 0) {
    const first = obj.contributors[0] as Record<string, unknown>;
    if (
      typeof first.login !== "string" ||
      typeof first.id !== "number" ||
      typeof first.totalCommits !== "number"
    ) {
      return false;
    }
  }
  
  return true;
}

// Cache utility functions
function getCache(): CacheStore {
  if (typeof window === "undefined") return {};
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return {};
    
    const parsed = JSON.parse(cached) as Record<string, unknown>;
    const validCache: CacheStore = {};
    
    // Validate each entry
    for (const [key, value] of Object.entries(parsed)) {
      if (isValidCachedData(value)) {
        validCache[key] = value;
      }
    }
    
    return validCache;
  } catch {
    // Clear corrupted cache
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch {
      // Ignore
    }
    return {};
  }
}

function getCacheExpiry(hasLineStats: boolean): number {
  return hasLineStats ? FULL_CACHE_EXPIRY_MS : PARTIAL_CACHE_EXPIRY_MS;
}

function getCachedData(repoUrl: string): {
  contributors: ContributorStatsType[] | null;
  hasLineStats: boolean;
  isExpired: boolean;
} {
  const cache = getCache();
  const data = cache[repoUrl];
  
  if (data?.contributors && data.contributors.length > 0) {
    const isExpired = Date.now() - data.timestamp > getCacheExpiry(data.hasLineStats);
    return {
      contributors: data.contributors,
      hasLineStats: data.hasLineStats,
      isExpired,
    };
  }
  
  return { contributors: null, hasLineStats: false, isExpired: true };
}

function setCachedData(
  repoUrl: string,
  contributors: ContributorStatsType[],
  hasLineStats: boolean
): void {
  if (typeof window === "undefined") return;
  
  try {
    const cache = getCache();
    
    // Remove expired entries and implement LRU eviction
    const now = Date.now();
    const entries = Object.entries(cache)
      .filter(([, data]) => now - data.timestamp <= getCacheExpiry(data.hasLineStats))
      .sort((a, b) => b[1].timestamp - a[1].timestamp);
    
    // Keep only MAX_CACHED_REPOS - 1 to make room for new entry
    const trimmedCache: CacheStore = {};
    for (let i = 0; i < Math.min(entries.length, MAX_CACHED_REPOS - 1); i++) {
      const [key, value] = entries[i];
      trimmedCache[key] = value;
    }
    
    // Add new entry
    trimmedCache[repoUrl] = {
      contributors,
      hasLineStats,
      timestamp: now,
    };
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(trimmedCache));
  } catch {
    // Storage might be full, clear and retry with just this entry
    try {
      localStorage.removeItem(CACHE_KEY);
      const newCache: CacheStore = {
        [repoUrl]: { contributors, hasLineStats, timestamp: Date.now() },
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCache));
    } catch {
      // Ignore if still failing
    }
  }
}

export default function ContributorStats({ githubUrl }: ContributorStatsProps) {
  const [contributors, setContributors] = useState<ContributorStatsType[]>([]);
  const [hasLineStats, setHasLineStats] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchFromAPI = useCallback(async (
    isBackgroundSync: boolean = false
  ): Promise<{ contributors: ContributorStatsType[]; hasLineStats: boolean } | null> => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      const response = await fetch(
        `/api/github-stats?repo=${encodeURIComponent(githubUrl)}`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        if (!isBackgroundSync && isMountedRef.current) {
          const data: GitHubStatsResponse = await response.json().catch(() => ({ success: false }));
          setError(data.error || "Failed to fetch stats");
        }
        return null;
      }
      
      const data: GitHubStatsResponse = await response.json();
      
      if (!data.success || !data.contributors) {
        if (!isBackgroundSync && isMountedRef.current) {
          setError(data.error || "Failed to fetch stats");
        }
        return null;
      }

      return {
        contributors: data.contributors,
        hasLineStats: data.hasLineStats === true,
      };
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === "AbortError") {
        return null;
      }
      
      console.error("Error fetching contributor stats:", err);
      if (!isBackgroundSync && isMountedRef.current) {
        setError("Failed to load contributor statistics");
      }
      return null;
    }
  }, [githubUrl]);

  useEffect(() => {
    isMountedRef.current = true;
    
    async function loadData() {
      // Check cache first
      const {
        contributors: cachedContributors,
        hasLineStats: cachedHasLineStats,
        isExpired,
      } = getCachedData(githubUrl);
      
      if (cachedContributors && cachedContributors.length > 0) {
        // Show cached data instantly
        if (isMountedRef.current) {
          setContributors(cachedContributors);
          setHasLineStats(cachedHasLineStats);
          setLoading(false);
        }
        
        // Only fetch fresh data if cache is expired (older than 24 hours)
        if (isExpired) {
          if (isMountedRef.current) setIsSyncing(true);
          
          const freshData = await fetchFromAPI(true);
          
          if (!isMountedRef.current) return;
          
          setIsSyncing(false);
          
          if (freshData && freshData.contributors.length > 0) {
            // Compare and update if different
            const hasChanged =
              JSON.stringify(freshData.contributors) !== JSON.stringify(cachedContributors) ||
              freshData.hasLineStats !== cachedHasLineStats;

            if (hasChanged) {
              setContributors(freshData.contributors);
              setHasLineStats(freshData.hasLineStats);
            }

            setCachedData(githubUrl, freshData.contributors, freshData.hasLineStats);
          }
        }
      } else {
        // No cache - fetch from API
        if (isMountedRef.current) setLoading(true);
        
        const freshData = await fetchFromAPI(false);
        
        if (!isMountedRef.current) return;
        
        setLoading(false);
        
        if (freshData && freshData.contributors.length > 0) {
          setContributors(freshData.contributors);
          setHasLineStats(freshData.hasLineStats);
          setCachedData(githubUrl, freshData.contributors, freshData.hasLineStats);
        }
      }
    }

    loadData();
    
    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [githubUrl, fetchFromAPI]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4" />
          Contributors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-card border border-neutral-200 animate-pulse"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-neutral-200" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-neutral-200 rounded mb-1.5" />
                  <div className="h-3 w-16 bg-neutral-200 rounded" />
                </div>
              </div>
              <div className="mb-3">
                <div className="h-1.5 bg-neutral-200 rounded-full" />
                <div className="h-2 w-28 bg-neutral-200 rounded mt-1" />
              </div>
              <div className="flex gap-3">
                <div className="h-3 w-12 bg-neutral-200 rounded" />
                <div className="h-3 w-12 bg-neutral-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && contributors.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4" />
          Contributors
        </h3>
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
        <Users className="w-4 h-4" />
        Contributors
        {isSyncing && (
          <Loader2 className="w-3 h-3 animate-spin text-neutral-400 ml-1" />
        )}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <SpotlightCard
                className="h-full shadow-sm hover:shadow-md transition-all cursor-pointer group"
                spotlightColor="rgba(120, 120, 120, 0.15)"
              >
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 border-neutral-200 transition-colors group-hover:border-neutral-400">
                      <Image
                        src={contributor.avatarUrl}
                        alt={contributor.login}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground text-sm group-hover:text-neutral-600 transition-colors">
                          {contributor.login}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-600 mt-0.5">
                        <GitCommit className="h-3 w-3 shrink-0" />
                        <span className="font-medium">{contributor.totalCommits.toLocaleString()}</span>
                        <span>commits</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${contributor.percentageOfTop}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        className="h-full rounded-full bg-linear-to-r from-neutral-400 to-neutral-600"
                      />
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      {contributor.percentageOfTop}% of top contributor
                    </p>
                  </div>

                  {hasLineStats &&
                    contributor.additions !== null &&
                    contributor.deletions !== null && (
                      <div className="flex items-center gap-3 text-[11px]">
                        <div className="flex items-center gap-0.5">
                          <Plus className="h-3 w-3 text-emerald-500" />
                          <span className="font-medium text-emerald-600">
                            {contributor.additions.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <Minus className="h-3 w-3 text-red-500" />
                          <span className="font-medium text-red-600">
                            {contributor.deletions.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
