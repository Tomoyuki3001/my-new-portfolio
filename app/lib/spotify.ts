import { cookies } from "next/headers";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  previewUrl?: string | null;
}

export function isSpotifyConfigured(): boolean {
  return !!(SPOTIFY_CLIENT_ID && SPOTIFY_CLIENT_SECRET);
}

export async function isSpotifyAuthenticated(): Promise<boolean> {
  if (SPOTIFY_REFRESH_TOKEN && isSpotifyConfigured()) {
    return true;
  }

  const cookieStore = await cookies();
  return !!(
    cookieStore.get("spotify_access_token")?.value ||
    cookieStore.get("spotify_refresh_token")?.value
  );
}

async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || "Failed to refresh Spotify token");
  }

  return data;
}

async function getAccessTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;

  if (refreshToken) {
    const tokenData = await refreshAccessToken(refreshToken);
    cookieStore.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
    });

    if (tokenData.refresh_token) {
      cookieStore.set("spotify_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return tokenData.access_token;
  }

  return cookieStore.get("spotify_access_token")?.value ?? null;
}

export async function getValidAccessToken(): Promise<string> {
  if (!isSpotifyConfigured()) {
    throw new Error("Spotify credentials not configured in .env");
  }

  if (SPOTIFY_REFRESH_TOKEN) {
    const now = Date.now();
    if (cachedAccessToken && tokenExpiresAt > now + 60_000) {
      return cachedAccessToken;
    }

    const tokenData = await refreshAccessToken(SPOTIFY_REFRESH_TOKEN);
    cachedAccessToken = tokenData.access_token;
    tokenExpiresAt = now + tokenData.expires_in * 1000;
    return tokenData.access_token;
  }

  const accessToken = await getAccessTokenFromCookies();
  if (accessToken) {
    return accessToken;
  }

  throw new Error("Not authenticated. Please connect your Spotify account.");
}

export async function spotifyFetch<T>(endpoint: string): Promise<T> {
  let accessToken = await getValidAccessToken();

  let response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (response.status === 401 && SPOTIFY_REFRESH_TOKEN) {
    cachedAccessToken = null;
    accessToken = await getValidAccessToken();
    response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  if (response.status === 401) {
    throw new Error("Token expired. Please reconnect your Spotify account.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Spotify API error: ${response.status}`
    );
  }

  return response.json();
}

export function mapRecentlyPlayedItem(item: {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { images: { url: string }[] };
    external_urls: { spotify: string };
    preview_url: string | null;
  };
}): SpotifyTrack {
  return {
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    albumArt: item.track.album.images[0]?.url || "",
    spotifyUrl: item.track.external_urls.spotify,
    previewUrl: item.track.preview_url,
  };
}

export function mapTopTrack(track: {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
  preview_url: string | null;
}): SpotifyTrack {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    albumArt: track.album.images[0]?.url || "",
    spotifyUrl: track.external_urls.spotify,
    previewUrl: track.preview_url,
  };
}
