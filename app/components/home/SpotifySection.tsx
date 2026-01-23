"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  previewUrl?: string;
}

// Demo data for when Spotify API is not configured
const demoRecentlyPlayed: Track[] = [
  {
    id: "demo-1",
    title: "Hard to Sleep",
    artist: "Gracie Abrams",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo1",
  },
  {
    id: "demo-2",
    title: "For Tonight",
    artist: "GIVĒON",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo2",
  },
  {
    id: "demo-3",
    title: "I Don't Want You Back",
    artist: "AJ Mitchell",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo3",
  },
  {
    id: "demo-4",
    title: "Giving Up Ground",
    artist: "Chelsea Cutler, Quinn XCII",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo4",
  },
  {
    id: "demo-5",
    title: "When love becomes goodbye",
    artist: "BOL4",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo5",
  },
];

const demoTopTracks: Track[] = [
  {
    id: "demo-top-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo-top1",
  },
  {
    id: "demo-top-2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo-top2",
  },
  {
    id: "demo-top-3",
    title: "Levitating",
    artist: "Dua Lipa",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo-top3",
  },
  {
    id: "demo-top-4",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo-top4",
  },
  {
    id: "demo-top-5",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    spotifyUrl: "https://open.spotify.com/track/demo-top5",
  },
];

const SpotifyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export default function SpotifySection() {
  const [activeTab, setActiveTab] = useState<"recently" | "top">("recently");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cardColors = [
    "bg-[#8B1538]", // dark red
    "bg-[#8B1538]", // dark red
    "bg-[#2a2a2a]", // dark gray
    "bg-[#2a2a2a]", // dark gray
  ];

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/spotify/status");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
      } catch (err) {
        console.error("Error checking auth status:", err);
        // If API fails, assume not configured and use demo mode
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch tracks when tab changes or when authenticated
  useEffect(() => {
    // If not authenticated, use demo data
    if (!isAuthenticated) {
      setTracks(activeTab === "recently" ? demoRecentlyPlayed : demoTopTracks);
      setIsLoading(false);
      return;
    }

    // If authenticated, fetch real data
    const fetchTracks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const endpoint =
          activeTab === "recently"
            ? "/api/spotify/tracks/recent"
            : "/api/spotify/tracks/top";

        const response = await fetch(endpoint);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setIsAuthenticated(false);
            // Fall back to demo data
            setTracks(activeTab === "recently" ? demoRecentlyPlayed : demoTopTracks);
            setError("Please reconnect your Spotify account.");
          } else {
            setError(data.error || "Failed to fetch tracks");
            // Fall back to demo data on error
            setTracks(activeTab === "recently" ? demoRecentlyPlayed : demoTopTracks);
          }
          setIsLoading(false);
          return;
        }

        setTracks(data.tracks || []);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        setError("Failed to load tracks. Please try again.");
        // Fall back to demo data when API fails
        setTracks(activeTab === "recently" ? demoRecentlyPlayed : demoTopTracks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [activeTab, isAuthenticated]);

  const handleConnectSpotify = async () => {
    try {
      const response = await fetch("/api/spotify/auth");
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        setError("Failed to initiate Spotify connection.");
      }
    } catch (err) {
      console.error("Error connecting to Spotify:", err);
      setError("Failed to connect to Spotify. Please try again.");
    }
  };

  const featuredTrack = tracks[0];
  const listTracks = tracks.slice(1, 5);

  return (
    <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-8 sm:pb-24 md:px-12 lg:px-20 xl:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header with Tabs */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:justify-between">
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] sm:text-2xl md:text-3xl">
            Recently Played
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("recently")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${activeTab === "recently"
                  ? "bg-gray-200 text-[#1a1a1a]"
                  : "text-gray-600 hover:text-[#1a1a1a]"
                }`}
            >
              Recently Played
            </button>
            <button
              onClick={() => setActiveTab("top")}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${activeTab === "top"
                  ? "bg-gray-200 text-[#1a1a1a]"
                  : "text-gray-600 hover:text-[#1a1a1a]"
                }`}
            >
              Top Tracks
            </button>
          </div>
        </div>

        {/* Connect Button or Content */}
        {!isAuthenticated && tracks.length === 0 && !isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-6 text-center sm:p-8 md:p-12">
            <SpotifyIcon />
            <h3 className="mb-2 mt-4 font-serif text-lg font-bold text-[#1a1a1a] sm:text-xl">
              Connect Your Spotify Account
            </h3>
            <p className="mb-6 text-sm text-gray-600 sm:text-base">
              Connect your Spotify account to display your recently played tracks
              and top tracks.
            </p>
            <button
              onClick={handleConnectSpotify}
              className="rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1ed760] sm:px-6 sm:py-3"
            >
              Connect with Spotify
            </button>
            {error && (
              <p className="mt-4 text-xs text-red-600 sm:text-sm">{error}</p>
            )}
            <p className="mt-4 text-xs text-gray-500">
              Note: Currently showing demo data. Connect your account to see your real tracks.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-12">
            <div className="text-center">
              <div className="mb-4 inline-block h-6 w-6 animate-spin rounded-full border-4 border-[#1DB954] border-t-transparent sm:h-8 sm:w-8"></div>
              <p className="text-sm text-gray-600 sm:text-base">Loading your tracks...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-6 text-center sm:p-8 md:p-12">
            <p className="mb-4 text-sm text-red-600 sm:text-base">{error}</p>
            <button
              onClick={handleConnectSpotify}
              className="rounded-full bg-[#1DB954] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1ed760] sm:px-6 sm:py-3"
            >
              Reconnect Spotify
            </button>
          </div>
        ) : tracks.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-12">
            <p className="text-sm text-gray-600 sm:text-base">No tracks found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Featured Track Card */}
            {featuredTrack && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-[#1DB954] p-4 sm:p-6 lg:col-span-2"
              >
                <div className="absolute right-3 top-3 z-10 text-white opacity-90 sm:right-4 sm:top-4">
                  <SpotifyIcon />
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-lg bg-gray-800 sm:mb-4 sm:h-48 sm:w-48">
                    <Image
                      src={featuredTrack.albumArt}
                      alt={`${featuredTrack.title} by ${featuredTrack.artist}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl">
                    {featuredTrack.title}
                  </h3>
                  <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:mb-4">
                    {featuredTrack.previewUrl && (
                      <span className="rounded bg-gray-200/20 px-2 py-1 text-xs text-white">
                        Preview
                      </span>
                    )}
                    <span className="text-sm text-white/90 sm:text-base md:text-lg">
                      {featuredTrack.artist}
                    </span>
                  </div>
                  <div className="mb-3 flex items-center gap-2 sm:mb-4">
                    <a
                      href={featuredTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white transition-all hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Open in Spotify</span>
                      <span className="sm:hidden">Open</span>
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    {featuredTrack.previewUrl && (
                      <audio
                        controls
                        className="h-7 w-24 sm:h-8 sm:w-32"
                        src={featuredTrack.previewUrl}
                      />
                    )}
                    <a
                      href={featuredTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1DB954] transition-all hover:scale-110 sm:h-12 sm:w-12"
                    >
                      <Play className="ml-0.5 h-5 w-5 fill-current sm:ml-1 sm:h-6 sm:w-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Track List */}
            <div className="flex flex-col gap-4">
              {listTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl ${cardColors[index]} p-3 sm:p-4`}
                >
                  <div className="absolute right-2 top-2 z-10 text-white opacity-70 sm:right-3 sm:top-3">
                    <SpotifyIcon />
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-700 sm:h-16 sm:w-16">
                      <Image
                        src={track.albumArt}
                        alt={`${track.title} by ${track.artist}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-0.5 truncate text-sm font-semibold text-white sm:mb-1 sm:text-base">
                        {track.title}
                      </h4>
                      <p className="mb-1 truncate text-xs text-white/80 sm:text-sm">
                        {track.artist}
                      </p>
                      {track.previewUrl && (
                        <span className="inline-block rounded bg-black/20 px-1.5 py-0.5 text-[10px] text-white sm:px-2 sm:text-xs">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 sm:h-8 sm:w-8"
                      >
                        <Play className="ml-0.5 h-3 w-3 fill-current sm:h-4 sm:w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
