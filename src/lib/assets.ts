import data from "@/data/assets-manifest.json";

const { manifest, folderNames } = data as {
  manifest: Record<string, string[]>;
  folderNames: Record<string, string>;
};

/** Get list of image filenames for a folder (use normalized key, e.g. "channel-dashboard") */
export function getAssetFiles(key: string): string[] {
  return manifest[key] ?? [];
}

/** Get actual folder name for URL path (handles spaces; use normalized key) */
export function getAssetFolder(key: string): string {
  return folderNames[key] ?? key;
}

/** Keys we use in the app; manifest may have different names from your disk (we normalize) */
export const ASSET_KEYS = {
  channelDashboard: "channel-dashboard",
  channelAnalytics: "channel-analytics",
  revenue: "revenue-analytics",
  revenueLegacy: "revenue",
  buttons: "play-buttons",
  viralVideo: "viral-video-engineering",
  weeklyAnalytics: "weekly-scaling-pattern",
  weeklyLegacy: "weekly-analytics",
  textReviews: "text-messages-reviews",
} as const;
