import { NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_REDIRECT_URI =
  process.env.STRAVA_REDIRECT_URI ||
  `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/strava/callback`;

export async function GET() {
  if (!STRAVA_CLIENT_ID) {
    return NextResponse.json(
      { error: "Strava Client ID not configured" },
      { status: 500 }
    );
  }

  const scopes = "read,activity:read_all";

  const authUrl = `https://www.strava.com/oauth/authorize?${new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    response_type: "code",
    redirect_uri: STRAVA_REDIRECT_URI,
    scope: scopes,
    approval_prompt: "auto",
  })}`;

  return NextResponse.json({ authUrl });
}
