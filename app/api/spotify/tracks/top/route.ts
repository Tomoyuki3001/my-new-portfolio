import { NextResponse } from "next/server";
import {
  isSpotifyAuthenticated,
  mapTopTrack,
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
    const data = await spotifyFetch<{ items: Parameters<typeof mapTopTrack>[0][] }>(
      "/me/top/tracks?limit=5&time_range=medium_term"
    );

    const tracks = data.items.map(mapTopTrack);
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch tracks";
    const status = message.includes("Not authenticated") || message.includes("Token expired")
      ? 401
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
