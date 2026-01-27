"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Play,
  ExternalLink,
  MapPin,
  Clock,
  Trophy,
  Footprints,
  Bike,
  Waves,
  Dumbbell,
  Mountain,
  PersonStanding,
} from "lucide-react";
import Image from "next/image";

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  previewUrl?: string;
}

interface Activity {
  id: number;
  name: string;
  type: string;
  sportType: string;
  distance: number;
  distanceKm: string;
  movingTime: number;
  movingTimeFormatted: string;
  elevationGain: number;
  startDate: string;
  achievementCount: number;
  averagePace: string;
  polyline: string | null;
}

const demoTracks: Track[] = [
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

const demoActivities: Activity[] = [
  {
    id: 1,
    name: "Morning Run in Tokyo",
    type: "Run",
    sportType: "Run",
    distance: 12500,
    distanceKm: "12.50",
    movingTime: 3532,
    movingTimeFormatted: "58:52",
    elevationGain: 45,
    startDate: "2026-01-24T07:30:00Z",
    achievementCount: 3,
    averagePace: "4:42",
    polyline: null,
  },
  {
    id: 2,
    name: "Evening Jog",
    type: "Run",
    sportType: "Run",
    distance: 5000,
    distanceKm: "5.00",
    movingTime: 1500,
    movingTimeFormatted: "25:00",
    elevationGain: 20,
    startDate: "2026-01-23T18:00:00Z",
    achievementCount: 1,
    averagePace: "5:00",
    polyline: null,
  },
  {
    id: 3,
    name: "Long Run Sunday",
    type: "Run",
    sportType: "Run",
    distance: 21000,
    distanceKm: "21.00",
    movingTime: 6300,
    movingTimeFormatted: "1:45:00",
    elevationGain: 120,
    startDate: "2026-01-19T08:00:00Z",
    achievementCount: 5,
    averagePace: "5:00",
    polyline: null,
  },
  {
    id: 4,
    name: "Recovery Run",
    type: "Run",
    sportType: "Run",
    distance: 3000,
    distanceKm: "3.00",
    movingTime: 1080,
    movingTimeFormatted: "18:00",
    elevationGain: 10,
    startDate: "2026-01-18T07:00:00Z",
    achievementCount: 0,
    averagePace: "6:00",
    polyline: null,
  },
  {
    id: 5,
    name: "Tempo Run",
    type: "Run",
    sportType: "Run",
    distance: 8000,
    distanceKm: "8.00",
    movingTime: 2160,
    movingTimeFormatted: "36:00",
    elevationGain: 35,
    startDate: "2026-01-17T06:30:00Z",
    achievementCount: 2,
    averagePace: "4:30",
    polyline: null,
  },
];

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const StravaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte: number;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    points.push([lat / 1e5, lng / 1e5]);
  }

  return points;
}

function polylineToSvgPath(
  polyline: string,
  width: number,
  height: number,
  padding: number = 20
): string {
  const points = decodePolyline(polyline);
  if (points.length === 0) return "";

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  const scale = Math.min(
    (width - padding * 2) / lngRange,
    (height - padding * 2) / latRange
  );

  const svgPoints = points.map((p) => {
    const x = padding + (p[1] - minLng) * scale;
    const y = padding + (maxLat - p[0]) * scale;
    return `${x},${y}`;
  });

  return `M ${svgPoints.join(" L ")}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ActivityIcon({ type, className = "h-6 w-6" }: { type: string; className?: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    Run: <Footprints className={className} />,
    Ride: <Bike className={className} />,
    Swim: <Waves className={className} />,
    Walk: <PersonStanding className={className} />,
    Hike: <Mountain className={className} />,
    Workout: <Dumbbell className={className} />,
    WeightTraining: <Dumbbell className={className} />,
  };
  return <>{iconMap[type] || <Footprints className={className} />}</>;
}

function isRunActivity(type: string): boolean {
  return type === "Run" || type === "TrailRun" || type === "VirtualRun";
}

function hasDistanceData(type: string): boolean {
  const distanceActivities = [
    "Run", "TrailRun", "VirtualRun",
    "Ride", "VirtualRide", "MountainBikeRide", "GravelRide", "EBikeRide",
    "Swim",
    "Walk",
    "Hike",
  ];
  return distanceActivities.includes(type);
}

export default function RecentActivitySection() {
  const [activeTab, setActiveTab] = useState<"spotify" | "strava">("strava");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const spotifyCardColors = ["bg-[#8B1538]", "bg-[#8B1538]", "bg-[#2a2a2a]", "bg-[#2a2a2a]"];
  const stravaCardColors = ["bg-[#2D5A4A]", "bg-[#3D6B5A]", "bg-[#2a2a2a]", "bg-[#2a2a2a]"];

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/api/spotify/tracks/recent");
        const data = await response.json();
        if (response.ok && data.tracks) {
          setTracks(data.tracks);
        } else {
          setTracks(demoTracks);
        }
      } catch {
        setTracks(demoTracks);
      }
    };
    fetchTracks();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/strava/activities");
        const data = await response.json();
        if (response.ok && data.activities) {
          setActivities(data.activities);
        } else {
          setActivities(demoActivities);
        }
      } catch {
        setActivities(demoActivities);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const featuredTrack = tracks[0];
  const listTracks = tracks.slice(1, 5);
  const featuredActivity = activities[0];
  const listActivities = activities.slice(1, 5);

  return (
    <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-8 sm:pb-24 md:px-12 lg:px-20 xl:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:justify-between">
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] sm:text-2xl md:text-3xl">
            Life in Motion
          </h2>
          {/* <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("strava")}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${activeTab === "strava"
                ? "bg-[#FC4C02] text-white"
                : "text-gray-600 hover:text-[#1a1a1a]"
                }`}
            >
              <StravaIcon />
              <span className="hidden sm:inline">Activity Pulse</span>
              <span className="sm:hidden">Activity</span>
            </button>
            <button
              onClick={() => setActiveTab("spotify")}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${activeTab === "spotify"
                  ? "bg-[#1DB954] text-white"
                  : "text-gray-600 hover:text-[#1a1a1a]"
                }`}
            >
              <SpotifyIcon />
              <span className="hidden sm:inline">Recently Played</span>
              <span className="sm:hidden">Music</span>
            </button>
          </div> */}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-12">
            <div className="text-center">
              <div
                className={`mb-4 inline-block h-6 w-6 animate-spin rounded-full border-4 border-t-transparent sm:h-8 sm:w-8 ${activeTab === "spotify" ? "border-[#1DB954]" : "border-[#FC4C02]"
                  }`}
              ></div>
              <p className="text-sm text-gray-600 sm:text-base">Loading...</p>
            </div>
          </div>
        ) : activeTab === "spotify" ? (
          // Spotify Content
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredTrack && (
              <motion.div
                key="spotify-featured"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
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
                  <p className="mb-3 text-sm text-white/90 sm:mb-4 sm:text-base md:text-lg">
                    {featuredTrack.artist}
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href={featuredTrack.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white transition-all hover:bg-white/20 sm:px-4 sm:py-2 sm:text-sm"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      Open in Spotify
                    </a>
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

            {/* Track list */}
            <div className="flex flex-col gap-4">
              {listTracks.map((track, index) => (
                <motion.a
                  key={track.id}
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl ${spotifyCardColors[index]} p-3 transition-transform hover:scale-[1.02] sm:p-4`}
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
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 truncate text-sm font-semibold text-white sm:mb-1 sm:text-base">
                        {track.title}
                      </h4>
                      <p className="truncate text-xs text-white/80 sm:text-sm">
                        {track.artist}
                      </p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-all group-hover:bg-white/20 sm:h-8 sm:w-8">
                      <Play className="ml-0.5 h-3 w-3 fill-current sm:h-4 sm:w-4" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ) : (
          // Strava Content
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredActivity && (
              <motion.div
                key="strava-featured"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-[#93B89C] p-4 sm:p-6 lg:col-span-2"
              >
                <div className="absolute right-3 top-3 z-10 text-[#1a1a1a]/70 sm:right-4 sm:top-4">
                  <StravaIcon />
                </div>

                {featuredActivity.achievementCount > 0 && (
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#1a1a1a] sm:left-4 sm:top-4">
                    <Trophy className="h-3 w-3 text-yellow-500" />
                    <span>{featuredActivity.achievementCount}</span>
                  </div>
                )}

                {/* Route Map or Activity Icon */}
                <div className="mb-4 flex h-40 items-center justify-center sm:h-56">
                  {isRunActivity(featuredActivity.type) && featuredActivity.polyline ? (
                    <svg
                      viewBox="0 0 300 200"
                      className="h-full w-full max-w-md"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d={polylineToSvgPath(featuredActivity.polyline, 300, 200)}
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : isRunActivity(featuredActivity.type) ? (
                    <div className="flex flex-col items-center gap-2 text-[#1a1a1a]/50">
                      <MapPin className="h-12 w-12" />
                      <span className="text-sm">No route data</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 rounded-2xl bg-[#1a1a1a]/10 px-12 py-8">
                      <ActivityIcon type={featuredActivity.type} className="h-20 w-20 text-[#1a1a1a]/70" />
                      <span className="text-lg font-medium text-[#1a1a1a]/70">
                        {featuredActivity.type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Activity Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#1a1a1a]/70 sm:text-sm">{formatDate(featuredActivity.startDate)}</p>
                    <h3 className="text-lg font-bold text-[#1a1a1a] sm:text-xl md:text-2xl">
                      {featuredActivity.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[#1a1a1a]">
                    {hasDistanceData(featuredActivity.type) && (
                      <div>
                        <span className="text-xl font-bold sm:text-2xl">
                          {featuredActivity.distanceKm}
                        </span>
                        <span className="ml-1 text-sm">km</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-base font-medium sm:text-lg">
                        {featuredActivity.movingTimeFormatted}
                      </span>
                    </div>
                    {hasDistanceData(featuredActivity.type) && (
                      <div className="text-sm text-[#1a1a1a]/70">
                        {featuredActivity.averagePace} /km
                      </div>
                    )}
                  </div>

                  <a
                    href={`https://www.strava.com/activities/${featuredActivity.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FC4C02] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#e34402]"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Strava
                  </a>
                </div>
              </motion.div>
            )}

            {/* Activity List */}
            <div className="flex flex-col gap-4">
              {listActivities.map((activity, index) => (
                <motion.a
                  key={activity.id}
                  href={`https://www.strava.com/activities/${activity.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl ${stravaCardColors[index]} p-3 transition-transform hover:scale-[1.02] sm:p-4`}
                >
                  <div className="absolute right-2 top-2 z-10 text-white/50 sm:right-3 sm:top-3">
                    <StravaIcon />
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white sm:h-14 sm:w-14">
                      <ActivityIcon type={activity.type} className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 truncate text-sm font-semibold text-white sm:mb-1 sm:text-base">
                        {activity.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/80 sm:text-sm">
                        {hasDistanceData(activity.type) && (
                          <span className="font-medium">{activity.distanceKm} km</span>
                        )}
                        <span>{activity.movingTimeFormatted}</span>
                      </div>
                      <p className="mt-1 text-xs text-white/60">
                        {formatDate(activity.startDate)}
                      </p>
                    </div>
                    {activity.achievementCount > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Trophy className="h-4 w-4" />
                        <span className="text-xs font-medium">{activity.achievementCount}</span>
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
