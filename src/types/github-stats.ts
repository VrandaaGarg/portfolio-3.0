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
