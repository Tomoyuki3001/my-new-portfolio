import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("spotify_access_token")?.value;
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return null;
  }

  // If we have an access token, return it
  if (accessToken) {
    return accessToken;
  }

  // If we only have refresh token, get a new access token
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
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
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
      throw new Error(errorData.error?.message || "Failed to fetch recently played tracks");
    }

    const data = await response.json();

    const tracks = data.items.map((item: any) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((a: any) => a.name).join(", "),
      albumArt: item.track.album.images[0]?.url || "/api/placeholder/300/300",
      spotifyUrl: item.track.external_urls.spotify,
      previewUrl: item.track.preview_url,
    }));

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
