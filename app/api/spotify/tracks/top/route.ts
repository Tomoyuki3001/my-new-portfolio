import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (accessToken) {
    return accessToken;
  }

  if (refreshToken) {
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      return null;
    }

    try {
      const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
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

      const tokenData = await tokenResponse.json();

      if (tokenResponse.ok && tokenData.access_token) {
        cookieStore.set("spotify_access_token", tokenData.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: tokenData.expires_in,
        });

        return tokenData.access_token;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  }

  return null;
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Not authenticated. Please connect your Spotify account." },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 401) {
      return NextResponse.json(
        { error: "Token expired. Please reconnect your Spotify account." },
        { status: 401 }
      );
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch top tracks");
    }

    const data = await response.json();

    const tracks = data.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a: any) => a.name).join(", "),
      albumArt: track.album.images[0]?.url || "/api/placeholder/300/300",
      spotifyUrl: track.external_urls.spotify,
      previewUrl: track.preview_url,
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
