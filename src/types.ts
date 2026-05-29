/**
 * TypeScript types for the NetSense Developer Simulator and interactive prototype.
 */

export interface NetworkSimState {
  carrier: "MTN" | "Airtel" | "Glo" | "9mobile";
  networkType: "2G" | "3G" | "4G" | "5G";
  signalStrength: number; // dBm (e.g. -90)
  signalBarCount: number; // 0 to 4
  latency: number; // ms
  downloadSpeed: number; // Mbps
  uploadSpeed: number; // Mbps
  congestionLevel: "Low" | "Medium" | "High";
  bestCarrierNow: "MTN" | "Airtel" | "Glo" | "9mobile";
}

export interface DataTrackerItem {
  packageName: string;
  appName: string;
  iconName: string; // lucide icon identifier
  foregroundMB: number;
  backgroundMB: number;
  nightMB: number; // Data used during 10PM - 6AM
  dayMB: number; // Data used during 6AM - 10PM
  category: "Social" | "Streaming" | "System" | "Gaming" | "Chat" | "Productivity" | "Entertainment";
  isBackgroundThief: boolean;
  status: "active" | "restricted" | "blocked";
}

export interface HeatmapPoint {
  id: string;
  lat: number;
  lng: number;
  areaName: string;
  dominantCarrier: "MTN" | "Airtel" | "Glo" | "9mobile";
  signalStrength: number; // dBm
  avgDownloadSpeed: number; // Mbps
  avgUploadSpeed: number; // Mbps
  congestion: "Low" | "Medium" | "High";
}

export interface InsightMessage {
  id: string;
  title: string;
  desc: string;
  severity: "warning" | "info" | "success";
  category: "data_thief" | "network" | "cost" | "optimization";
}

export interface SimulationConfig {
  timeOfDay: "Day" | "Night";
  activeSimMode: "MTN + Airtel" | "MTN + Glo" | "Airtel + 9mobile" | "Single SIM (MTN)";
  activeCarrier: "MTN" | "Airtel" | "Glo" | "9mobile";
  geolocationIndex: number; // Index of Lagos, Abuja, Kano, Port Harcourt
}

export interface CodeFileNode {
  path: string;
  name: string;
  language: "dart" | "kotlin" | "yaml" | "json" | "markdown";
  content: string;
  description: string;
}

export interface AdminUpdate {
  id: string;
  type: "announcement" | "freebie" | "media" | "ad";
  title: string;
  content: string;
  timestamp: string;
  mediaUrl?: string; // e.g. placeholder, customized pictures/videos
  mediaType?: "image" | "video";
  rewardMB?: number; // custom free data packet to claim
  buttonText?: string;
  advertiser?: string;
  discountCode?: string;
  linkUrl?: string;
  claimed?: boolean;
}

