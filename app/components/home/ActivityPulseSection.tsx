"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ExternalLink, MapPin, Clock, Trophy } from "lucide-react";

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

// Demo data for when Strava API is not configured
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

const StravaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
  </svg>
);

// Decode Google encoded polyline to coordinates
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

// Convert coordinates to SVG path
function polylineToSvgPath(
  polyline: string,
  width: number,
  height: number,
  padding: number = 20,
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
    (height - padding * 2) / latRange,
  );

  const svgPoints = points.map((p) => {
    const x = padding + (p[1] - minLng) * scale;
    const y = padding + (maxLat - p[0]) * scale;
    return `${x},${y}`;
  });

  return `M ${svgPoints.join(" L ")}`;
}

// Format date to readable string
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Get activity type icon/emoji
function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    Run: "🏃",
    Ride: "🚴",
    Swim: "🏊",
    Walk: "🚶",
    Hike: "🥾",
    Workout: "💪",
  };
  return icons[type] || "🏃";
}

export default function ActivityPulseSection() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cardColors = [
    "bg-[#2D5A4A]",
    "bg-[#3D6B5A]",
    "bg-[#2a2a2a]",
    "bg-[#2a2a2a]",
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("/api/strava/activities");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch activities");
        }

        setActivities(data.activities || []);
      } catch (err) {
        console.error("Error fetching activities:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load activities",
        );
        setActivities(demoActivities);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

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
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-xl font-bold text-[#1a1a1a] sm:text-2xl md:text-3xl">
            Activity Pulse
          </h2>
          <a
            href="https://www.strava.com/athletes/your-id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-[#FC4C02]"
          >
            <StravaIcon />
            <span>View on Strava</span>
          </a>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-12">
            <div className="text-center">
              <div className="mb-4 inline-block h-6 w-6 animate-spin rounded-full border-4 border-[#FC4C02] border-t-transparent sm:h-8 sm:w-8"></div>
              <p className="text-sm text-gray-600 sm:text-base">
                Loading activities...
              </p>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white p-8 sm:p-12">
            <p className="text-sm text-gray-600 sm:text-base">
              No activities found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Featured Activity Card */}
            {featuredActivity && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-[#93B89C] p-4 sm:p-6 lg:col-span-2"
              >
                {/* Strava Icon */}
                <div className="absolute right-3 top-3 z-10 text-[#1a1a1a]/70 sm:right-4 sm:top-4">
                  <StravaIcon />
                </div>

                {/* Achievement Badge */}
                {featuredActivity.achievementCount > 0 && (
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#1a1a1a] sm:left-4 sm:top-4">
                    <Trophy className="h-3 w-3 text-yellow-500" />
                    <span>{featuredActivity.achievementCount}</span>
                  </div>
                )}

                {/* Route Map */}
                <div className="mb-4 flex h-40 items-center justify-center sm:h-56">
                  {featuredActivity.polyline ? (
                    <svg
                      viewBox="0 0 300 200"
                      className="h-full w-full max-w-md"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d={polylineToSvgPath(
                          featuredActivity.polyline,
                          300,
                          200,
                        )}
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#1a1a1a]/50">
                      <MapPin className="h-12 w-12" />
                      <span className="text-sm">No route data</span>
                    </div>
                  )}
                </div>

                {/* Activity Details */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#1a1a1a]/70 sm:text-sm">
                      Latest Activity
                    </p>
                    <h3 className="text-lg font-bold text-[#1a1a1a] sm:text-xl md:text-2xl">
                      {featuredActivity.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[#1a1a1a]">
                    <div>
                      <span className="text-xl font-bold sm:text-2xl">
                        {featuredActivity.distanceKm}
                      </span>
                      <span className="ml-1 text-sm">km</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-base font-medium sm:text-lg">
                        {featuredActivity.movingTimeFormatted}
                      </span>
                    </div>
                    <div className="text-sm text-[#1a1a1a]/70">
                      {featuredActivity.averagePace} /km
                    </div>
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className={`group relative overflow-hidden rounded-xl ${cardColors[index]} p-3 transition-transform hover:scale-[1.02] sm:p-4`}
                >
                  <div className="absolute right-2 top-2 z-10 text-white/50 sm:right-3 sm:top-3">
                    <StravaIcon />
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Activity Type Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-2xl sm:h-14 sm:w-14">
                      {getActivityIcon(activity.type)}
                    </div>

                    {/* Activity Info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="mb-0.5 truncate text-sm font-semibold text-white sm:mb-1 sm:text-base">
                        {activity.name}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/80 sm:text-sm">
                        <span className="font-medium">
                          {activity.distanceKm} km
                        </span>
                        <span>{activity.movingTimeFormatted}</span>
                      </div>
                      <p className="mt-1 text-xs text-white/60">
                        {formatDate(activity.startDate)}
                      </p>
                    </div>

                    {/* Achievement Badge */}
                    {activity.achievementCount > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Trophy className="h-4 w-4" />
                        <span className="text-xs font-medium">
                          {activity.achievementCount}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-center text-xs text-gray-500">
            Note: Showing demo data. {error}
          </p>
        )}
      </motion.div>
    </section>
  );
}
