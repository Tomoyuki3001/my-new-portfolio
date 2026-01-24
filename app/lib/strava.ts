const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

let cachedAccessToken: string | null = null;
let tokenExpiresAt: number = 0;

export async function getValidAccessToken(): Promise<string> {
  // Debug: Log if credentials exist (not the actual values!)
  console.log("Strava credentials check:", {
    hasClientId: !!STRAVA_CLIENT_ID,
    hasClientSecret: !!STRAVA_CLIENT_SECRET,
    hasRefreshToken: !!STRAVA_REFRESH_TOKEN,
    refreshTokenLength: STRAVA_REFRESH_TOKEN?.length || 0,
  });

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    throw new Error("Strava credentials not configured in .env");
  }

  const now = Math.floor(Date.now() / 1000);

  if (cachedAccessToken && tokenExpiresAt > now + 60) {
    console.log("Using cached Strava access token");
    return cachedAccessToken;
  }

  console.log("Refreshing Strava access token...");

  const response = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: STRAVA_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();

  console.log("Token refresh response:", {
    ok: response.ok,
    status: response.status,
    hasAccessToken: !!data.access_token,
    expiresAt: data.expires_at,
    error: data.message || data.errors,
  });

  if (!response.ok) {
    console.error("Failed to refresh token:", data);
    throw new Error(data.message || "Failed to refresh Strava token");
  }

  cachedAccessToken = data.access_token;
  tokenExpiresAt = data.expires_at;

  console.log("Strava token refreshed, expires at:", new Date(tokenExpiresAt * 1000).toLocaleString());

  return cachedAccessToken;
}

export async function stravaFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await getValidAccessToken();

  // Debug: Log the token being used (first 10 chars only for security)
  console.log("Making Strava API call:", {
    endpoint,
    tokenPreview: accessToken?.substring(0, 10) + "...",
  });

  const response = await fetch(`https://www.strava.com/api/v3${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("Strava API error:", {
      status: response.status,
      endpoint: endpoint,
      error: error,
    });
    throw new Error(error.message || `Strava API error: ${response.status}`);
  }

  return response.json();
}

// Type definitions for Strava API responses

export interface StravaAthlete {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
  city: string;
  country: string;
}

export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  achievement_count: number;
  map: {
    id: string;
    summary_polyline: string;
    polyline?: string;
  };
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  calories?: number;
}

export interface StravaStats {
  all_run_totals: StravaTotals;
  all_ride_totals: StravaTotals;
  all_swim_totals: StravaTotals;
  recent_run_totals: StravaTotals;
  recent_ride_totals: StravaTotals;
  recent_swim_totals: StravaTotals;
  ytd_run_totals: StravaTotals;
  ytd_ride_totals: StravaTotals;
  ytd_swim_totals: StravaTotals;
}

export interface StravaTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}
