import { NextResponse } from "next/server";
import { isSpotifyAuthenticated, isSpotifyConfigured } from "@/app/lib/spotify";

export async function GET() {
  const configured = isSpotifyConfigured();
  const authenticated = configured && (await isSpotifyAuthenticated());

  return NextResponse.json({ configured, authenticated });
}
