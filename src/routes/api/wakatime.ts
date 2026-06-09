import { createFileRoute } from "@tanstack/react-router";

const WAKATIME_API_URL = 'https://wakatime.com/api/v1/users/current/stats/last_7_days';

export const Route = createFileRoute("/api/wakatime")({
  server: {
    handlers: {
      GET,
    },
  },
});

export async function GET() {
  const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

  if (!WAKATIME_API_KEY) {
    return Response.json(
      { error: 'WakaTime API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(WAKATIME_API_URL, {
      headers: {
        Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`);
    }

    const data = await response.json();

    const stats = {
      totalSeconds: data.data.total_seconds,
      dailyAverage: data.data.daily_average,
      humanReadableTotal: data.data.human_readable_total,
      humanReadableDailyAverage: data.data.human_readable_daily_average,
    };

    return Response.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error('Error fetching WakaTime stats:', error);
    return Response.json(
      { error: 'Failed to fetch WakaTime stats' },
      { status: 500 }
    );
  }
}
