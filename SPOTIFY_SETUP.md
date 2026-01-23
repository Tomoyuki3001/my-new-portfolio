# Spotify Integration Setup Guide

The Spotify Web API is **completely FREE** to use! You just need to create a developer account and register your app.

## Step 1: Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one if you don't have it)
3. Click "Create an app"
4. Fill in the app details:
   - **App name**: Your Portfolio (or any name you like)
   - **App description**: Personal portfolio website
   - **Website**: Your website URL (or `http://localhost:3000` for development)
   - **Redirect URI**: `http://localhost:3000/api/spotify/callback`
   - **Which API/SDKs are you planning to use?**: Web API
5. Accept the terms and click "Save"

## Step 2: Get Your Credentials

1. After creating the app, you'll see your app dashboard
2. Click on "Settings" (gear icon)
3. You'll find:
   - **Client ID**: Copy this
   - **Client Secret**: Click "View client secret" and copy it
4. **Important**: Add your redirect URI in the settings:
   - For development: `http://localhost:3000/api/spotify/callback`
   - For production: `https://yourdomain.com/api/spotify/callback`

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/callback
   ```

3. **Never commit `.env.local` to git!** It's already in `.gitignore`

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your home page
3. You should see a "Connect with Spotify" button in the Spotify section
4. Click it to authenticate with Spotify
5. After authentication, your recently played tracks and top tracks will appear!

## How It Works

- **Authentication**: Uses OAuth 2.0 Authorization Code Flow
- **Data Fetching**: 
  - Recently Played: Fetches your last 5 played tracks
  - Top Tracks: Fetches your top 5 tracks (medium-term)
- **Token Management**: Access tokens are stored securely in HTTP-only cookies
- **Auto-refresh**: Tokens are automatically refreshed when they expire

## API Endpoints Created

- `GET /api/spotify/auth` - Get Spotify authorization URL
- `GET /api/spotify/callback` - Handle OAuth callback
- `GET /api/spotify/tracks/recent` - Get recently played tracks
- `GET /api/spotify/tracks/top` - Get top tracks
- `GET /api/spotify/status` - Check authentication status

## Troubleshooting

### "Not authenticated" error
- Make sure you've clicked "Connect with Spotify" and authorized the app
- Check that your redirect URI matches exactly in both Spotify dashboard and `.env.local`

### "Invalid client" error
- Verify your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are correct
- Make sure there are no extra spaces in your `.env.local` file

### Tracks not loading
- Check the browser console for errors
- Verify your Spotify account has recent listening history
- Make sure you've granted the required permissions (recently played, top tracks)

## Production Deployment

When deploying to production:

1. Update your redirect URI in Spotify Dashboard to your production URL
2. Update `SPOTIFY_REDIRECT_URI` in your production environment variables
3. Set `NEXT_PUBLIC_BASE_URL` to your production domain
4. Make sure your production environment has HTTPS (required for secure cookies)

## Rate Limits

Spotify API has rate limits, but they're very generous for personal use:
- **Recently Played**: Limited to last 50 tracks
- **Top Tracks**: Can fetch up to 50 tracks
- **Rate Limits**: 300 requests per 30 seconds per user

For a personal portfolio, you'll never hit these limits!

## Security Notes

- Client Secret is stored server-side only (never exposed to the browser)
- Access tokens are stored in HTTP-only cookies (not accessible via JavaScript)
- All API calls are made server-side to protect your credentials
