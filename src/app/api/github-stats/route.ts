import { NextRequest, NextResponse } from "next/server";

interface GitHubWeekStats {
  w: number;
  a: number;
  d: number;
  c: number;
}

interface GitHubAuthor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubContributor {
  author: GitHubAuthor | null;
  total: number;
  weeks: GitHubWeekStats[];
}

interface GitHubContributorSummary {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface ContributorStats {
  login: string;
  id: number;
  avatarUrl: string;
  profileUrl: string;
  totalCommits: number;
  additions: number | null;
  deletions: number | null;
  percentageOfTop: number;
}

export interface GitHubStatsResponse {
  success: boolean;
  contributors?: ContributorStats[];
  hasLineStats?: boolean;
  error?: string;
}

const FETCH_TIMEOUT_MS = 15000;
const VALID_SEGMENT_REGEX = /^[A-Za-z0-9_.-]{1,100}$/;

function parseGitHubUrl(input: string): { owner: string; repo: string } | null {
  // Reject overly long inputs
  if (!input || input.length > 2048) return null;

  let url: URL;
  try {
    // Support both full URLs and shorthand (owner/repo)
    if (input.includes("github.com")) {
      url = input.startsWith("http://") || input.startsWith("https://")
        ? new URL(input)
        : new URL(`https://${input}`);
    } else if (input.includes("/") && !input.includes(" ")) {
      // Handle owner/repo format
      const parts = input.split("/").filter(Boolean);
      if (parts.length === 2) {
        const [owner, repo] = parts;
        if (VALID_SEGMENT_REGEX.test(owner) && VALID_SEGMENT_REGEX.test(repo)) {
          return { owner, repo };
        }
      }
      return null;
    } else {
      return null;
    }
  } catch {
    return null;
  }

  // Strict hostname validation
  if (!["github.com", "www.github.com"].includes(url.hostname)) {
    return null;
  }

  // Parse path segments
  const pathParts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const owner = pathParts[0];
  const repo = pathParts[1]?.replace(/\.git$/, ""); // Remove .git suffix if present

  if (!owner || !repo) return null;

  // Validate segment characters and length
  if (!VALID_SEGMENT_REGEX.test(owner) || !VALID_SEGMENT_REGEX.test(repo)) {
    return null;
  }

  return { owner, repo };
}

async function fetchWithRetry(
  url: string,
  maxRetries: number = 5,
  initialDelay: number = 2000
): Promise<Response> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-contributor-stats",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    console.log(`[GitHub API] Using token: ${process.env.GITHUB_TOKEN.substring(0, 10)}...`);
  } else {
    console.warn('[GitHub API] No GITHUB_TOKEN found - using unauthenticated requests (rate limit: 60/hour)');
  }

  let lastError: Error | null = null;
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      const response = await fetch(url, {
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle rate limiting with Retry-After header
      if (response.status === 429 || response.status === 403) {
        const retryAfter = response.headers.get("retry-after");
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay;
        
        if (attempt < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, Math.min(waitTime, 10000)));
          delay *= 2; // Exponential backoff
          continue;
        }
      }

      // 202 means GitHub is computing stats - need longer waits
      if (response.status === 202 && attempt < maxRetries - 1) {
        console.log(`[GitHub API] Stats being computed (202), waiting ${delay}ms before retry ${attempt + 1}/${maxRetries}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2; // Increased from 1.5x to 2x for faster exponential backoff
        continue;
      }

      // Retry on server errors
      if (response.status >= 500 && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on abort (timeout)
      if (lastError.name === "AbortError") {
        throw new Error("Request timeout");
      }

      // Retry on network errors
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
        continue;
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

function isValidContributor(contributor: GitHubContributor): contributor is GitHubContributor & { author: GitHubAuthor } {
  return (
    contributor.author !== null &&
    typeof contributor.author.login === "string" &&
    typeof contributor.author.id === "number"
  );
}

function isValidContributorSummary(
  contributor: GitHubContributorSummary
): contributor is GitHubContributorSummary {
  return (
    typeof contributor.login === "string" &&
    typeof contributor.id === "number" &&
    typeof contributor.avatar_url === "string" &&
    typeof contributor.html_url === "string" &&
    typeof contributor.contributions === "number"
  );
}

function withPercentages(contributors: ContributorStats[]): ContributorStats[] {
  contributors.sort((a, b) => b.totalCommits - a.totalCommits);

  const topContributions = contributors[0]?.totalCommits || 1;
  for (const contributor of contributors) {
    contributor.percentageOfTop = Math.round(
      (contributor.totalCommits / topContributions) * 100
    );
  }

  return contributors;
}

function mapStatsContributors(data: GitHubContributor[]): ContributorStats[] {
  const validContributors = data.filter(isValidContributor);

  return withPercentages(
    validContributors.map((contributor) => {
      let additions = 0;
      let deletions = 0;

      for (const week of contributor.weeks) {
        additions += week.a;
        deletions += week.d;
      }

      return {
        login: contributor.author.login,
        id: contributor.author.id,
        avatarUrl: contributor.author.avatar_url,
        profileUrl: contributor.author.html_url,
        totalCommits: contributor.total,
        additions,
        deletions,
        percentageOfTop: 0,
      };
    })
  );
}

function mapContributorSummaries(data: GitHubContributorSummary[]): ContributorStats[] {
  const validContributors = data.filter(isValidContributorSummary);

  return withPercentages(
    validContributors.map((contributor) => ({
      login: contributor.login,
      id: contributor.id,
      avatarUrl: contributor.avatar_url,
      profileUrl: contributor.html_url,
      totalCommits: contributor.contributions,
      additions: null,
      deletions: null,
      percentageOfTop: 0,
    }))
  );
}

function mergeContributorStats(
  baseContributors: ContributorStats[],
  statsContributors: ContributorStats[]
): ContributorStats[] {
  const statsById = new Map(statsContributors.map((contributor) => [contributor.id, contributor]));

  return withPercentages(
    baseContributors.map((contributor) => {
      const statsContributor = statsById.get(contributor.id);

      if (!statsContributor) {
        return contributor;
      }

      return {
        ...contributor,
        additions: statsContributor.additions,
        deletions: statsContributor.deletions,
      };
    })
  );
}

function createSuccessResponse(
  contributors: ContributorStats[],
  hasLineStats: boolean
) {
  return NextResponse.json(
    { success: true, contributors, hasLineStats } satisfies GitHubStatsResponse,
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get("repo");

  if (!repoUrl) {
    return NextResponse.json(
      { success: false, error: "Missing repo parameter" } as GitHubStatsResponse,
      { status: 400 }
    );
  }

  const parsed = parseGitHubUrl(repoUrl);
  if (!parsed) {
    return NextResponse.json(
      { success: false, error: "Invalid GitHub URL" } as GitHubStatsResponse,
      { status: 400 }
    );
  }

  const { owner, repo } = parsed;
  const statsUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/stats/contributors`;
  const contributorsUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=100`;

  console.log(`[GitHub API] Fetching contributor stats for ${owner}/${repo}`);

  try {
    const contributorsResponse = await fetchWithRetry(contributorsUrl, 3, 500);
    console.log(
      `[GitHub API] Contributors response status: ${contributorsResponse.status} for ${owner}/${repo}`
    );

    if (contributorsResponse.status === 403) {
      const remaining = contributorsResponse.headers.get("x-ratelimit-remaining");
      if (remaining === "0") {
        return NextResponse.json(
          { success: false, error: "GitHub API rate limit exceeded. Please try again later." } as GitHubStatsResponse,
          { status: 429 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Access denied to repository" } as GitHubStatsResponse,
        { status: 403 }
      );
    }

    if (contributorsResponse.status === 404) {
      return NextResponse.json(
        { success: false, error: "Repository not found" } as GitHubStatsResponse,
        { status: 404 }
      );
    }

    if (!contributorsResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch repository contributors" } as GitHubStatsResponse,
        { status: contributorsResponse.status }
      );
    }

    const contributorsData: GitHubContributorSummary[] = await contributorsResponse.json();

    if (!Array.isArray(contributorsData)) {
      return createSuccessResponse([], false);
    }

    const fallbackContributors = mapContributorSummaries(contributorsData);

    if (fallbackContributors.length === 0) {
      return createSuccessResponse([], false);
    }

    let contributors = fallbackContributors;
    let hasLineStats = false;

    try {
      const statsResponse = await fetchWithRetry(statsUrl, 2, 500);
      console.log(`[GitHub API] Stats response status: ${statsResponse.status} for ${owner}/${repo}`);

      if (statsResponse.ok) {
        const statsData: GitHubContributor[] = await statsResponse.json();

        if (Array.isArray(statsData)) {
          const statsContributors = mapStatsContributors(statsData);

          if (statsContributors.length > 0) {
            contributors = mergeContributorStats(fallbackContributors, statsContributors);
            hasLineStats = contributors.some(
              (contributor) => contributor.additions !== null && contributor.deletions !== null
            );
          }
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.warn(`[GitHub API] Stats enrichment failed for ${owner}/${repo}: ${message}`);
    }

    return createSuccessResponse(contributors, hasLineStats);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`GitHub API error for ${owner}/${repo}:`, message);
    
    return NextResponse.json(
      { success: false, error: "Failed to fetch GitHub stats" } as GitHubStatsResponse,
      { status: 500 }
    );
  }
}
