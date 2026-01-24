import { NextResponse } from "next/server";
import { stravaFetch, StravaActivity } from "@/app/lib/strava";

export async function GET() {
  try {
    const activities = await stravaFetch<StravaActivity[]>(
      "/athlete/activities?per_page=10"
    );

    const formattedActivities = activities.map((activity) => ({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      sportType: activity.sport_type,
      distance: activity.distance,
      distanceKm: (activity.distance / 1000).toFixed(2),
      movingTime: activity.moving_time,
      movingTimeFormatted: formatDuration(activity.moving_time),
      elevationGain: activity.total_elevation_gain,
      startDate: activity.start_date_local,
      achievementCount: activity.achievement_count,
      averageSpeed: activity.average_speed,
      averagePace: formatPace(activity.average_speed),
      polyline: activity.map?.summary_polyline || null,
      calories: activity.calories,
      averageHeartrate: activity.average_heartrate,
    }));

    return NextResponse.json({
      activities: formattedActivities,
      count: formattedActivities.length,
    });
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function formatPace(speedMs: number): string {
  if (speedMs === 0) return "0:00";
  const paceSeconds = 1000 / speedMs;
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.floor(paceSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
