import { NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Authorization Failed</h1>
          <p>Strava returned an error: <strong>${error}</strong></p>
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
          <p>No authorization code received from Strava.</p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET) {
    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Configuration Error</h1>
          <p>Strava credentials not configured in .env file.</p>
          <a href="/">← Go back home</a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Strava token error:", tokenData);
      throw new Error(
        tokenData.message ||
        tokenData.errors?.[0]?.field + ": " + tokenData.errors?.[0]?.code ||
        `Failed to get access token (${tokenResponse.status})`
      );
    }

    return new NextResponse(
      `<html>
        <body style="font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto;">
          <h1 style="color: #16a34a;">✓ Strava Connected Successfully!</h1>

          <p>Hello, <strong>${tokenData.athlete?.firstname} ${tokenData.athlete?.lastname}</strong>!</p>

          <h2>Your Tokens</h2>
          <p>Copy this refresh token to your <code>.env</code> file:</p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold;">Add this line to your .env file:</p>
            <code style="background: #1f2937; color: #10b981; padding: 10px 15px; border-radius: 4px; display: block; word-break: break-all;">
              STRAVA_REFRESH_TOKEN=${tokenData.refresh_token}
            </code>
          </div>

          <details style="margin-top: 30px;">
            <summary style="cursor: pointer; font-weight: bold;">Technical Details (for learning)</summary>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 10px;">
              <p><strong>Access Token:</strong> <code style="font-size: 12px; word-break: break-all;">${tokenData.access_token}</code></p>
              <p><strong>Expires At:</strong> ${new Date(tokenData.expires_at * 1000).toLocaleString()}</p>
              <p><strong>Token Type:</strong> ${tokenData.token_type}</p>
              <p><strong>Athlete ID:</strong> ${tokenData.athlete?.id}</p>
            </div>
          </details>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
            <p style="margin: 0;"><strong>⚠️ Important:</strong> After adding the refresh token to your .env file, restart your dev server for it to take effect.</p>
          </div>

          <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px;">
            ← Go back home
          </a>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("Strava callback error:", err);
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
