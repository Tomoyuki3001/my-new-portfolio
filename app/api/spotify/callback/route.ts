import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI =
  process.env.SPOTIFY_REDIRECT_URI ||
  `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/spotify/callback`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Authorization Failed</h1>
          <p>Spotify returned an error: <strong>${error}</strong></p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Missing Code</h1>
          <p>No authorization code received from Spotify.</p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Configuration Error</h1>
          <p>Spotify credentials not configured in .env file.</p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
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
        grant_type: "authorization_code",
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || tokenData.error || "Failed to get access token");
    }

    const cookieStore = await cookies();
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

    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #1DB954;">✓ Spotify Connected Successfully!</h1>

          <h2>Your Tokens</h2>
          <p>Copy this refresh token to your <code>.env</code> file so tracks appear for all visitors:</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold;">Add this line to your .env file:</p>
            <code style="background: #1f2937; color: #1DB954; padding: 10px 15px; border-radius: 4px; display: block; word-break: break-all;">
              SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token || "No refresh token returned — try reconnecting"}
            </code>
          </div>

          <details style="margin-top: 30px;">
            <summary style="cursor: pointer; font-weight: bold;">Technical Details</summary>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 10px;">
              <p><strong>Access Token:</strong> <code style="font-size: 12px; word-break: break-all;">${tokenData.access_token}</code></p>
              <p><strong>Expires In:</strong> ${tokenData.expires_in} seconds</p>
              <p><strong>Token Type:</strong> ${tokenData.token_type}</p>
            </div>
          </details>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
            <p style="margin: 0;"><strong>Important:</strong> After adding the refresh token to your .env file, restart your dev server for it to take effect.</p>
          </div>

          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #1DB954; color: white; text-decoration: none; border-radius: 8px;">
            ← Go back home
          </a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("Spotify callback error:", err);
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Token Exchange Failed</h1>
          <p>Error: ${err instanceof Error ? err.message : "Unknown error"}</p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
