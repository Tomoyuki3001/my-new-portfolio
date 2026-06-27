import { NextResponse } from "next/server";
import {
  isSpotifyAuthenticated,
  mapRecentlyPlayedItem,
  spotifyFetch,
} from "@/app/lib/spotify";

export async function GET() {
  if (!(await isSpotifyAuthenticated())) {
    return NextResponse.json(
      { error: "Not authenticated. Please connect your Spotify account." },
      { status: 401 }
    );
  }

  try {
    const data = await spotifyFetch<{ items: Parameters<typeof mapRecentlyPlayedItem>[0][] }>(
      "/me/player/recently-played?limit=5"
    );

    const tracks = data.items.map(mapRecentlyPlayedItem);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching recently played tracks:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch tracks";
    const status = message.includes("Not authenticated") || message.includes("Token expired")
      ? 401
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
