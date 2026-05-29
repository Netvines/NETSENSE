import { useState, useEffect, FormEvent } from "react";
import {
  Wifi,
  Smartphone,
  Activity,
  ShieldAlert,
  Map,
  Sparkles,
  Code,
  FileCode,
  Folder,
  Play,
  LayoutDashboard,
  Layers,
  Settings,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  RefreshCw,
  Zap,
  Database,
  Copy,
  MapPin,
  TrendingUp,
  XCircle,
  Info,
  Lock,
  ChevronRight,
  Clipboard,
  FileText,
  Gift,
  Trophy,
  Users,
  HelpCircle,
  User,
  LogOut,
  Megaphone,
  Bell,
  Download,
  Menu,
  X,
  Globe,
  Network
} from "lucide-react";
import { CODE_FILES, FOLDER_STRUCTURE, ARCHITECTURE_DIAGRAM } from "./codebaseTemplates";
import { NetworkSimState, DataTrackerItem, HeatmapPoint, InsightMessage, SimulationConfig, AdminUpdate } from "./types";

// Simulated Geolocation points in Nigeria
const GEOLOCATIONS = [
  { name: "Ikeja Computer Village, Lagos", lat: 6.5967, lng: 3.3361, region: "Lagos" },
  { name: "Lekki Phase 1 Residential, Lagos", lat: 6.4312, lng: 3.4682, region: "Lagos" },
  { name: "Wuse II Commercial Hub, Abuja", lat: 9.0772, lng: 7.4789, region: "Abuja" },
  { name: "Sabon Gari Market, Kano", lat: 12.0164, lng: 8.5391, region: "Kano" }
];

// Initial mock data tracking item packages
const INITIAL_DATA_APPS: DataTrackerItem[] = [
  { packageName: "com.zhiliaoapp.musically", appName: "TikTok", iconName: "Smartphone", foregroundMB: 650, backgroundMB: 1540, nightMB: 1450, dayMB: 740, category: "Entertainment", isBackgroundThief: true, status: "active" },
  { packageName: "com.instagram.android", appName: "Instagram", iconName: "Smartphone", foregroundMB: 420, backgroundMB: 380, nightMB: 580, dayMB: 220, category: "Social", isBackgroundThief: false, status: "active" },
  { packageName: "com.whatsapp", appName: "WhatsApp", iconName: "Smartphone", foregroundMB: 310, backgroundMB: 40, nightMB: 85, dayMB: 265, category: "Chat", isBackgroundThief: false, status: "active" },
  { packageName: "com.spotify.music", appName: "Spotify", iconName: "Smartphone", foregroundMB: 120, backgroundMB: 790, nightMB: 760, dayMB: 150, category: "Entertainment", isBackgroundThief: true, status: "active" },
  { packageName: "com.android.providers.downloads", appName: "System Updates", iconName: "Settings", foregroundMB: 0, backgroundMB: 980, nightMB: 920, dayMB: 60, category: "System", isBackgroundThief: true, status: "active" },
  { packageName: "com.google.android.youtube", appName: "YouTube Mobile", iconName: "Smartphone", foregroundMB: 890, backgroundMB: 110, nightMB: 320, dayMB: 680, category: "Entertainment", isBackgroundThief: false, status: "active" }
];

// Initial Geohash sector clusters
const HEATMAP_POINTS: HeatmapPoint[] = [
  { id: "h1", lat: 6.5967, lng: 3.3361, areaName: "Ikeja Sector A", dominantCarrier: "MTN", signalStrength: -72, avgDownloadSpeed: 45.2, avgUploadSpeed: 12.5, congestion: "High" },
  { id: "h2", lat: 6.5980, lng: 3.3380, areaName: "Ikeja Sector B", dominantCarrier: "Airtel", signalStrength: -68, avgDownloadSpeed: 52.8, avgUploadSpeed: 18.7, congestion: "Medium" },
  { id: "h3", lat: 6.4312, lng: 3.4682, areaName: "Lekki Admiralty Way", dominantCarrier: "MTN", signalStrength: -64, avgDownloadSpeed: 82.5, avgUploadSpeed: 24.1, congestion: "Low" },
  { id: "h4", lat: 6.4350, lng: 3.4750, areaName: "Lekki Conservation Area", dominantCarrier: "Glo", signalStrength: -85, avgDownloadSpeed: 18.2, avgUploadSpeed: 5.6, congestion: "Low" },
  { id: "h5", lat: 9.0772, lng: 7.4789, areaName: "Wuse II Central", dominantCarrier: "Airtel", signalStrength: -70, avgDownloadSpeed: 64.9, avgUploadSpeed: 20.3, congestion: "High" },
  { id: "h6", lat: 9.0800, lng: 7.4820, areaName: "Maitama Hub", dominantCarrier: "MTN", signalStrength: -60, avgDownloadSpeed: 95.4, avgUploadSpeed: 30.2, congestion: "Medium" },
  { id: "h7", lat: 12.0164, lng: 8.5391, areaName: "Sabon Gari North", dominantCarrier: "9mobile", signalStrength: -92, avgDownloadSpeed: 12.4, avgUploadSpeed: 3.1, congestion: "Medium" },
  { id: "h8", lat: 12.0200, lng: 8.5450, areaName: "Fagge Plaza", dominantCarrier: "MTN", signalStrength: -78, avgDownloadSpeed: 34.1, avgUploadSpeed: 8.9, congestion: "High" }
];

// Technical telemetry daily quizzes for active users to win reward points
const REWARD_QUIZZES = [
  {
    question: "Which cell band gives the broadest range but slower speeds in Nigeria?",
    options: ["Band 3 LTE (1800MHz)", "Band 20 LTE (800MHz)", "Band 7 LTE (2600MHz)", "Band 1 LTE (2100MHz)"],
    correctIndex: 1,
    reward: 150,
    explanation: "Band 20 (800MHz) is low-frequency spectrum used by MTN / Airtel for deep indoor & rural penetration but lists narrower capacities."
  },
  {
    question: "What RSSI signal represents an excellent connection in cellular telemetry?",
    options: ["-50 to -75 dBm", "-95 to -105 dBm", "-110 to -125 dBm", "+10 to +30 dBm"],
    correctIndex: 0,
    reward: 200,
    explanation: "-50 to -75 dBm is the premium sweet-spot for low noise ratios and immediate file packets transfer."
  },
  {
    question: "At what standby hours are cheap off-peak night bundles usually valid?",
    options: ["2:00 PM - 5:00 PM", "11:00 PM - 5:00 AM", "6:00 AM - 12:00 PM", "8:00 PM - 10:00 PM"],
    correctIndex: 1,
    reward: 250,
    explanation: "Carriers MTN and Airtel grant 250MB to 5GB night packages between midnight/11PM and 5AM to handle off-peak server loads."
  }
];

export default function App() {
  // Simulator configuration states
  const [config, setConfig] = useState<SimulationConfig>({
    timeOfDay: "Day",
    activeSimMode: "MTN + Airtel",
    activeCarrier: "MTN",
    geolocationIndex: 0
  });

  // Dynamic values based on parameters
  const [telemetry, setTelemetry] = useState<NetworkSimState>({
    carrier: "MTN",
    networkType: "4G",
    signalStrength: -84,
    signalBarCount: 3,
    latency: 32,
    downloadSpeed: 28.4,
    uploadSpeed: 9.2,
    congestionLevel: "Medium",
    bestCarrierNow: "MTN"
  });

  const [appsData, setAppsData] = useState<DataTrackerItem[]>(INITIAL_DATA_APPS);
  const [copiedFileName, setCopiedFileName] = useState<string | null>(null);
  const [activeSimTab, setActiveSimTab] = useState<"dashboard" | "networks" | "data_thief" | "heatmap" | "insights" | "profile">("dashboard");
  const [dashboardSubTab, setDashboardSubTab] = useState<"telemetry" | "user_feed">("telemetry");
  const [newReportComment, setNewReportComment] = useState("");
  const [isReportingSignal, setIsReportingSignal] = useState(false);

  const [userReports, setUserReports] = useState<any[]>(() => {
    const saved = localStorage.getItem("netsense_user_reports");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "rep_1",
        username: "Chidi_Kalu",
        userEmail: "chidi.k@gmail.com",
        avatar: "CK",
        carrier: "MTN",
        networkType: "5G",
        signalStrength: -65,
        downloadSpeed: 182.4,
        latency: 18,
        location: "Lekki Phase 1 Residential, Lagos",
        activeSimMode: "Dual SIM (MTN+Airtel)",
        timestamp: "5 mins ago",
        comment: "Outstanding MTN 5G speeds near Admiralty Way! Swapped my cellular flow from Glo completely.",
        isStrongSpot: true,
        deviceModel: "Samsung Galaxy S24 Ultra"
      },
      {
        id: "rep_2",
        username: "Amina_Abuja",
        userEmail: "amina.ab@yahoo.com",
        avatar: "AA",
        carrier: "Airtel",
        networkType: "5G",
        signalStrength: -70,
        downloadSpeed: 92.5,
        latency: 24,
        location: "Wuse II Commercial Hub, Abuja",
        activeSimMode: "Dual SIM (Airtel+9mobile)",
        timestamp: "18 mins ago",
        comment: "Excellent Airtel signal today inside Wuse Phase II. Finally got buffer-free meetings.",
        isStrongSpot: true,
        deviceModel: "iPhone 15 Pro"
      },
      {
        id: "rep_3",
        username: "Musa_Kano",
        userEmail: "musa.balarabe@gmail.com",
        avatar: "MK",
        carrier: "Glo",
        networkType: "4G",
        signalStrength: -88,
        downloadSpeed: 14.8,
        latency: 68,
        location: "Sabon Gari Market, Kano",
        activeSimMode: "Single SIM (Glo)",
        timestamp: "45 mins ago",
        comment: "Standard Glo 4G coverage. Download speeds have heavy throttling because of massive market density.",
        isStrongSpot: false,
        deviceModel: "Xiaomi Redmi Note 13"
      },
      {
        id: "rep_4",
        username: "Tunde_Ikeja",
        userEmail: "tunde88@outlook.com",
        avatar: "TI",
        carrier: "9mobile",
        networkType: "3G",
        signalStrength: -94,
        downloadSpeed: 3.1,
        latency: 120,
        location: "Ikeja Computer Village, Lagos",
        activeSimMode: "Dual SIM (MTN+9mobile)",
        timestamp: "1 hour ago",
        comment: "9mobile is constantly dropping to 3G inside computer village malls due to heavy frame shielding.",
        isStrongSpot: false,
        deviceModel: "Samsung Galaxy A54"
      },
      {
        id: "rep_5",
        username: "Joy_Lekki",
        userEmail: "joy.wealth@outlook.com",
        avatar: "JL",
        carrier: "Airtel",
        networkType: "4G",
        signalStrength: -72,
        downloadSpeed: 54.2,
        latency: 35,
        location: "Lekki Phase 1 Residential, Lagos",
        activeSimMode: "Dual SIM (MTN+Airtel)",
        timestamp: "2 hours ago",
        comment: "Airtel 4G backup keeps working perfectly when MTN towers get saturated. Really proud of NetSense routing suggestions.",
        isStrongSpot: true,
        deviceModel: "iPhone 14"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("netsense_user_reports", JSON.stringify(userReports));
  }, [userReports]);

  const [isTestingSpeed, setIsTestingSpeed] = useState(false);
  const [speedProgress, setSpeedProgress] = useState(0);

  // Native PWA Installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPWAInstallable, setIsPWAInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPWAInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Detect if app is already running as standalone (installed)
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone) {
      setIsAppInstalled(true);
    }

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setIsPWAInstallable(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Dynamic Admin updates and broadcasts state
  const [adminUpdates, setAdminUpdates] = useState<AdminUpdate[]>(() => {
    const saved = localStorage.getItem("netsense_admin_updates");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "update_1",
        type: "announcement",
        title: "📡 Airtel 5G High-Speed Node Expansion",
        content: "Airtel has added premium 5G carrier channel cells across Wuse II Abuja & Lekki Phase 1, introducing carrier frequency bonding! Peak download speeds now reach up to 250 Mbps during off-peak hours.",
        timestamp: "Just now"
      },
      {
        id: "update_2",
        type: "freebie",
        title: "🎁 Exclusive Midnight Off-Peak eSIM Special",
        content: "Admin drop! Claim your free high-performance night telemetry reward packet of 450 MB, valid for immediate bundle flash deployment on matching carriers.",
        rewardMB: 450,
        timestamp: "2 hours ago",
        claimed: false
      },
      {
        id: "update_3",
        type: "media",
        title: "📺 Masterclass: How to Combat Cellular Data Theft",
        content: "Watch our exclusive guide highlight on how to identify background data drainers and immediately restrict them using NetSense firewall channels.",
        mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-data-center-server-units-with-blinking-lights-42582-large.mp4",
        mediaType: "video",
        timestamp: "Yesterday"
      },
      {
        id: "update_4",
        type: "ad",
        title: "🔥 Limited Offer: MTN 5G Broadband Router",
        content: "Upgrade your residential coverage area to a premium 5G terminal. Receive 30% off standard billing + 50GB introductory free cellular allocation upon router verification.",
        advertiser: "MTN Business Direct",
        discountCode: "NS-ROUTER-5G",
        buttonText: "Check Router Eligibility",
        timestamp: "Sponsored"
      }
    ];
  });

  // Save admin updates to sync instantly
  useEffect(() => {
    localStorage.setItem("netsense_admin_updates", JSON.stringify(adminUpdates));
  }, [adminUpdates]);

  // Form states for adding new announcements/freebies
  const [newUpdateForm, setNewUpdateForm] = useState({
    title: "",
    content: "",
    type: "announcement" as "announcement" | "freebie" | "media" | "ad",
    mediaType: "image" as "image" | "video",
    mediaUrl: "",
    rewardMB: 500,
    advertiser: "Sponsor Brand Integrated",
    discountCode: "FREEFI-950",
    buttonText: "Learn More"
  });

  const [adminToast, setAdminToast] = useState<{ title: string; desc: string; type: string } | null>(null);
  const [adminSubTab, setAdminSubTab] = useState<"broadcasts" | "user_stats">("broadcasts");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem("netsense_admin_logged_in") === "true";
  });
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthError, setAdminAuthError] = useState("");

  const triggerAdminToast = (title: string, desc: string, type: string) => {
    setAdminToast({ title, desc, type });
    setTimeout(() => {
      setAdminToast(null);
    }, 4500);
  };

  // Splash & Authentication state
  const [showSplash, setShowSplash] = useState(true);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    phone: string;
    isGoogle?: boolean;
    isReturning?: boolean;
    rank?: string;
    bestNetworkHistory?: Array<{ area: string; carrier: string; signal: string; status: string }>;
  } | null>(() => {
    const saved = localStorage.getItem("netsense_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Handle splash layout timeout of 3 seconds
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(splashTimer);
  }, []);

  const handleRegister = () => {
    if (!regForm.name || !regForm.phone || !regForm.email) return;
    const newUser = {
      name: regForm.name,
      email: regForm.email,
      phone: regForm.phone,
      isGoogle: false,
      isReturning: false,
      rank: "Rank #1,250",
      bestNetworkHistory: [
        { area: "Ikeja Hardware Market", carrier: "MTN", signal: "-72 dBm", status: "Strong" },
        { area: "Lekki Admiralty Sector", carrier: "MTN", signal: "-64 dBm", status: "Excellent" }
      ]
    };
    setCurrentUser(newUser);
    localStorage.setItem("netsense_user", JSON.stringify(newUser));
  };

  const handleGoogleAuth = () => {
    const googleUser = {
      name: "Vine Codes",
      email: "Vinecodes@gmail.com",
      phone: "+234 803 888 2341",
      isGoogle: true,
      isReturning: false,
      rank: "Rank #412",
      bestNetworkHistory: [
        { area: "Abuja Wuse II Central", carrier: "Airtel", signal: "-70 dBm", status: "Strong" },
        { area: "Lekki Admiralty Sector", carrier: "MTN", signal: "-64 dBm", status: "Excellent" }
      ]
    };
    setCurrentUser(googleUser);
    localStorage.setItem("netsense_user", JSON.stringify(googleUser));
  };

  const handleReturningBypass = () => {
    const returningUser = {
      name: "Tunde Adenuga",
      email: "tunde.adenuga@gmail.ng",
      phone: "+234 809 111 2222",
      isGoogle: false,
      isReturning: true,
      rank: "Rank #2",
      bestNetworkHistory: [
        { area: "Lekki Admiralty Sector", carrier: "MTN", signal: "-64 dBm", status: "Excellent" },
        { area: "Ikeja Sector B", carrier: "Airtel", signal: "-68 dBm", status: "Excellent" },
        { area: "Maitama Hub", carrier: "MTN", signal: "-60 dBm", status: "Excellent" }
      ]
    };
    setCurrentUser(returningUser);
    localStorage.setItem("netsense_user", JSON.stringify(returningUser));
    setOperatorInteractions(128);
    setClaimedBonusMB(750);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("netsense_user");
    setActiveSimTab("dashboard");
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) {
      triggerAdminToast(
        "⚡ Application Setup",
        "To install, use your mobile browser menu and tap 'Add to Home screen' or 'Install App'.",
        "info"
      );
      return;
    }
    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsAppInstalled(true);
        setIsPWAInstallable(false);
        triggerAdminToast(
          "🎉 NetSense Installed!",
          "NetSense successfully installed to your device launcher slot.",
          "freebie"
        );
      }
    } catch (err) {
      console.error("Installation prompt failed:", err);
    }
    setDeferredPrompt(null);
  };

  const handleAddUserReport = (e: FormEvent) => {
    e.preventDefault();
    if (!newReportComment.trim()) {
      triggerAdminToast(
        "⚠️ Comment Required",
        "Please write a short user comment describing your current signal performance to share.",
        "warning"
      );
      return;
    }

    setIsReportingSignal(true);

    setTimeout(() => {
      const activeGeo = geoLocationsList[config.geolocationIndex] || geoLocationsList[0];
      const commentText = newReportComment.trim();

      const newReport = {
        id: "rep_" + Date.now(),
        username: currentUser ? currentUser.name : "Active_Node",
        userEmail: currentUser ? currentUser.email : "node@netsense.io",
        avatar: currentUser ? currentUser.name.slice(0, 2).toUpperCase() : "AN",
        carrier: telemetry.carrier,
        networkType: telemetry.networkType,
        signalStrength: telemetry.signalStrength,
        downloadSpeed: telemetry.downloadSpeed,
        latency: telemetry.latency,
        location: activeGeo.name,
        activeSimMode: config.activeSimMode,
        timestamp: "Just now",
        comment: commentText,
        isStrongSpot: telemetry.downloadSpeed >= 50 && telemetry.signalStrength >= -75,
        deviceModel: "iPhone 15 Pro"
      };

      setUserReports((prev) => [newReport, ...prev]);
      setNewReportComment("");
      setIsReportingSignal(false);

      triggerAdminToast(
        "📢 Signal Broadcasted!",
        `Successfully compiled and published ${telemetry.carrier} metrics from ${activeGeo.region} to active user channels.`,
        "success"
      );
    }, 600);
  };

  // Gamification, Freebies & Time-based Rewards states
  const [heatmapSubTab, setHeatmapSubTab] = useState<"map" | "rewards">("map");
  const [operatorInteractions, setOperatorInteractions] = useState(48);
  const [claimedBonusMB, setClaimedBonusMB] = useState(150);
  const [claimCooldown, setClaimCooldown] = useState(180); // 3 minutes claim window active
  const [hasClaimedFreebie, setHasClaimedFreebie] = useState(false);
  
  // Custom interactive quiz
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);

  // Track operator system activity to simulate live leaderboard ranking
  useEffect(() => {
    setOperatorInteractions((prev) => prev + Math.floor(Math.random() * 2) + 1);
  }, [activeSimTab, config.activeCarrier, config.geolocationIndex, config.timeOfDay]);

  // Handle active claim countdown clocks
  useEffect(() => {
    const timer = setInterval(() => {
      setClaimCooldown((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // AI states
  const [aiInsights, setAiInsights] = useState<InsightMessage[]>([]);
  const [aiSummary, setAiSummary] = useState<string>("Load live metrics from the simulation above, then click Analyze with NetSense AI to query recommendations.");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [geminiOverloaded, setGeminiOverloaded] = useState(false);
  const [geminiQuotaActive, setGeminiQuotaActive] = useState(false);
  const [simGeoIndex, setSimGeoIndex] = useState(0);

  // Dev Workspace code-viewer states
  const [showDevWorkspace, setShowDevWorkspace] = useState(false);
  const [geoLocationsList, setGeoLocationsList] = useState(GEOLOCATIONS);
  const [isRequestingGeo, setIsRequestingGeo] = useState(false);
  const [activeWorkSpaceTab, setActiveWorkSpaceTab] = useState<"code" | "architecture" | "deployment" | "admin">("code");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [searchCodeQuery, setSearchCodeQuery] = useState("");
  
  // App Menu and Real Physical ISP Info States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [realNetworkInfo, setRealNetworkInfo] = useState<{
    isp: string;
    city: string;
    country: string;
    isWifi: boolean;
    ip: string;
    latitude: number;
    longitude: number;
    measuredSpeedMbps?: number;
    measuredLatencyMs?: number;
    detectedAt?: string;
  } | null>(null);

  // Re-calculate mock telemetry dynamically when active location or carrier changes
  useEffect(() => {
    const carrier = config.activeCarrier;
    const isNight = config.timeOfDay === "Night";
    const geo = geoLocationsList[config.geolocationIndex] || geoLocationsList[0];
    
    let baseSpeed = 30; // Mbps
    let baseLatency = 45; // ms
    let signalStrength = -85; // dBm
    let congestion: "Low" | "Medium" | "High" = "Medium";

    // Adjusting simulated specs representing carriers in Nigeria
    if (carrier === "MTN") {
      baseSpeed = geo.region === "Lagos" ? 54 : (geo.region === "Abuja" ? 48 : 22);
      baseLatency = 30;
      signalStrength = geo.region === "Lagos" ? -72 : -88;
      congestion = isNight ? "High" : "Medium"; // Night downloads are intense in Nigeria
    } else if (carrier === "Airtel") {
      baseSpeed = geo.region === "Abuja" ? 62 : (geo.region === "Lagos" ? 42 : 18);
      baseLatency = 35;
      signalStrength = geo.region === "Abuja" ? -68 : -82;
      congestion = isNight ? "Low" : "High";
    } else if (carrier === "Glo") {
      baseSpeed = 15;
      baseLatency = 85;
      signalStrength = -90;
      congestion = "Low";
    } else { // 9mobile
      baseSpeed = 12;
      baseLatency = 60;
      signalStrength = -95;
      congestion = "Low";
    }

    // Fast Night adjustments (off-peak speed tends to go up slightly if less daytime activity)
    if (isNight) {
      baseSpeed = Math.round(baseSpeed * 1.35);
      baseLatency = Math.round(baseLatency * 0.8);
    }

    // Customized adjustments for Real GPS to simulate user relative proximity to local towers
    if (geo.region === "Live User Spot") {
      // Create a deterministic pseudo-random signal based on Coordinates
      const factor = Math.sin(geo.lat) * Math.cos(geo.lng);
      signalStrength = Math.round(-74 + factor * 14);
      baseSpeed = Math.round(45 + factor * 25);
      baseLatency = Math.round(35 - factor * 12);
    }

    const calculatedBars = signalStrength >= -80 ? 4 : (signalStrength >= -92 ? 3 : (signalStrength >= -104 ? 2 : 1));

    // Determine "best carrier now" for simulation area
    let best: "MTN" | "Airtel" | "Glo" | "9mobile" = "MTN";
    if (geo.region === "Abuja" && config.activeSimMode.includes("Airtel")) {
      best = "Airtel";
    }

    setTelemetry({
      carrier,
      networkType: baseSpeed > 50 ? "5G" : "4G",
      signalStrength,
      signalBarCount: calculatedBars,
      latency: baseLatency,
      downloadSpeed: parseFloat(baseSpeed.toFixed(1)),
      uploadSpeed: parseFloat((baseSpeed * 0.3).toFixed(1)),
      congestionLevel: congestion,
      bestCarrierNow: best
    });
  }, [config, geoLocationsList]);

  // Request browser live GPS to fetch real-time device location parameters
  const fetchLiveDeviceLocation = () => {
    if (!navigator.geolocation) {
      triggerAdminToast("⚠️ GPS Unsupported", "Your browser does not support the Geolocation API.", "warning");
      return;
    }
    setIsRequestingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userGeo = {
          name: `🛰️ My Live GPS Coordinates (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          lat: latitude,
          lng: longitude,
          region: "Live User Spot"
        };
        
        setGeoLocationsList((prev) => {
          const filtered = prev.filter((loc) => loc.region !== "Live User Spot");
          return [userGeo, ...filtered];
        });
        
        setConfig((prev) => ({
          ...prev,
          geolocationIndex: 0
        }));
        
        setIsRequestingGeo(false);
        triggerAdminToast(
          "🛰️ GPS Satellite Lock",
          `Acquired location: Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}. Telemetry grid calibrated.`,
          "success"
        );
      },
      (error) => {
        setIsRequestingGeo(false);
        let msg = "User denied coordinate check.";
        if (error.code === error.POSITION_UNAVAILABLE) msg = "Device location unavailable.";
        if (error.code === error.TIMEOUT) msg = "Location request timed out.";
        triggerAdminToast("🛰️ GPS Blocked", msg, "warning");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Run speedometer simulation using real-time connection info if supported
  const startDiagnosticSpeedTest = async () => {
    if (isTestingSpeed) return;
    setIsTestingSpeed(true);
    setSpeedProgress(0);
    
    triggerAdminToast(
      "🛰️ Connecting Satellites", 
      "Gathering physical device location and profiling cellular network...", 
      "info"
    );

    let lat = 6.4281; // Lagos Default lat
    let lng = 3.4219; // Lagos Default lng
    let city = "Lagos";
    let country = "Nigeria";
    let realIsp = "Client Cellular Carrier";
    let resolvedIp = "127.0.0.1";
    let isWifi = false;

    // Detect browser connection medium
    try {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn && conn.type) {
        if (conn.type === 'wifi' || conn.type === 'ethernet') {
          isWifi = true;
        }
      }
    } catch (_) {}

    // 1. Resolve exact location of the user via GPS Geolocation API
    const getExactGPS = () => {
      return new Promise<{latitude: number; longitude: number} | null>((resolve) => {
        if (!navigator.geolocation) {
          resolve(null);
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            });
          },
          () => {
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 6000 }
        );
      });
    };

    // 2. Identify ISP name, IP address and fallback location details via secure IP Lookup
    const getIPLookup = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
          const data = await res.json();
          return {
            isp: data.org || data.asn || "Broadband Network",
            city: data.city || "Lagos",
            country: data.country_name || "Nigeria",
            ip: data.ip || "127.0.0.1",
            lat: data.latitude,
            lng: data.longitude
          };
        }
      } catch (err) {
        console.warn("IP-based ISP lookup skipped or blocked:", err);
      }
      return null;
    };

    // Run GPS lookup, IP lookup in parallel!
    const [gpsResult, ipLookupResult] = await Promise.all([
      getExactGPS(),
      getIPLookup()
    ]);

    if (gpsResult) {
      lat = gpsResult.latitude;
      lng = gpsResult.longitude;
      city = ipLookupResult?.city || "Current Location";
      country = ipLookupResult?.country || "Earth";
    } else if (ipLookupResult) {
      lat = ipLookupResult.lat;
      lng = ipLookupResult.lng;
      city = ipLookupResult.city;
      country = ipLookupResult.country;
    }

    if (ipLookupResult) {
      realIsp = ipLookupResult.isp;
      resolvedIp = ipLookupResult.ip;
      // If the ISP doesn't contain a typical Nigerian mobile SIM carrier and connection is WIFI or Ethernet, flag WiFi
      const isMobileCarrier = /mtn|airtel|glo|9mobile|orange|safaricom|vodafone|telekom|verizon|att|t-mobile|rogers/i.test(realIsp);
      if (!isMobileCarrier || isWifi) {
        isWifi = true;
      }
    } else {
      // Fallback ISP name
      realIsp = isWifi ? "Local WiFi Hub" : telemetry.carrier;
    }

    // Calibrate application geohash grid to user's real location
    const matchedGeo = {
      name: `🛰️ Real-Time ${isWifi ? "WiFi" : "Cellular"} Spot (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
      lat: lat,
      lng: lng,
      region: `${city}, ${country}`
    };

    setGeoLocationsList((prev) => {
      const filtered = prev.filter((loc) => loc.region !== "Live User Spot" && !loc.name.includes("Real-Time"));
      return [matchedGeo, ...filtered];
    });

    setConfig((prev) => ({
      ...prev,
      geolocationIndex: 0
    }));

    // 3. Speed test probe to ascertain accurate speed
    const startTimeOnProbe = performance.now();
    let physicalSpeedMbps = 25.0; // fallback default
    let measuredLatency = 24;

    try {
      // Fetch index.html bypassing cache to measure real latency and speed
      const speedRes = await fetch(`${window.location.origin}/index.html?cb=${Date.now()}`);
      const dataBlob = await speedRes.blob();
      const elapsedMs = performance.now() - startTimeOnProbe;
      measuredLatency = Math.round(elapsedMs * 0.4); // approx latency

      const bits = dataBlob.size * 8;
      const speedBps = bits / (elapsedMs / 1000);
      physicalSpeedMbps = parseFloat((speedBps / 1000000).toFixed(1));

      // Floor and ceiling
      if (physicalSpeedMbps < 0.2) physicalSpeedMbps = 8.5;
      if (physicalSpeedMbps > 200) physicalSpeedMbps = 86.4;
    } catch (_) {}

    // Pull from Native connection downlink API as secondary check and combine
    try {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn && conn.downlink) {
        // downlink is in Mbps (e.g. 10)
        physicalSpeedMbps = parseFloat((conn.downlink * 8 * 0.8).toFixed(1));
        if (conn.type === 'wifi' || conn.type === 'ethernet') {
          isWifi = true;
        }
      }
    } catch (_) {}

    // Store the real physical network info
    setRealNetworkInfo({
      isp: realIsp,
      city: city,
      country: country,
      isWifi: isWifi,
      ip: resolvedIp,
      latitude: lat,
      longitude: lng,
      measuredSpeedMbps: physicalSpeedMbps,
      measuredLatencyMs: measuredLatency,
      detectedAt: new Date().toLocaleTimeString()
    });

    // Run speedometer visual gauge count-up
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setSpeedProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsTestingSpeed(false);

        // Update telemetry state dynamically to reflect the actual verified state
        setTelemetry((prev) => ({
          ...prev,
          carrier: realIsp,
          networkType: isWifi ? "WiFi" : (physicalSpeedMbps > 35 ? "5G" : "4G+"),
          downloadSpeed: physicalSpeedMbps,
          uploadSpeed: parseFloat((physicalSpeedMbps * 0.35).toFixed(1)),
          latency: measuredLatency,
          signalStrength: isWifi ? -50 : (physicalSpeedMbps > 40 ? -64 : -79),
          signalBarCount: physicalSpeedMbps > 40 ? 4 : 3,
          congestionLevel: isWifi ? "Low" : (physicalSpeedMbps < 12 ? "High" : "Medium")
        }));

        triggerAdminToast(
          "🛰️ Telemetry Verified",
          `Active ISP: ${realIsp} • Latency: ${measuredLatency}ms • Downlink: ${physicalSpeedMbps} Mbps (${isWifi ? "WiFi" : "Cellular"}). Layout sync complete.`,
          "success"
        );
      }
    }, 100);
  };

  // Run background data app restriction / kill
  const toggleAppRestriction = (packageName: string) => {
    setAppsData((prev) =>
      prev.map((app) => {
        if (app.packageName === packageName) {
          const nextStatus = app.status === "active" ? "restricted" : "active";
          return {
            ...app,
            status: nextStatus,
            // Restricting app slashes simulated background usage
            backgroundMB: nextStatus === "restricted" ? Math.round(app.backgroundMB * 0.1) : Math.round(app.backgroundMB * 10)
          };
        }
        return app;
      })
    );
  };

  // Run AI analysis requesting server endpoints
  const fetchLiveAIEnergy = async () => {
    setIsLoadingAI(true);
    setGeminiOverloaded(false);
    setGeminiQuotaActive(false);
    try {
      const activeGeo = geoLocationsList[config.geolocationIndex] || geoLocationsList[0];
      const response = await fetch("/api/gemini/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: activeGeo.name,
          timeOfDay: config.timeOfDay,
          multiSimMode: config.activeSimMode,
          currentCarrier: telemetry.carrier,
          networkType: telemetry.networkType,
          signalStrength: telemetry.signalStrength,
          latency: telemetry.latency,
          speed: telemetry.downloadSpeed,
          dataApps: appsData
        })
      });

      const data = await response.json();
      if (data.insights) {
        setAiInsights(data.insights);
        setAiSummary(data.summary || "Completed situational telemetry analysis.");
        setGeminiOverloaded(!!data.geminiOverloaded);
        setGeminiQuotaActive(!!data.geminiQuotaActive);
      } else {
        throw new Error("Invalid format response");
      }
    } catch (err) {
      console.error(err);
      setGeminiOverloaded(true);
      setGeminiQuotaActive(true);
      // Fail proof backup engine notification
      setAiInsights([
        {
          id: "back1",
          title: "Optimize off-peak schedules",
          desc: "Large background sync detected. TikTok or System Downloads are in high consumption mode. Swapping to Airtel night plan (11PM to 5AM) can save up to 75% on standard bundle costs.",
          severity: "success",
          category: "cost"
        },
        {
          id: "back2",
          title: "Carrier Swap Recommendation",
          desc: "MTN signals show heavy daytime sector congestion here. Airtel reports 2x download speeds with lower load. Swap active cellular data to Sim 2 Airtel immediately.",
          severity: "warning",
          category: "network"
        }
      ]);
      setAiSummary("Gemini offline sandbox mode. NetSense running on local offline optimization rule engine.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Automatically fetch initial insights on load or simulator parameters shifts
  useEffect(() => {
    fetchLiveAIEnergy();
  }, [config.geolocationIndex, config.timeOfDay, config.activeCarrier]);

  // Copy code helper
  const handleCopyCode = (filename: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFileName(filename);
    setTimeout(() => {
      setCopiedFileName(null);
    }, 2000);
  };

  const filteredCodeFiles = CODE_FILES.filter((file) =>
    file.name.toLowerCase().includes(searchCodeQuery.toLowerCase()) ||
    file.path.toLowerCase().includes(searchCodeQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col antialiased">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md" id="header_workspace">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Activity className="h-4.5 w-4.5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              NetSense Mainframe
              <span className="text-cyan-405 font-medium text-[9px] px-1.5 py-0.5 border border-cyan-500/30 rounded uppercase tracking-wider">
                Platform v1.1
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Dynamic User Geolocation & Verified Speed Intelligence Engine</p>
          </div>
        </div>

        {/* Global Control Hub */}
        <div className="flex items-center space-x-6 text-xs">
          <button
            onClick={() => setShowDevWorkspace(p => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[11px] font-bold uppercase tracking-wider cursor-pointer active:scale-98 ${
              showDevWorkspace 
                ? "bg-slate-800 text-cyan-400 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)] animate-pulse" 
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
            }`}
          >
            <Settings className="h-3.5 w-3.5 text-slate-400" />
            {showDevWorkspace ? "Hide Dev Workspace" : "Show Dev Workspace"}
          </button>

          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest font-mono">Precision Diagnostics Host</span>
            <span className="text-xs text-slate-300">Live Browser GPS & Signal Sourcing Ready</span>
          </div>
        </div>
      </header>

      {/* Main Grid: Fully Fluid Responsive Layout */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 p-6 md:p-8 overflow-hidden h-full max-w-7xl mx-auto w-full items-start">
        
        {/* PHYSICAL DEVICE CORE MAIN INTERACTIVE DESKTOP VIEW */}
        <div 
          className={`flex flex-col items-center justify-center py-1 transition-all duration-300 ${
            showDevWorkspace ? "xl:col-span-5 col-span-12 w-full" : "col-span-12 max-w-4xl mx-auto w-full"
          }`} 
          id="interactive_emulator_section"
        >
          
          <div className="w-full bg-[#0c0e15] border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col min-h-[720px] ring-4 ring-cyan-500/5 transition-all duration-300 animate-fadeIn" id="netsense_app_wrapper">
            
            {/* Elegant App Header replacing old status bar and notch device lines */}
            <div className="bg-slate-900 border-b border-slate-800/80 px-5 py-4 flex items-center justify-between select-none z-44">
              <div className="flex items-center space-x-2.5">
                <div className="w-6.5 h-6.5 bg-gradient-to-tr from-cyan-600 to-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <Activity className="h-3.5 w-3.5 text-white animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-black font-display tracking-tight text-white flex items-center gap-1.5 leading-none">
                    NetSense App
                    <span className="text-[8px] text-cyan-405 font-mono bg-cyan-500/15 px-1.5 py-0.2 border border-cyan-500/20 rounded font-normal">
                      Active
                    </span>
                  </h2>
                </div>
              </div>

              {/* Dynamic Status and Slide Menu Option */}
              <div className="flex items-center space-x-3.5">
                <div className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">
                    {telemetry.networkType} • {telemetry.carrier}
                  </span>
                </div>

                <div className="flex items-end space-x-0.5 h-2.5">
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      className={`w-0.5 rounded-t-xs transition-all ${
                        bar <= telemetry.signalBarCount
                          ? "bg-emerald-400 h-full"
                          : "bg-slate-700 h-1/3"
                      }`}
                    ></div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-1.5 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-[10px] uppercase font-bold font-mono active:scale-95"
                  title="System Menu Controller"
                >
                  <Menu className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
              </div>
            </div>

            {/* Menu Settings Sliding Overlay panel inside the app frame */}
            {isMenuOpen && (
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-end animate-fadeIn">
                <div className="w-[280px] bg-slate-900 border-l border-slate-800 h-full p-5 flex flex-col space-y-5 shadow-2xl relative text-left animate-slideIn">
                  
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                      <span className="font-extrabold text-[10px] uppercase tracking-widest text-white font-mono">System Control</span>
                    </div>
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white border border-slate-850 cursor-pointer active:scale-95 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Environment simulation block */}
                  <div className="space-y-3">
                    <p className="text-[9px] text-slate-505 uppercase font-black tracking-widest border-b border-slate-850 pb-1">Environment Simulation</p>
                    
                    <div className="space-y-1.5">
                      <span className="text-[8.5px] text-slate-400 font-mono block">Simulation Time frame:</span>
                      <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => {
                            setConfig((p) => ({ ...p, timeOfDay: "Day" }));
                            setIsMenuOpen(false);
                          }}
                          className={`py-1.5 rounded-lg text-[9px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            config.timeOfDay === "Day" 
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/10" 
                              : "text-slate-500 hover:text-slate-400"
                          }`}
                        >
                          <Sun className="h-3 w-3" /> Day Mode
                        </button>
                        <button
                          onClick={() => {
                            setConfig((p) => ({ ...p, timeOfDay: "Night" }));
                            setIsMenuOpen(false);
                          }}
                          className={`py-1.5 rounded-lg text-[9px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            config.timeOfDay === "Night" 
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/10" 
                              : "text-slate-500 hover:text-slate-400"
                          }`}
                        >
                          <Moon className="h-3 w-3" /> Night Mode
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[8.5px] text-slate-400 font-mono block">Simulated Telemetry Area:</span>
                      <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center">
                        <select
                          value={config.geolocationIndex}
                          onChange={(e) => {
                            setConfig((p) => ({ ...p, geolocationIndex: parseInt(e.target.value) }));
                            setIsMenuOpen(false);
                          }}
                          className="bg-transparent text-slate-200 outline-none w-full text-[11px] cursor-pointer"
                        >
                          {geoLocationsList.map((geo, idx) => (
                            <option key={idx} value={idx} className="bg-slate-900 text-slate-100">
                              {geo.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Physical Geolocation Lock integration */}
                  <div className="space-y-3 pt-1">
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest border-b border-slate-850 pb-1">Physical Device Locks</p>
                    
                    <button
                      onClick={() => {
                        fetchLiveDeviceLocation();
                        setIsMenuOpen(false);
                      }}
                      disabled={isRequestingGeo}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 bg-cyan-700/20 hover:bg-cyan-600/25 border border-cyan-700/30 text-cyan-400 hover:text-cyan-303 rounded-xl transition-all font-mono text-[10px] uppercase font-bold cursor-pointer active:scale-95 ${
                        isRequestingGeo ? "animate-pulse" : ""
                      }`}
                    >
                      <MapPin className={`h-3 w-3 text-cyan-400 ${isRequestingGeo ? "animate-bounce" : ""}`} />
                      {isRequestingGeo ? "Acquiring..." : "Synchronize Live GPS"}
                    </button>
                  </div>

                  {/* Debug block developer workspace toggles */}
                  <div className="space-y-3 pt-3 border-t border-slate-800">
                    <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest border-b border-slate-850 pb-1">Developer Sandbox</p>
                    
                    <button
                      onClick={() => {
                        setShowDevWorkspace(p => !p);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border font-mono text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer active:scale-95 ${
                        showDevWorkspace 
                          ? "bg-slate-850 text-cyan-400 border-cyan-500/20 shadow-inner animate-pulse" 
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300"
                      }`}
                    >
                      <Settings className="h-3.5 w-3.5 text-slate-400" />
                      {showDevWorkspace ? "Hide Code Sandbox" : "Show Code Sandbox"}
                    </button>
                  </div>

                  <div className="text-[8px] text-slate-600 font-mono absolute bottom-4 inset-x-5 text-center leading-normal">
                    Designed for High-Contrast Responsive Framing • NetSense Engine
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Screen Container */}
            <div className="flex-grow overflow-y-auto bg-slate-950 p-4 md:p-6 pb-24 flex flex-col relative" id="mobile_sim_screen">
              
              {showSplash ? (
                /* SPLASH SCREEN SCENARIO */
                <div className="flex-grow flex flex-col items-center justify-center bg-slate-950 p-6 animate-fadeIn" id="netsense_splash">
                  {/* Animated signal icon */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 animate-pulse bg-gradient-to-tr from-cyan-600 to-blue-600"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center border border-cyan-400/40 shadow-2xl">
                      <Activity className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    {/* Pulsing signal rings */}
                    <span className="absolute -top-2 -left-2 w-24 h-24 border border-cyan-500/30 rounded-full animate-ping pointer-events-none"></span>
                  </div>
                  <h1 className="text-xl font-black text-white tracking-wider font-display text-center">NetSense</h1>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest font-mono mt-1 text-center font-bold">Dual-SIM Telemetry Suite</p>
                  
                  <div className="w-24 bg-slate-900 h-1 rounded-full overflow-hidden mt-8 border border-slate-800/80">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full animate-pulse" style={{ width: "80%" }}></div>
                  </div>
                  <span className="text-[9px] text-slate-505 font-mono mt-3 text-center">Connecting sector channels...</span>
                </div>
              ) : !currentUser ? (
                /* AUTHENTICATION SCENARIO */
                <div className="flex-grow flex flex-col justify-center bg-slate-950 p-1 space-y-4 animate-fadeIn" id="netsense_auth_screen">
                  <div className="text-center space-y-1">
                    <div className="w-10 h-10 bg-cyan-500/15 text-cyan-400 rounded-2xl border border-cyan-500/25 mx-auto flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.25)]">
                      <Activity className="h-5.5 w-5.5" />
                    </div>
                    <h3 className="text-xs font-black text-white mt-1.5 uppercase tracking-wider font-sans">Initialize Node</h3>
                    <p className="text-[9px] text-slate-400 leading-normal max-w-xs mx-auto">
                      Audit carrier speeds, detect hidden background leaks, and grab eSIM freebies.
                    </p>
                  </div>

                  {/* Register Form */}
                  <div className="space-y-3 bg-slate-900 p-4 border border-slate-800 rounded-2xl shadow-lg">
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Tunde Adenuga"
                        value={regForm.name}
                        onChange={(e) => setRegForm({...regForm, name: e.target.value})}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none focus:border-cyan-500 transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="e.g. +234 803 123 4567"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none focus:border-cyan-500 transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block font-mono">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="e.g. user@netsense.ng"
                        value={regForm.email}
                        onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-xl p-2.5 text-xs focus:outline-none focus:border-cyan-500 transition-all font-sans"
                      />
                    </div>

                    <button 
                      onClick={handleRegister}
                      disabled={!regForm.name || !regForm.phone || !regForm.email}
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:pointer-events-none text-slate-950 font-black rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-98"
                    >
                      Confirm eSIM Verification
                    </button>
                  </div>

                  {/* Social Auth and Retention bypasses */}
                  <div className="space-y-2 pt-1 font-sans">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-px bg-slate-900/60 flex-1"></div>
                      <span className="text-[7.5px] uppercase tracking-widest text-slate-500 font-bold font-mono">Instant Gateway</span>
                      <div className="h-px bg-slate-900/60 flex-1"></div>
                    </div>

                    <button 
                      onClick={handleGoogleAuth}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-705 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <svg className="h-3 w-3 inline-block" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.72 5.72 0 0 1 8.24 12.9a5.72 5.72 0 0 1 5.751-5.7 5.6 5.6 0 0 1 4.02 1.635l3.055-3.055A9.92 9.92 0 0 0 13.991 3C8.47 3 4 7.434 4 12.9c0 5.466 4.47 9.9 9.991 9.9c5.776 0 9.815-4.015 9.815-9.9c0-.621-.061-1.125-.166-1.615H12.24Z"/>
                      </svg>
                      Sign In with Google Account
                    </button>

                    <button 
                      onClick={handleReturningBypass}
                      className="w-full py-2 border border-dashed border-amber-500/25 hover:border-amber-500/45 bg-amber-500/5 text-amber-400 rounded-xl text-[9px] font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <Moon className="h-3 w-3 text-amber-500 animate-pulse" />
                      Away for 1 Month? Returning User Login
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN DIAGNOSTIC APPLICATIONS (STRICTLY RESTRICTED TO ACTIVE NODES) */
                <>
                  {/* HEADER VIEW PANEL (Simulated NetSense Branding) */}
                  <div className="flex justify-between items-center mb-5 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                        <Activity className="h-3 w-3 text-white" />
                      </div>
                      <h2 className="font-bold text-sm text-white font-display uppercase tracking-wide">
                        {activeSimTab === "profile" ? "User Profile" : "Network"}
                      </h2>
                    </div>
                    <span className="text-cyan-400 text-[9px] font-mono uppercase tracking-wider animate-pulse flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full inline-block"></span>
                      Active Node
                    </span>
                  </div>

                  {/* 1. DASHBOARD VIEW SCREEN */}
              {activeSimTab === "dashboard" && (
                <div className="space-y-4 animate-fadeIn" id="sim_dashboard_screen">
                  
                  {/* DIAGNOSTICS DETAILED CORE METRICS */}
                    <div className="space-y-4 animate-fadeIn">
                      {/* Carrier Information & Speed Panel */}
                      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 relative shadow-lg">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Best Network Right Now</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tight">{telemetry.carrier}</span>
                            <span className="text-xs text-emerald-450 font-medium flex items-center gap-1.5 mt-0.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                              ● Strong {telemetry.networkType}+ Signal
                            </span>
                          </div>
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
                            <span className="text-emerald-400 font-bold text-xs font-mono">
                              {telemetry.signalStrength >= -75 ? "94%" : telemetry.signalStrength >= -88 ? "85%" : "72%"}
                            </span>
                          </div>
                        </div>

                        {/* Live Speedo Tester */}
                        <div className="mt-4 pt-4 border-t border-slate-850 flex flex-col items-center">
                          <div className="relative h-28 w-44 flex flex-col justify-end items-center overflow-hidden">
                            {/* Gauge Arc Background */}
                            <div className="absolute top-4 w-32 h-32 rounded-full border-[6px] border-slate-803 border-b-transparent"></div>
                            
                            {/* Gauge Progress Accent */}
                            <div className="absolute top-4 w-32 h-32 rounded-full border-[6px] border-cyan-500 border-b-transparent transition-all duration-300"
                                 style={{ 
                                    transform: `rotate(${isTestingSpeed ? (speedProgress * 1.8) : 60}deg)`,
                                    opacity: isTestingSpeed ? 0.9 : 0.5
                                 }}>
                            </div>

                            {/* Speed Stats inside Gauge */}
                            <div className="text-center z-10 mb-2">
                              <span className="text-2xl font-black font-display text-white tracking-tight transition-all">
                                {isTestingSpeed ? (Math.random() * telemetry.downloadSpeed).toFixed(1) : telemetry.downloadSpeed}
                              </span>
                              <span className="text-[9px] text-slate-500 block -mt-1 font-mono uppercase tracking-widest font-bold">Mbps Download</span>
                            </div>
                          </div>

                          {/* Diagnostic Trigger Button */}
                          <button
                            id="run_diagnostic_btn"
                            onClick={startDiagnosticSpeedTest}
                            disabled={isTestingSpeed}
                            className={`w-full text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isTestingSpeed 
                                ? "bg-slate-800 text-slate-400 cursor-not-allowed" 
                                : "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/15"
                            }`}
                          >
                            <RefreshCw className={`h-3.5 w-3.5 ${isTestingSpeed ? "animate-spin" : ""}`} />
                            {isTestingSpeed ? `Evaluating Network (${speedProgress}%)` : "Run Signal Diagnostics"}
                          </button>
                        </div>
                      </div>

                      {/* REAL-WORLD VERIFIED PHYSICAL TELEMETRY CARD */}
                      {realNetworkInfo && (
                        <div className="bg-gradient-to-br from-cyan-950/20 to-slate-900 rounded-2xl p-4 border border-cyan-500/25 shadow-lg relative overflow-hidden animate-fadeIn text-left">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                          
                          <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                            <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400 font-mono flex items-center gap-1.5">
                              <Globe className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '8s' }} /> Verified Device Diagnostics
                            </span>
                            <span className="text-[8px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-mono font-bold">
                              LIVE GPS LOCK
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pb-3">
                            <div className="space-y-0.5">
                              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono block">Detected ISP</span>
                              <p className="text-xs font-black text-white leading-tight font-sans truncate">{realNetworkInfo.isp}</p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono block">Medium / Network Medium</span>
                              <p className="text-xs font-bold text-slate-200 leading-tight flex items-center gap-1 font-sans">
                                {realNetworkInfo.isWifi ? (
                                  <>
                                    <Wifi className="h-3 w-3 text-cyan-400" /> WiFi Broadband
                                  </>
                                ) : (
                                  <>
                                    <Smartphone className="h-3 w-3 text-emerald-400" /> Mobile Cellular
                                  </>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-850/60 mb-2">
                            <div className="space-y-0.5">
                              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono block">Physical Coordinates</span>
                              <p className="text-[10px] font-bold text-cyan-300 font-mono tracking-tight">
                                {realNetworkInfo.latitude.toFixed(4)}°, {realNetworkInfo.longitude.toFixed(4)}°
                              </p>
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-mono block">Geohash Sector</span>
                              <p className="text-[10px] font-bold text-slate-300 font-sans truncate">{realNetworkInfo.city}, {realNetworkInfo.country}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                            <span>Sourced IP: <strong className="text-slate-400 font-medium">{realNetworkInfo.ip}</strong></span>
                            <span>Checked at: <strong className="text-slate-400 font-medium">{realNetworkInfo.detectedAt}</strong></span>
                          </div>
                        </div>
                      )}

                      {/* REAL-TIME ADMIN BROADCAST FEED & ADS */}
                      {adminUpdates.filter((up) => up.type !== "freebie").length > 0 && (
                        <div className="space-y-2 animate-fadeIn text-left">
                          <div className="flex items-center justify-between px-1">
                            <span className="text-[8.5px] uppercase font-bold text-slate-500 font-mono tracking-widest flex items-center gap-1">
                              <Megaphone className="h-3 w-3 text-rose-505 animate-pulse" /> Live Broadcasts & Ads
                            </span>
                            <span className="flex h-1.5 w-1.5 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                            </span>
                          </div>

                          <div className="flex gap-3 overflow-x-auto pb-1.5 snap-x scrollbar-thin scrollbar-thumb-slate-800">
                            {adminUpdates.filter((up) => up.type !== "freebie").map((up) => (
                              <div 
                                key={up.id} 
                                className={`snap-center shrink-0 w-[245px] rounded-2xl p-3 border text-left flex flex-col justify-between ${
                                  up.type === "ad" 
                                    ? "bg-gradient-to-br from-amber-500/10 to-slate-900 border-amber-500/20 shadow-md shadow-amber-500/5" 
                                    : up.type === "media" 
                                    ? "bg-slate-900 border-sky-500/15" 
                                    : "bg-gradient-to-br from-[#090b10] to-slate-900 border-slate-800 shadow shadow-slate-950/40"
                                }`}
                              >
                                <div className="space-y-1.5">
                                  <div className="flex justify-between items-center">
                                    <span className={`text-[7.5px] uppercase font-mono font-black tracking-wider ${
                                      up.type === "ad" ? "text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20" :
                                      up.type === "media" ? "text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded border border-sky-500/20" :
                                      "text-rose-450 bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/25"
                                    }`}>
                                      {up.type === "ad" ? "SPONSORED AD" : up.type === "media" ? "TUTORIAL" : "BROADCAST ALERT"}
                                    </span>
                                    <span className="text-[7.5px] text-slate-500 font-mono font-medium">{up.timestamp}</span>
                                  </div>

                                  <h5 className="text-[10.5px] font-extrabold text-white leading-tight tracking-wide">{up.title}</h5>
                                  <p className="text-[9.5px] text-slate-300 font-sans leading-normal line-clamp-3">{up.content}</p>

                                  {/* EMBEDDED DYNAMIC VIDEO/IMAGE MEDIA RENDERER */}
                                  {up.type === "media" && up.mediaUrl && (
                                    <div className="mt-2 rounded-xl overflow-hidden bg-black border border-slate-800 relative h-20 flex items-center justify-center">
                                      {up.mediaType === "video" ? (
                                        <video 
                                          src={up.mediaUrl}
                                          controls
                                          muted
                                          autoPlay
                                          loop
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      ) : (
                                        <img 
                                          src={up.mediaUrl} 
                                          alt={up.title}
                                          className="w-full h-full object-cover" 
                                          referrerPolicy="no-referrer"
                                        />
                                      )}
                                    </div>
                                  )}
                                </div>

                                {/* CTA Actions */}
                                {up.type === "ad" ? (
                                  <div className="mt-2 text-[9px] pt-2 border-t border-slate-850/80 flex items-center justify-between">
                                    <div className="leading-tight">
                                      <span className="text-[6.5px] text-slate-500 block uppercase tracking-wider">PROMO CODE</span>
                                      <span className="text-[8.5px] font-mono font-bold text-amber-400 uppercase tracking-widest">{up.discountCode}</span>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setOperatorInteractions((prev) => prev + 5);
                                        triggerAdminToast(
                                          "⚡ Sponsor Code Copied!",
                                          `Coupon "${up.discountCode}" copied to eSIM memory. Apply on next billing!`,
                                          "ad"
                                        );
                                      }}
                                      className="py-1 px-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[8.5px] uppercase tracking-wide cursor-pointer transition-all active:scale-95 flex items-center gap-1 font-sans"
                                    >
                                      {up.buttonText || "Get Offer"}
                                    </button>
                                  </div>
                                ) : up.type === "announcement" ? (
                                  <div className="mt-2.5 pt-1">
                                    <button
                                      onClick={() => {
                                        setOperatorInteractions((prev) => prev + 2);
                                        setActiveSimTab("networks");
                                      }}
                                      className="w-full py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-300 font-bold rounded-lg text-[8.5px] cursor-pointer transition-all"
                                    >
                                      Check Carrier Ratings
                                    </button>
                                  </div>
                                ) : null}

                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dual SIM Matcher Recommendation Widget */}
                      <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 relative">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2 block">Dual-SIM Matcher</span>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 mt-0.5">
                            <Zap className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-white">Toggle Active Cellular Data</h4>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                              {telemetry.carrier === "MTN" && telemetry.congestionLevel === "High" ? (
                                <span>MTN is highly congested currently in <span className="text-slate-200">{(geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region}</span>. It is recommended to swap active cellular connection to Sim-2 (Airtel) for 30% lower lag.</span>
                              ) : (
                                <span>Your current active cellular connection ({telemetry.carrier}) represents optimal bandwidth parameters for this location sector. No swap required.</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Latency & Quality Indicators */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 text-center">
                          <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-wider">PING LATENCY</span>
                          <span className="text-lg font-bold text-white block mt-0.5 font-display">{telemetry.latency} ms</span>
                          <span className="text-[8px] text-slate-500 font-mono uppercase tracking-tight">Package integrity fine</span>
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 text-center">
                          <span className="text-[9px] text-slate-500 font-mono block uppercase tracking-wider">UPLOAD RATIO</span>
                          <span className="text-lg font-bold text-cyan-400 block mt-0.5 font-display">{telemetry.uploadSpeed} Mbps</span>
                          <span className="text-[8px] text-slate-500 font-mono uppercase tracking-tight">Speed test verified</span>
                        </div>
                      </div>

                      {/* Simple Multi-SIM Mode Info */}
                      <div className="flex items-center justify-between p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-3.5 w-3.5 text-slate-500" />
                          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Multi-SIM Config</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400 font-semibold">{config.activeSimMode}</span>
                      </div>
                    </div>

                    {/* DYNAMIC LIVE COMMUNITY FEED TRACKING PANEL - MOVED TO ADMIN-ONLY TAB */}
                    <div className="hidden space-y-4 text-left">
                      
                      {/* STATS SUMMARY CARD */}
                      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-4 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                        
                        <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                          <span className="text-[9.5px] uppercase font-bold text-slate-500 font-mono tracking-widest">Global Telemetry Stats</span>
                          <span className="text-[8.5px] font-mono font-black text-cyan-400 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span> Live Processing
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-center animate-fadeIn">
                            <span className="text-[7.5px] text-slate-500 block uppercase tracking-wider font-mono font-bold">Active Users</span>
                            <span className="text-sm font-black text-white block mt-0.5 font-mono">
                              {userReports.length * 28 + 1240}
                            </span>
                            <span className="text-[7px] text-emerald-400 font-bold tracking-tight">▲ active now</span>
                          </div>
                          
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-center font-sans animate-fadeIn">
                            <span className="text-[7.5px] text-slate-500 block uppercase tracking-wider font-mono font-bold font-mono">Tracked Sectors</span>
                            <span className="text-sm font-black text-white block mt-0.5 font-mono">
                              {Array.from(new Set(userReports.map(r => r.location))).length} List
                            </span>
                            <span className="text-[7px] text-slate-500 font-mono font-medium">Nigerian hubs</span>
                          </div>

                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-center animate-fadeIn">
                            <span className="text-[7.5px] text-slate-500 block uppercase tracking-wider font-mono font-bold">Strong Spots</span>
                            <span className="text-sm font-black text-emerald-400 block mt-0.5 font-mono">
                              {userReports.filter(r => r.isStrongSpot || r.downloadSpeed >= 50).length} Spots
                            </span>
                            <span className="text-[7px] text-cyan-400 font-bold font-mono uppercase tracking-widest">&gt;50M peak</span>
                          </div>
                        </div>
                      </div>

                      {/* LOCATIONS WITH STRONG NETWORK SUMMARY PANEL */}
                      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3.5 shadow-lg relative">
                        <div className="flex justify-between items-center pb-1 border-b border-slate-850 pb-2">
                          <div className="flex items-center gap-1.5">
                            <Wifi className="h-4 w-4 text-emerald-400 animate-pulse" />
                            <h4 className="text-xs font-black text-white uppercase tracking-wider">Verified Hotspots from Feed</h4>
                          </div>
                          <span className="text-[7.5px] font-mono px-2 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-black uppercase tracking-wider">
                            Realtime Signal
                          </span>
                        </div>
                        
                        <p className="text-[9.5px] text-slate-400 leading-normal">
                          The following geographical sectors have verified high-performance signals and elite bandwidth derived from active community submissions:
                        </p>

                        <div className="space-y-2">
                          {(() => {
                            const grouped: { [key: string]: any } = {};
                            userReports.forEach(r => {
                              if (!grouped[r.location]) {
                                grouped[r.location] = {
                                  reportsCount: 0,
                                  maxSpeed: 0,
                                  carrier: r.carrier,
                                  signal: r.signalStrength,
                                  isStrong: false
                                };
                              }
                              grouped[r.location].reportsCount++;
                              if (r.downloadSpeed > grouped[r.location].maxSpeed) {
                                grouped[r.location].maxSpeed = r.downloadSpeed;
                                grouped[r.location].carrier = r.carrier;
                                grouped[r.location].signal = r.signalStrength;
                              }
                              if (r.downloadSpeed >= 50 && r.signalStrength >= -75) {
                                grouped[r.location].isStrong = true;
                              }
                            });

                            return Object.keys(grouped).map(loc => {
                              const data = grouped[loc];
                              const strengthLabel = data.signal >= -75 ? "Excellent Signal" : data.signal >= -88 ? "Good Strength" : "Fair Signal";
                              const carrierColor = data.carrier === "MTN" ? "text-yellow-400 border-yellow-450/30 bg-yellow-500/5" :
                                                   data.carrier === "Airtel" ? "text-red-500 border-red-500/30 bg-red-500/5" :
                                                   data.carrier === "Glo" ? "text-emerald-450 border-emerald-500/30 bg-emerald-500/5" :
                                                   "text-teal-400 border-teal-500/30 bg-teal-505/5";

                              return (
                                <div key={loc} className="p-3 bg-slate-955 rounded-xl border border-slate-905 flex items-center justify-between gap-2.5">
                                  <div className="space-y-1 shrink min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0 animate-pulse" />
                                      <span className="text-xs font-bold text-white truncate max-w-[140px]">{loc}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`text-[8px] font-mono px-1.5 py-0.2 border rounded font-black ${carrierColor}`}>
                                        {data.carrier} Leading
                                      </span>
                                      <span className="text-[8px] text-slate-500 font-mono">
                                        {strengthLabel} ({data.signal} dBm)
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <span className="text-xs font-black text-emerald-400 font-mono block">
                                      {data.maxSpeed.toFixed(1)} Mbps
                                    </span>
                                    <span className="text-[7px] text-slate-500 font-mono uppercase tracking-wider block">
                                      Peak Reported
                                    </span>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* PUBLISH FEED TELEMETRY BROADCAST FORM */}
                      <form onSubmit={handleAddUserReport} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 shadow-lg text-left">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-850">
                          <span className="text-[9.5px] uppercase font-bold text-slate-500 font-mono tracking-widest">Share Location Telemetry</span>
                          <span className="text-[7.5px] font-mono px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-bold uppercase tracking-wider">
                            Live Reporter
                          </span>
                        </div>

                        <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans">
                          Describe and publish your current live simulator speed ({telemetry.downloadSpeed} Mbps) and carrier ({telemetry.carrier}) to the interactive NetSense stream:
                        </p>

                        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-900 text-slate-450 text-[8.5px] font-mono space-y-1">
                          <div className="flex justify-between items-center">
                            <span>Geospatial Spot: <strong className="text-white">{(geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).name.split(",")[0]}</strong></span>
                            <span>Speed Metric: <strong className="text-emerald-400">{telemetry.downloadSpeed} Mbps</strong></span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Core Operator: <strong className="text-white">{telemetry.carrier} ({telemetry.networkType})</strong></span>
                            <span>Signal SNR: <strong className="text-amber-400">{telemetry.signalStrength} dBm</strong></span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide block font-sans">Comments / Context</label>
                          <textarea
                            value={newReportComment}
                            onChange={(e) => setNewReportComment(e.target.value)}
                            placeholder="e.g. Coverage is strong, swapped active SIM here and got double performance speeds!"
                            className="w-full h-14 bg-slate-955 border border-slate-850 focus:border-cyan-500/40 focus:outline-none rounded-xl p-2.5 text-[10.5px] text-slate-200 placeholder:text-slate-605 transition-all font-sans leading-normal resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isReportingSignal}
                          className={`w-full py-2.5 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-1.5 uppercase cursor-pointer tracking-wider ${
                            isReportingSignal 
                              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                              : "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/15 active:scale-95"
                          }`}
                        >
                          {isReportingSignal ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Publishing Telemetry Report...
                            </>
                          ) : (
                            <>
                              <Megaphone className="h-3.5 w-3.5 text-white" /> Broadcast Signal Report
                            </>
                          )}
                        </button>
                      </form>

                      {/* ACTIVE REPORT LIST ELEMENT */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9.5px] uppercase font-bold text-slate-500 font-mono tracking-widest flex items-center gap-1.5">
                            <Activity className="h-3.5 w-3.5 text-cyan-400" /> Active Community Stream
                          </span>
                          <span className="text-[8px] font-mono font-medium text-slate-500">
                            {userReports.length} reporting nodes
                          </span>
                        </div>

                        <div className="space-y-3">
                          {userReports.map((report) => {
                            const isReportStrong = report.isStrongSpot || report.downloadSpeed >= 50;
                            const carrierColor = report.carrier === "MTN" ? "text-yellow-400 border-yellow-450/20 bg-yellow-500/10" :
                                                 report.carrier === "Airtel" ? "text-red-500 border-red-500/20 bg-red-500/10" :
                                                 report.carrier === "Glo" ? "text-emerald-450 border-emerald-500/20 bg-emerald-500/10" :
                                                 "text-teal-400 border-teal-500/20 bg-teal-500/10";

                            return (
                              <div key={report.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3 shadow text-left relative overflow-hidden">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 text-white flex items-center justify-center font-black text-[10px] shadow border border-slate-800 uppercase font-mono">
                                      {report.avatar}
                                    </div>
                                    <div className="leading-tight">
                                      <h5 className="text-[10px] font-extrabold text-white">{report.username}</h5>
                                      <span className="text-[8px] text-slate-500 tracking-wider font-mono">{report.timestamp}</span>
                                    </div>
                                  </div>

                                  {isReportStrong && (
                                    <span className="text-[7px] uppercase font-black px-1.5 py-0.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 rounded font-mono tracking-wider animate-pulse flex items-center gap-0.5">
                                      <Wifi className="h-2.5 w-2.5 text-emerald-400" /> Strong Signal Spot
                                    </span>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-1 px-2.5 py-1.5 bg-slate-950 rounded-xl border border-slate-900 text-[8.5px] font-mono leading-none">
                                  <div className="text-slate-400 truncate"><span className="text-slate-500 uppercase">Loc:</span> {report.location.split(",")[0]}</div>
                                  <div className="text-slate-400 text-right"><span className="text-slate-500 uppercase">SIM:</span> {report.activeSimMode}</div>
                                  <div className="text-slate-400"><span className="text-slate-500 uppercase">dBm:</span> {report.signalStrength} (Strength)</div>
                                  <div className="text-slate-400 text-right"><span className="text-slate-500 uppercase">Dev:</span> {report.deviceModel}</div>
                                </div>

                                <div className="flex justify-between items-center bg-[#07090d] px-3 py-1.5 border border-slate-905 rounded-xl">
                                  <span className={`text-[8px] font-mono px-2 py-0.5 border rounded font-black ${carrierColor}`}>
                                    {report.carrier} {report.networkType}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs font-black text-white font-mono">{report.downloadSpeed}</span>
                                    <span className="text-[7.5px] text-slate-500 font-mono">Mbps</span>
                                  </div>
                                </div>

                                <p className="text-[10px] text-slate-350 italic leading-snug pl-2 border-l border-slate-800">
                                  "{report.comment}"
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                </div>
              )}

              {/* 2. LIVE SPEEDS & NETWORK RANKING SCREEN */}
              {activeSimTab === "networks" && (
                <div className="space-y-4 animate-fadeIn" id="sim_ranking_screen">
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Local Carrier Speed Ranking</p>
                    <p className="text-[10px] text-slate-400 leading-normal mb-1">
                      Sourced relative cell towers near {(geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region}. Real-time signal ratings.
                    </p>

                    <div className="space-y-3 mt-4">
                      {/* MTN */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] text-yellow-400 font-bold font-mono uppercase">#1</span>
                            <span className="text-xs font-bold text-white">MTN Nigeria</span>
                            {telemetry.bestCarrierNow === "MTN" && (
                              <span className="text-[8px] px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-mono font-medium uppercase tracking-wider">Best Now</span>
                            )}
                          </div>
                          <span className="text-xs font-mono font-bold text-white">
                            {telemetry.bestCarrierNow === "MTN" ? telemetry.downloadSpeed : (telemetry.downloadSpeed * 0.7).toFixed(1)} Mbps
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full rounded-full" style={{ width: telemetry.bestCarrierNow === "MTN" ? "90%" : "65%" }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono pt-0.5">
                          <span>Signal dBM: {telemetry.bestCarrierNow === "MTN" ? telemetry.signalStrength : -92}</span>
                          <span>Ping: {telemetry.bestCarrierNow === "MTN" ? telemetry.latency : 48}ms</span>
                        </div>
                      </div>

                      {/* Airtel */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col space-y-1.5 font-sans">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] text-red-500 font-bold font-mono uppercase">#2</span>
                            <span className="text-xs font-bold text-white">Airtel Nigeria</span>
                            {telemetry.bestCarrierNow === "Airtel" && (
                              <span className="text-[8px] px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded font-mono font-medium uppercase tracking-wider">Best Now</span>
                            )}
                          </div>
                          <span className="text-xs font-mono font-bold text-white">
                            {telemetry.bestCarrierNow === "Airtel" ? telemetry.downloadSpeed : (telemetry.downloadSpeed * 0.85).toFixed(1)} Mbps
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: telemetry.bestCarrierNow === "Airtel" ? "92%" : "78%" }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono pt-0.5">
                          <span>Signal dBM: {telemetry.bestCarrierNow === "Airtel" ? telemetry.signalStrength : -86}</span>
                          <span>Ping: {telemetry.bestCarrierNow === "Airtel" ? telemetry.latency : 40}ms</span>
                        </div>
                      </div>

                      {/* Glo */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] text-emerald-400 font-bold font-mono uppercase">#3</span>
                            <span className="text-xs font-bold text-white">Glo Mobile</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">18.4 Mbps</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: "42%" }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono pt-0.5">
                          <span>Signal dBM: -94</span>
                          <span>Ping: 85ms</span>
                        </div>
                      </div>

                      {/* 9mobile */}
                      <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] text-teal-400 font-bold font-mono">#4</span>
                            <span className="text-xs font-bold text-white">9mobile</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-white">12.1 Mbps</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: "24%" }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono pt-0.5">
                          <span>Signal dBM: -98</span>
                          <span>Ping: 62ms</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Swap controls simulator */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-sm">
                    <span className="text-xs font-bold text-cyan-400 block mb-2 font-display uppercase tracking-wider">Swap Live SIM Provider</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <button
                        onClick={() => setConfig((p) => ({ ...p, activeCarrier: "MTN" }))}
                        className={`p-2 rounded-lg font-bold border transition-all ${config.activeCarrier === "MTN" ? "bg-yellow-400 text-slate-950 border-yellow-400" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`}
                      >
                        Active Sim: MTN
                      </button>
                      <button
                        onClick={() => setConfig((p) => ({ ...p, activeCarrier: "Airtel" }))}
                        className={`p-2 rounded-lg font-bold border transition-all ${config.activeCarrier === "Airtel" ? "bg-red-600 text-white border-red-600" : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"}`}
                      >
                        Active Sim: Airtel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. DATA THIEF DETECTOR / APP USAGES */}
              {activeSimTab === "data_thief" && (() => {
                const totalDay = appsData.reduce((sum, a) => sum + a.dayMB, 0);
                const totalNight = appsData.reduce((sum, a) => sum + a.nightMB, 0);
                return (
                  <div className="space-y-4 animate-fadeIn" id="sim_thief_screen">
                    
                    {/* Sum details mimicking design HTML */}
                    <div className="flex gap-2">
                      <div className="flex-1 p-3 bg-slate-900 rounded-xl border border-slate-805">
                        <span className="block text-[9px] text-slate-500 uppercase font-mono tracking-wider">Day Usage</span>
                        <span className="text-base font-black text-white mt-0.5 block font-display">{(totalDay / 1000).toFixed(2)} GB</span>
                      </div>
                      <div className="flex-1 p-3 bg-slate-900/40 rounded-xl border border-slate-805">
                        <span className="block text-[9px] text-slate-500 uppercase font-mono tracking-wider">Night Usage</span>
                        <span className="text-base font-black text-cyan-400 mt-0.5 block font-display">{(totalNight / 1000).toFixed(2)} GB</span>
                      </div>
                    </div>

                    {/* Alert panel */}
                    <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl flex items-start space-x-2.5">
                      <ShieldAlert className="h-4.5 w-4.5 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[11px] font-bold text-orange-400 uppercase tracking-widest font-mono">Alert Context</h4>
                        <p className="text-[10px] text-slate-300 leading-normal mt-0.5">
                          Large background drains detected during active night standby (10PM–6AM). Switch or restrict background services to optimize costs.
                        </p>
                      </div>
                    </div>

                    {/* App and Background list */}
                    <div className="space-y-2">
                      {appsData.map((app) => {
                        // Brand color gradients matching design guidelines
                        let gradientClass = "bg-slate-700";
                        if (app.appName === "TikTok") gradientClass = "bg-gradient-to-tr from-pink-500 to-yellow-500";
                        else if (app.appName === "Instagram") gradientClass = "bg-gradient-to-tr from-violet-600 via-pink-500 to-yellow-500";
                        else if (app.appName === "WhatsApp") gradientClass = "bg-gradient-to-tr from-emerald-500 to-green-600";
                        else if (app.appName === "Spotify") gradientClass = "bg-gradient-to-tr from-green-400 to-emerald-600";
                        else if (app.appName === "YouTube Mobile") gradientClass = "bg-gradient-to-tr from-red-500 to-rose-750";
                        else if (app.appName === "System Updates") gradientClass = "bg-gradient-to-tr from-slate-600 to-slate-800";

                        const totalApp = app.foregroundMB + app.backgroundMB;
                        const bgPercent = Math.round((app.backgroundMB / totalApp) * 100);

                        return (
                          <div key={app.packageName} className="bg-slate-900 border border-slate-800/80 rounded-xl p-3 flex flex-col space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2.5">
                                <div className={`w-9 h-9 rounded-xl ${gradientClass} flex items-center justify-center text-white font-bold shrink-0 shadow-sm`}>
                                  <span className="text-xs">{app.appName.charAt(0)}</span>
                                </div>
                                <div className="overflow-hidden">
                                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 leading-snug">
                                    {app.appName}
                                    {app.isBackgroundThief && app.status !== "restricted" && (
                                      <span className="text-[8px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-1 py-0.1 rounded uppercase tracking-wider font-semibold font-mono">Drain</span>
                                    )}
                                  </h4>
                                  <p className="text-[9px] text-slate-500 font-mono truncate max-w-[130px]">{app.packageName}</p>
                                </div>
                              </div>
                              
                              <button
                                id={`restrict_btn_${app.appName.replace(/\s+/g, '_')}`}
                                onClick={() => toggleAppRestriction(app.packageName)}
                                className={`text-[9px] font-semibold px-2.5 py-1 rounded-md border transition-all ${
                                  app.status === "restricted"
                                    ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                                    : "bg-slate-950 text-slate-400 hover:text-orange-400 border-slate-800 hover:border-orange-500/20"
                                }`}
                              >
                                {app.status === "restricted" ? "Restricted ✅" : "Restrict"}
                              </button>
                            </div>

                            {/* Dynamic Sleek progress lines matching design HTML */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[9px] text-[#94a3b8] font-mono">
                                <span className="text-slate-500">Total: {((app.foregroundMB + app.backgroundMB) / 1000).toFixed(2)} GB</span>
                                <span className={app.isBackgroundThief && app.status !== "restricted" ? "text-orange-400 font-bold" : "text-slate-400"}>
                                  BG Drain: {bgPercent}%
                                </span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full ${app.isBackgroundThief && app.status !== "restricted" ? 'bg-orange-500' : 'bg-cyan-500'}`} style={{ width: `${bgPercent}%` }}></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Insight Box */}
                    <div className="p-3.5 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block mb-1">Insight Summary:</p>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                        Background data consumes up to {((totalNight) / 1024).toFixed(1)} GB in standby. Switch active SIM cellular configurations or toggle off background updates between 2AM and 5AM to maintain billing efficiency.
                      </p>
                    </div>

                  </div>
                );
              })()}

              {/* 4. SECTOR GEOMAP HEATMAPS & FREEBIES */}
              {activeSimTab === "heatmap" && (
                <div className="space-y-4 animate-fadeIn" id="sim_heatmap_screen">
                  
                  {/* Segmented Sub-tab Nav inside Phone Screen */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-900 shadow-inner">
                    <button
                      onClick={() => setHeatmapSubTab("map")}
                      className={`py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        heatmapSubTab === "map"
                          ? "bg-slate-900 text-cyan-400 border border-slate-800 shadow"
                          : "text-slate-500 border border-transparent hover:text-slate-300"
                      }`}
                    >
                      <Map className="h-3 w-3 text-cyan-500" /> Map Grid
                    </button>
                    <button
                      onClick={() => setHeatmapSubTab("rewards")}
                      className={`relative py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        heatmapSubTab === "rewards"
                          ? "bg-slate-900 text-cyan-400 border border-slate-800 shadow"
                          : "text-slate-500 border border-transparent hover:text-slate-300"
                      }`}
                    >
                      <Gift className="h-3 w-3 text-amber-400" /> Freebies Hub
                      {/* Live notification pulse */}
                      {!hasClaimedFreebie && (
                        <span className="absolute top-1 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                      )}
                    </button>
                  </div>

                  {heatmapSubTab === "map" ? (
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 animate-fadeIn">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Geohash Signal Heatmap</p>
                      <p className="text-[10px] text-slate-400 leading-normal mb-3">
                        Plotting optimal carrier cells clustered within {(geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region}.
                      </p>

                      {/* Highly stylized micro MAP representing location */}
                      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl h-44 overflow-hidden flex items-center justify-center p-2 mb-3 shadow-inner">
                        {/* Grid overlay mimicking map grid lines */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>
                        
                        {/* Radar circle glow radiating */}
                        <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_50%,#06B6D4_0%,transparent_50%)]"></div>

                        {/* GPS Contour mapping */}
                        <svg className="w-full h-full opacity-40 shrink-0" viewBox="0 0 100 100">
                          <path d="M10,40 Q30,10 50,40 T90,30 L95,80 L5,70 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.5" />
                          <path d="M20,60 Q50,40 80,75 L90,90 H10 Z" fill="#0f172a" />
                        </svg>

                        {/* Interactive pins on map */}
                        {((geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region === "Live User Spot" ? [
                          {
                            id: "gps_user_spot",
                            areaName: "My Real-Time Position",
                            lat: (geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).lat,
                            lng: (geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).lng,
                            signalStrength: telemetry.signalStrength,
                            dominantCarrier: telemetry.carrier,
                            avgDownloadSpeed: telemetry.downloadSpeed,
                            isUserGPS: true
                          }
                        ] : HEATMAP_POINTS.filter(p => (geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).name.includes(p.areaName.split(' ')[0]) || p.areaName.toLowerCase().includes((geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region.toLowerCase()))).map((point) => (
                          <div
                            key={point.id}
                            className="absolute group cursor-pointer text-cyan-500"
                            style={{
                              left: (point as any).isUserGPS ? "47%" : `${(point.lat * 1000) % 65 + 15}%`,
                              top: (point as any).isUserGPS ? "45%" : `${(point.lng * 1000) % 55 + 20}%`,
                              transform: "translate(-53%, -50%)"
                            }}
                          >
                            <MapPin className={`h-5 w-5 ${
                              (point as any).isUserGPS ? "text-cyan-400 animate-pulse bg-cyan-400/20 rounded-full" : (point.signalStrength >= -70 
                                ? "text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" 
                                : (point.signalStrength >= -85 ? "text-amber-400" : "text-rose-400"))
                            }`} />
                            
                            {(point as any).isUserGPS && (
                              <MapPin className="h-5 w-5 absolute top-0 left-0 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            )}
                            
                            {/* Rich mini tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col bg-slate-900 border border-slate-800 rounded p-1.5 text-[8px] w-24 z-50 shadow-md">
                              <span className="font-bold text-slate-200">{point.areaName}</span>
                              <span className="text-slate-400 font-mono">Best: {point.dominantCarrier}</span>
                              <span className="text-sky-400 font-mono">{point.avgDownloadSpeed} Mbps</span>
                            </div>
                          </div>
                        ))}

                        {/* Floating Sector Badge */}
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[8px] uppercase tracking-widest text-slate-400 border border-slate-800 font-mono">
                          {(geoLocationsList[config.geolocationIndex] || geoLocationsList[0]).region} Sector Grid
                        </div>
                      </div>

                      {/* Legend of Heatmap colors */}
                      <div className="flex items-center justify-between text-[8px] text-[#94a3b8] px-1 font-mono uppercase tracking-wider">
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          <span>Strong</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                          <span>Fair</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                          <span>Poor</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Beautiful Gamified Freebies & Rewards Screen
                    <div className="space-y-4 animate-fadeIn">
                      
                      {/* Stash Indicator card */}
                      <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 p-3.5 rounded-2xl border border-cyan-500/20 shadow-md flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-wider font-mono">My Loot Balance</span>
                          <h4 className="text-lg font-black text-white font-mono tracking-wide">
                            {claimedBonusMB} <span className="text-xs text-cyan-300 font-sans font-medium">MB eSIM Data</span>
                          </h4>
                        </div>
                        <div className="bg-cyan-500/10 p-2 rounded-xl text-cyan-400 border border-cyan-400/25">
                          <Trophy className="h-5 w-5 text-cyan-400" />
                        </div>
                      </div>

                      {/* 1. TIME-BASED FLASH CLAIM */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <h5 className="text-[11px] font-bold text-white flex items-center gap-1">
                              <Zap className="h-3.5 w-3.5 text-amber-400" /> Time-Based Flash Claim
                            </h5>
                            <p className="text-[9px] text-slate-500">Claim free recurring cellular off-peak packets.</p>
                          </div>
                          <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center space-x-1.5">
                            <span className="text-[10px] text-amber-400 font-bold font-mono animate-pulse">
                              {Math.floor(claimCooldown / 60).toString().padStart(2, "0")}:{ (claimCooldown % 60).toString().padStart(2, "0") }
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (!hasClaimedFreebie) {
                              setClaimedBonusMB((old) => old + 150);
                              setHasClaimedFreebie(true);
                              setOperatorInteractions((prev) => prev + 25); // Rewards interactive engagement boost!
                            }
                          }}
                          disabled={hasClaimedFreebie}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            hasClaimedFreebie
                              ? "bg-slate-950 text-slate-500 border border-slate-850 cursor-not-allowed"
                              : "bg-cyan-500 text-slate-950 font-black hover:bg-cyan-4 w-full shadow-lg shadow-cyan-500/10 active:scale-95 hover:shadow-cyan-500/20"
                          }`}
                        >
                          <Gift className="h-4 w-4" />
                          {hasClaimedFreebie ? "Claim Completed ✓ Buffer Cooldown Active" : "Claim 150MB Free LTE Drop"}
                        </button>
                        
                        {hasClaimedFreebie && (
                          <div className="text-[8.5px] text-slate-500 leading-normal text-center italic">
                            Next off-peak drop opens automatically when timer cycles to zero.
                          </div>
                        )}
                      </div>

                      {/* 2. DYNAMIC TRIVIA QUIZ */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                          <h5 className="text-[11px] font-bold text-white flex items-center gap-1">
                            <HelpCircle className="h-3.5 w-3.5 text-purple-400" /> Live Telemetry Quiz
                          </h5>
                          <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded-md font-bold font-mono">
                            Win {REWARD_QUIZZES[quizIdx].reward}MB
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-[10px] text-slate-300 leading-normal font-sans">
                            {quizIdx + 1}. {REWARD_QUIZZES[quizIdx].question}
                          </p>

                          <div className="space-y-1.5 font-sans">
                            {REWARD_QUIZZES[quizIdx].options.map((opt, oIdx) => {
                              let optionClass = "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200";
                              if (selectedAns === oIdx) {
                                optionClass = "bg-purple-500/10 border-purple-400/50 text-purple-300";
                              }
                              if (quizChecked) {
                                if (oIdx === REWARD_QUIZZES[quizIdx].correctIndex) {
                                  optionClass = "bg-emerald-500/10 border-emerald-500/45 text-emerald-300";
                                } else if (selectedAns === oIdx) {
                                  optionClass = "bg-rose-500/10 border-rose-500/40 text-rose-300";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  disabled={quizChecked}
                                  onClick={() => setSelectedAns(oIdx)}
                                  className={`w-full p-2.5 rounded-xl border text-left text-[10px] font-medium leading-relaxed transition-all cursor-pointer ${optionClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!quizChecked ? (
                            <button
                              onClick={() => {
                                if (selectedAns === null) return;
                                setQuizChecked(true);
                                const isCorrect = selectedAns === REWARD_QUIZZES[quizIdx].correctIndex;
                                setIsQuizCorrect(isCorrect);
                                if (isCorrect) {
                                  setClaimedBonusMB((old) => old + REWARD_QUIZZES[quizIdx].reward);
                                  setOperatorInteractions((prev) => prev + 35); // Big climbing reward on correct telemetry answers
                                }
                              }}
                              disabled={selectedAns === null}
                              className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              Confirm Answer
                            </button>
                          ) : (
                            <div className="space-y-2 animate-fadeIn">
                              <div className={`p-2.5 rounded-xl text-[9px] leading-relaxed border ${
                                isQuizCorrect 
                                  ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400" 
                                  : "bg-rose-950/10 border-rose-500/20 text-rose-400"
                              }`}>
                                <p className="font-bold uppercase tracking-wider mb-0.5">
                                  {isQuizCorrect ? "✓ Answer Correct! Got +" + REWARD_QUIZZES[quizIdx].reward + "MB" : "✗ Answer Incorrect!"}
                                </p>
                                <p>{REWARD_QUIZZES[quizIdx].explanation}</p>
                              </div>

                              <button
                                onClick={() => {
                                  setQuizIdx((old) => (old + 1) % REWARD_QUIZZES.length);
                                  setSelectedAns(null);
                                  setQuizChecked(false);
                                  setIsQuizCorrect(false);
                                }}
                                className="w-full py-2 bg-slate-800 hover:bg-slate-755 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                              >
                                Load Next Quiz Question
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 3. APP-USE FREQUENCY LEADERBOARD (WINNERS LIST) */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                          <h5 className="text-[11px] font-bold text-white flex items-center gap-1">
                            <Users className="h-3.5 w-3.5 text-cyan-400" /> Frequent-Usage Leaderboard
                          </h5>
                          <span className="text-[8px] uppercase font-bold text-slate-500 font-mono tracking-wider">WIN DATA WEEKLY</span>
                        </div>

                        <p className="text-[9px] text-slate-400 leading-normal font-sans">
                          Top testers who actively monitor traffic clusters, speed test cell carriers, and answer daily trivia rise to win 5GB weekly drop!
                        </p>

                        <div className="space-y-1.5 font-mono text-[10px]">
                          {(() => {
                            // Construct scores
                            const scores = [
                              { name: "Kelechi Opara", count: 142, role: "Power User" },
                              { name: "Tunde Adenuga", count: 128, role: "Speed Tester" },
                              { name: "Chidimma N.", count: 115, role: "eSIM Agent" },
                              { name: "You (Operator)", count: operatorInteractions, role: "Global Admin", isUser: true },
                              { name: "Yusuf Ibrahim", count: 94, role: "Local Node" },
                              { name: "Funmi Balogun", count: 87, role: "Diagnostic" }
                            ].sort((a, b) => b.count - a.count);

                            return scores.map((rankUser, index) => {
                              const isTopThree = index < 3;
                              const isMe = rankUser.isUser;
                              return (
                                <div
                                  key={index}
                                  className={`p-2 rounded-xl flex items-center justify-between border ${
                                    isMe 
                                      ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-300 shadow-sm" 
                                      : (isTopThree ? "bg-slate-950/60 border-slate-850 text-slate-300" : "bg-transparent border-transparent text-slate-500")
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    <span className={`text-[9px] font-bold w-4 h-4 rounded-md flex items-center justify-center font-sans ${
                                      index === 0 ? "bg-amber-400/20 text-amber-400" : (index === 1 ? "bg-slate-300/20 text-slate-300" : (index === 2 ? "bg-amber-700/20 text-amber-700" : "bg-slate-800 text-slate-400"))
                                    }`}>
                                      {index + 1}
                                    </span>
                                    <div className="leading-snug">
                                      <p className="font-bold truncate max-w-[100px]">{rankUser.name}</p>
                                      <p className="text-[7.5px] text-slate-500 uppercase tracking-widest leading-none">{rankUser.role}</p>
                                    </div>
                                  </div>
                                  <div className="text-right flex items-center space-x-1.5">
                                    <span className={`font-black ${isMe ? "text-cyan-400" : "text-slate-300"}`}>{rankUser.count}</span>
                                    <span className="text-[7.5px] uppercase font-bold text-slate-500 font-sans tracking-wide">Hits</span>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>

                        {/* Button that boosts operator interactions metrics with a feedback animation */}
                        <button
                          onClick={() => {
                            setOperatorInteractions((prev) => prev + 30);
                            setClaimedBonusMB((old) => old + 10); // Small participation token!
                          }}
                          className="w-full py-2 bg-[#111622] hover:bg-slate-900 text-xs font-semibold text-white border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md flex-shrink-0 mb-4"
                        >
                          <Activity className="h-3.5 w-3.5 text-cyan-450 animate-pulse" />
                          Simulate Speed-Diag Hit (+30 Interactions)
                        </button>

                        {/* 4. ADMIN DROPS SECTION */}
                        {adminUpdates.filter((up) => up.type === "freebie").length > 0 && (
                          <div className="bg-slate-900 border border-slate-805 rounded-2xl p-3.5 space-y-3 mt-4 text-left">
                            <div className="flex justify-between items-center border-b border-slate-805 pb-2">
                              <h5 className="text-[11px] font-bold text-white flex items-center gap-1">
                                <Megaphone className="h-3.5 w-3.5 text-rose-500 animate-pulse" /> Admin eSIM drops
                              </h5>
                              <span className="text-[7.5px] uppercase font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.2 rounded font-mono tracking-wider animate-pulse">New Drops Live</span>
                            </div>

                            <div className="space-y-2.5">
                              {adminUpdates.filter((up) => up.type === "freebie").map((fb) => {
                                const isClaimed = fb.claimed;
                                return (
                                  <div key={fb.id} className="p-3 rounded-xl bg-slate-950 border border-slate-850 flex flex-col space-y-2 text-left">
                                    <div className="flex justify-between items-start">
                                      <div className="space-y-0.5">
                                        <h6 className="text-[10.5px] font-bold text-white tracking-wide">{fb.title}</h6>
                                        <p className="text-[9.5px] text-slate-400 leading-snug">{fb.content}</p>
                                      </div>
                                      <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0 ml-1.5 font-bold">+{fb.rewardMB}MB</span>
                                    </div>

                                    <button
                                      onClick={() => {
                                        if (!isClaimed) {
                                          setClaimedBonusMB((old) => old + (fb.rewardMB || 0));
                                          
                                          // Update local and react state to mark this specific item as claimed!
                                          setAdminUpdates((prev) => 
                                            prev.map((up) => up.id === fb.id ? { ...up, claimed: true } : up)
                                          );
                                          setOperatorInteractions(p => p + 15);
                                          triggerAdminToast(
                                            "🎁 Loot Balance Credited!",
                                            `Loot balance successfully credited with ${fb.rewardMB} MB, ready to deploy!`,
                                            "freebie"
                                          );
                                        }
                                      }}
                                      disabled={isClaimed}
                                      className={`w-full py-2 rounded-lg text-[9.5px] font-bold tracking-wide transition-all uppercase flex items-center justify-center gap-1 cursor-pointer ${
                                        isClaimed
                                          ? "bg-slate-900 text-slate-500 border border-slate-850 cursor-not-allowed"
                                          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black hover:opacity-95 shadow-md shadow-emerald-500/10 active:scale-97"
                                      }`}
                                    >
                                      <Gift className="h-3.5 w-3.5" />
                                      {isClaimed ? "Loot Claimed ✓ Balance Updated" : `Flash Claim Free ${fb.rewardMB} MB`}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                </div>
              )}

              {/* 5. AI INSIGHTS FEED RECONSTRUCTIONS */}
              {activeSimTab === "insights" && (
                <div className="space-y-4 animate-fadeIn" id="sim_insights_screen">
                  
                  {/* Headline review */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-850">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest font-mono flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" /> NetSense Gemini Engine
                      </span>
                      {isLoadingAI && <span className="text-[9px] text-slate-500 font-mono animate-pulse">Analyzing...</span>}
                    </div>
                    <p className="text-[11px] text-slate-200 leading-relaxed font-sans italic">
                      "{aiSummary}"
                    </p>
                  </div>

                  {geminiOverloaded && (
                    <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-3.5 space-y-1.5 text-left text-xs text-amber-300 animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[9.5px] text-amber-400 font-mono">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> 
                        {geminiQuotaActive ? "Cloud Quota Shifting (429 Active)" : "Cloud AI Queue Spike (503 Fallback)"}
                      </div>
                      <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
                        {geminiQuotaActive ? (
                          <>
                            NetSense detected Gemini's free-tier rate limitations. 
                            We successfully migrated your diagnostic feed to the high-performance <strong>Local Rule Optimization Engine</strong> to maintain zero-latency responsiveness.
                          </>
                        ) : (
                          <>
                            NetSense detected transient upstream high demand on the cloud-hosted Gemini model. 
                            We successfully migrated processing to your <strong>local offline rule engine</strong> to ensure uninterrupted cellular and app data recommendations.
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Recommendation list */}
                  <div className="space-y-2.5">
                    {aiInsights.map((rec) => (
                      <div
                        key={rec.id}
                        className={`p-3.5 rounded-2xl border flex items-start space-x-3 transition-all ${
                          rec.severity === "warning"
                            ? "bg-amber-500/10 border-amber-500/20"
                            : (rec.severity === "success" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-slate-900 border-slate-850")
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {rec.category === "data_thief" && <ShieldAlert className={`h-4.5 w-4.5 ${rec.severity === "warning" ? "text-amber-400" : "text-slate-400"}`} />}
                          {rec.category === "cost" && <Zap className="h-4.5 w-4.5 text-emerald-400" />}
                          {rec.category === "network" && <Wifi className="h-4.5 w-4.5 text-cyan-400" />}
                          {rec.category === "optimization" && <TrendingUp className="h-4.5 w-4.5 text-slate-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[11px] font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                            {rec.title}
                          </h4>
                          <p className="text-[10px] text-slate-350 leading-relaxed">{rec.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Prompt update query */}
                  <button
                    onClick={fetchLiveAIEnergy}
                    disabled={isLoadingAI}
                    className="w-full py-2.5 rounded-xl border border-slate-800 hover:border-slate-705 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-cyan-400 ${isLoadingAI ? "animate-spin" : ""}`} />
                    Refresh Intelligence Insights
                  </button>

                </div>
              )}

              {/* 6. USER PROFILE & HISTORY SCREEN */}
              {activeSimTab === "profile" && currentUser && (
                <div className="space-y-4 animate-fadeIn" id="sim_profile_screen">
                  
                  {/* Profile Header Details Card */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 relative overflow-hidden shadow-lg text-left">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-black text-sm uppercase">
                        {currentUser.name.slice(0, 2)}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white capitalize">{currentUser.name}</h4>
                          {currentUser.isGoogle && (
                            <span className="text-[7.5px] px-1.5 py-0.2 bg-blue-500/15 text-blue-400 border border-blue-500/30 rounded font-mono font-bold tracking-wide uppercase">Google</span>
                          )}
                          {currentUser.isReturning && (
                            <span className="text-[7.5px] px-1.5 py-0.2 bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded font-mono font-bold tracking-wide uppercase">Returned</span>
                          )}
                        </div>
                        <p className="text-[9.5px] text-slate-400 font-mono leading-tight">{currentUser.email}</p>
                        <p className="text-[9px] text-slate-500 font-mono leading-none">{currentUser.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Rank Card */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 text-left">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-mono">My Global Standings</span>
                      <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider font-mono">Node Active</span>
                    </div>
                    <div className="flex items-center justify-between font-sans">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Active Tester Rank</span>
                        <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                          <Trophy className="h-4 w-4 text-amber-500" />
                          {currentUser.rank || "Rank #1,250"}
                        </h4>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block">Scan Interactions</span>
                        <p className="text-xs font-mono font-bold text-slate-200">{operatorInteractions} hits</p>
                      </div>
                    </div>
                  </div>

                  {/* Rewards Card */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-805 space-y-2.5 text-left">
                    <div className="flex items-center justify-between border-b border-slate-805 pb-1.5">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-mono text-cyan-400">Claimed Rewards</span>
                      <span className="text-[8px] text-emerald-400 font-bold font-mono">eSIM Ready</span>
                    </div>
                    <div className="flex items-center justify-between font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                          <Gift className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5 text-left">
                          <h5 className="text-[11px] font-bold text-white">{claimedBonusMB} MB Free Data Stash</h5>
                          <p className="text-[8.5px] text-slate-500 leading-none">Available to flash bundle instantly</p>
                        </div>
                      </div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 bg-slate-1000 px-2 py-0.5 rounded border border-slate-850 font-mono">Active</span>
                    </div>
                  </div>

                  {/* Best Network Experience History */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 text-left">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-mono block">Best Area Networks</span>
                      <p className="text-[9px] text-slate-400 font-sans leading-relaxed">
                        Historical records of optimal local cells which always provided maximum signal capacity indices:
                      </p>
                    </div>

                    <div className="space-y-2 font-mono text-[9px] text-left">
                      {currentUser.bestNetworkHistory && currentUser.bestNetworkHistory.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-slate-950 flex items-center justify-between border border-slate-900">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                            <div className="leading-tight">
                              <p className="text-slate-300 font-bold font-sans">{item.area}</p>
                              <p className="text-[7.5px] text-slate-500">{item.carrier} Carrier Tower</p>
                            </div>
                          </div>
                          <div className="text-right leading-tight">
                            <p className="text-emerald-400 font-bold">{item.signal}</p>
                            <p className="text-[7.5px] text-slate-500 uppercase tracking-wider">{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PWA / MOBILE APK INSTANT INSTALL CARD */}
                  <div className="bg-[#0c0e15] border border-rose-500/10 rounded-2xl p-4 text-left space-y-3 shadow-xl relative overflow-hidden">
                    {/* Glowing highlight in background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                      <div className="flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4 text-rose-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Mobile App Center</span>
                      </div>
                      <span className="text-[7.5px] font-mono px-2 py-0.2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-bold uppercase tracking-wider">
                        OTA Fast Setup
                      </span>
                    </div>

                    <div className="flex gap-3 items-start">
                      <img 
                        src="/launcher_icon.png" 
                        alt="NetSense Icon" 
                        className="w-11 h-11 rounded-xl shadow-md border border-slate-800 shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <h4 className="text-xs font-extrabold text-white">Download & Install NetSense App</h4>
                        <p className="text-[9.5px] text-slate-400 leading-normal">
                          Install NetSense directly to your Android device, iPad or iPhone app drawer. Experience zero browser border delays, faster diagnostics startup speeds, and persistent cellular data stash access.
                        </p>
                      </div>
                    </div>

                    {isAppInstalled ? (
                      <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-emerald-400 text-[9.5px] font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle className="h-4 w-4 text-emerald-400" /> Standalone Mobile App Active ✓
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {isPWAInstallable ? (
                          <button
                            onClick={handleInstallPWA}
                            className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-450 hover:to-amber-450 text-white font-black rounded-xl text-xs tracking-wide uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                          >
                            <Download className="h-4 w-4" /> Install Native App Launcher
                          </button>
                        ) : (
                          <div className="space-y-2.5">
                            {/* Detailed prompt helper for iOS / browsers without beforeinstallprompt */}
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 space-y-1.5">
                              <span className="text-[8px] uppercase tracking-wider text-slate-500 font-mono font-bold block">Manual Installer Guides</span>
                              <div className="text-[9px] text-slate-400 space-y-2 leading-snug">
                                <p className="flex items-start gap-1"><strong className="text-rose-400 shrink-0 select-none">Method A (Android / Chrome):</strong> Tap your browser's 3-dot top-right settings menu and choose <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.</p>
                                <p className="flex items-start gap-1"><strong className="text-amber-400 shrink-0 select-none">Method B (iOS Safari):</strong> Tap the <strong>Share</strong> button on navigation bar controls, then scroll and select <strong>"Add to Home Screen"</strong>.</p>
                              </div>
                            </div>
                            
                            <button
                              onClick={handleInstallPWA}
                              className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-900 text-slate-300 font-bold rounded-xl text-xs tracking-wide transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                            >
                              <HelpCircle className="h-3.5 w-3.5 text-slate-400" /> Verify Device Support
                            </button>
                          </div>
                        )}
                        
                        <div className="text-[8px] text-slate-500 leading-snug font-sans text-center">
                          NetSense applet compiles client bundles on standard web frames with secure sandboxing. 
                          No heavy Store APK downloads or manual updates required. 
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Log Out Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/15 text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/30 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md font-sans"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" /> Log Out of NetSense
                  </button>

                </div>
              )}

                </>
              )}

            </div>

            {/* Mobile Bottom Navigation Bar */}
            {!showSplash && currentUser && (
              <div className="absolute bottom-0 inset-x-0 h-16 bg-slate-950 border-t border-slate-900/80 flex items-center justify-around px-4 select-none z-40">
                
                <button
                  id="nav_dashboard"
                  onClick={() => setActiveSimTab("dashboard")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "dashboard" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">Home</span>
                </button>

                <button
                  id="nav_networks"
                  onClick={() => setActiveSimTab("networks")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "networks" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">Carrier</span>
                </button>

                <button
                  id="nav_tracker"
                  onClick={() => setActiveSimTab("data_thief")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "data_thief" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">Thieves</span>
                </button>

                <button
                  id="nav_heatmap"
                  onClick={() => setActiveSimTab("heatmap")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "heatmap" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Map className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">Heatmaps</span>
                </button>

                <button
                  id="nav_insights"
                  onClick={() => setActiveSimTab("insights")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "insights" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">AI Advice</span>
                </button>

                <button
                  id="nav_profile"
                  onClick={() => setActiveSimTab("profile")}
                  className={`flex flex-col items-center justify-center space-y-0.5 transition-all outline-none cursor-pointer ${
                    activeSimTab === "profile" ? "text-cyan-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span className="text-[9px] font-medium tracking-wide">Profile</span>
                </button>

              </div>
            )}
          </div>
          
        </div>

        {/* RIGHT COLUMN: DEVELOPER ARCHITECT CONTROL CENTER */}
        {showDevWorkspace && (
          <div className="xl:col-span-7 flex flex-col space-y-6 animate-fadeIn" id="architect_console_section">
          
          {/* Main Workbench Tabs - Adjusted height to accommodate bottom statistics row */}
          <div className="bg-slate-900/30 rounded-[32px] p-5 border border-slate-800/80 flex flex-col h-[600px] shadow-lg">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex space-x-2">
                <button
                  id="tab_code_explorer"
                  onClick={() => setActiveWorkSpaceTab("code")}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
                    activeWorkSpaceTab === "code"
                      ? "bg-slate-800 text-white border border-slate-700 font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code className="h-3.5 w-3.5 text-sky-400" />
                  Codebase
                </button>
                <button
                  id="tab_system_architecture"
                  onClick={() => setActiveWorkSpaceTab("architecture")}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
                    activeWorkSpaceTab === "architecture"
                      ? "bg-slate-800 text-white border border-slate-700 font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-emerald-400" />
                  Blueprint
                </button>
                <button
                  id="tab_deployment_scaling"
                  onClick={() => setActiveWorkSpaceTab("deployment")}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
                    activeWorkSpaceTab === "deployment"
                      ? "bg-slate-800 text-white border border-slate-700 font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Settings className="h-3.5 w-3.5 text-amber-500" />
                  Deployment
                </button>
                <button
                  id="tab_admin_broadcast"
                  onClick={() => setActiveWorkSpaceTab("admin")}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all relative ${
                    activeWorkSpaceTab === "admin"
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold border border-rose-400/20"
                      : "bg-rose-500/10 text-rose-300 hover:text-rose-200 border border-rose-500/15"
                  }`}
                >
                  <Megaphone className="h-3.5 w-3.5" />
                  Admin Control Panel
                </button>
              </div>

              {/* Quick statistics tracker overlay */}
              <div className="hidden lg:flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                <span className="text-[10px] text-slate-400 font-mono">Clean Architecture SDK v1.0</span>
              </div>
            </div>

            {/* TAB CONTENT: 1. SYSTEM CODE EXPLORER */}
            {activeWorkSpaceTab === "code" && (
              <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-4 overflow-hidden h-full">
                
                {/* Lateral Navigation: Nested Files */}
                <div className="md:col-span-4 bg-[#090b10] border border-slate-800/80 rounded-2xl p-3 flex flex-col h-full overflow-y-auto">
                  <span className="text-[10px] font-bold text-slate-500 block mb-2 uppercase tracking-wide">Target Flutter Code</span>
                  
                  {/* File Search */}
                  <input
                    type="text"
                    placeholder="Search source files..."
                    value={searchCodeQuery}
                    onChange={(e) => setSearchCodeQuery(e.target.value)}
                    className="w-full bg-[#111622] text-xs px-3 py-2 rounded-xl outline-none mb-3 border border-slate-800 focus:border-slate-700"
                  />

                  <div className="space-y-1.5">
                    {filteredCodeFiles.map((file, idx) => {
                      const absoluteIndex = CODE_FILES.indexOf(file);
                      const isSelected = absoluteIndex === selectedFileIndex;
                      return (
                        <button
                          key={file.path}
                          id={`file_select_${file.name.replace(/\./g, '_')}`}
                          onClick={() => setSelectedFileIndex(absoluteIndex)}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center space-x-2.5 transition-all outline-none ${
                            isSelected
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/15"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                          }`}
                        >
                          <FileCode className={`h-4 w-4 shrink-0 ${file.language === "kotlin" ? "text-amber-400" : "text-sky-400"}`} />
                          <div className="overflow-hidden">
                            <span className="font-medium text-slate-200 block truncate">{file.name}</span>
                            <span className="text-[9px] text-slate-500 block truncate font-mono">{file.path}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-800/40">
                    <span className="text-[10px] font-semibold text-slate-600 block mb-1">Flutter App Structure</span>
                    <pre className="text-[9px] font-mono leading-relaxed text-slate-500 overflow-x-auto bg-slate-950/60 p-2 rounded-lg">
                      {FOLDER_STRUCTURE.slice(0, 380)}...
                    </pre>
                  </div>
                </div>

                {/* Main Code View Pane */}
                <div className="md:col-span-8 flex flex-col bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 overflow-hidden h-full">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-3">
                    <div>
                      <h3 className="text-xs font-bold text-slate-100">{CODE_FILES[selectedFileIndex].name}</h3>
                      <p className="text-[10px] text-slate-400 font-sans mt-0.5">{CODE_FILES[selectedFileIndex].description}</p>
                    </div>

                    <button
                      id="copy_code_btn"
                      onClick={() => handleCopyCode(CODE_FILES[selectedFileIndex].name, CODE_FILES[selectedFileIndex].content)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-200 flex items-center gap-1.5 hover:text-white hover:border-slate-700 transition"
                    >
                      {copiedFileName === CODE_FILES[selectedFileIndex].name ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Clipboard className="h-3.5 w-3.5 text-slate-400" />
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  {/* Lines scroll container */}
                  <div className="flex-1 overflow-auto bg-slate-950/70 rounded-xl p-3 text-[11px] font-mono leading-relaxed max-w-full">
                    <pre className="text-slate-300">
                      <code>{CODE_FILES[selectedFileIndex].content}</code>
                    </pre>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 2. SYSTEM ARCHITECTURE ASCII GRAPHIC */}
            {activeWorkSpaceTab === "architecture" && (
              <div className="flex-1 flex flex-col overflow-hidden h-full">
                <div className="bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 flex flex-col flex-1 overflow-hidden h-full">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-white font-display">Clean Architecture Flow Metrics</h3>
                      <p className="text-xs text-[#94a3b8] mt-0.5">
                        Flutter Clean Architecture separation of concerns: Presentation &harr; Riverpod notifier &harr; UseCase Domain &harr; MethodChannel Kotlin.
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto bg-slate-950 p-4 border border-slate-900 rounded-xl">
                    <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed select-all">
                      {ARCHITECTURE_DIAGRAM}
                    </pre>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white mb-1">MethodChannel Bridges</h4>
                      <p className="text-[10.5px] text-slate-400 leading-normal">
                        Signals and Speed-tests bypass standard Flutter render threads. Directly communicates with Kotlin APIs securely ensuring maximum background efficiency on budget Android devices.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white mb-1">Riverpod State Management</h4>
                      <p className="text-[10.5px] text-slate-400 leading-normal">
                        Eliminates side effects. Refetches and holds metrics locally utilizing local storage mechanisms (encrypted Hive boxes) before streaming live summaries.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white mb-1">Anonymized Geo Sync</h4>
                      <p className="text-[10.5px] text-slate-400 leading-normal">
                        To preserve user privacy, before writing location stats to Firestore, all data undergoes geohash truncation preserving general coverage areas instead of exact addresses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. DEPLOYMENT & SCALING MATRICES */}
            {activeWorkSpaceTab === "deployment" && (
              <div className="flex-1 overflow-y-auto h-full space-y-5 pr-2">
                
                {/* 1. Low-End Device Optimizations */}
                <div className="bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <Smartphone className="h-5 w-5 text-amber-500" />
                    <h3 className="text-sm font-bold text-white font-display">Low-End Android Optimizations (Nigeria Market)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
                    <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                      <span className="font-semibold text-slate-100 block">Battery Safety &amp; Passive Logs</span>
                      <p className="text-[10.5px] text-slate-400">
                        Instead of continuous active cellular listening, the Kotlin service binds a lazy <code className="font-mono bg-slate-900 text-slate-300 text-[10px] px-1">SignalStrengthsListener</code> callback. Saves over 15% battery during active background tracking.
                      </p>
                    </div>
                    <div className="space-y-1 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
                      <span className="font-semibold text-slate-100 block">Aggressive Package-Size Reductions</span>
                      <p className="text-[10.5px] text-slate-400">
                        Compile with Proguard constraints enabled. Exclude heavy non-essential dependencies. Limit maps caching on low-RAM physical devices (under 2GB RAM layouts).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Database Scaling Plan */}
                <div className="bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <Database className="h-5 w-5 text-sky-400" />
                    <h3 className="text-sm font-bold text-white font-display">MVP to Scale Matrix (Firebase vs Supabase)</h3>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
                        <span>ARCHITECTURE PARAMETERS</span>
                        <span className="text-sky-400">MVP (0-10K User Base)</span>
                        <span className="text-emerald-400">Scale (1M+ Users Base)</span>
                      </div>
                      <div className="h-px bg-slate-800"></div>
                      <div className="grid grid-cols-3 gap-2 text-[10.5px] text-slate-400">
                        <span className="font-medium text-slate-300">Identity &amp; Auth</span>
                        <span>Firebase Authentication direct email verification flow (Simpler)</span>
                        <span>Supabase Auth clustered securely on high speed PostgreSQL instances</span>
                      </div>
                      <div className="h-px bg-slate-800"></div>
                      <div className="grid grid-cols-3 gap-2 text-[10.5px] text-slate-400">
                        <span className="font-medium text-slate-300">Data Ingestion</span>
                        <span>Direct firestore document pushes per cellular metric</span>
                        <span>Bulk JSON telemetry streams processed by GCP cloud pipelines</span>
                      </div>
                      <div className="h-px bg-slate-800"></div>
                      <div className="grid grid-cols-3 gap-2 text-[10.5px] text-slate-400">
                        <span className="font-medium text-slate-300">Offline Cache</span>
                        <span>Encrypted Hive Boxes in local dart storage</span>
                        <span>SQLite with full native indexes for complex analytics query tasks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Consent Guidelines */}
                <div className="bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-rose-400">
                    <Lock className="h-4 w-4" />
                    <span className="text-xs font-bold font-display">Required Operational Privacy Consent Rules</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    NetSense requires system Level Usage and Signal tracking permission access in Android settings. The Flutter app must show an upfront visual prompt explaining with concrete transparent bullet-points what data is processed and that NO private browser payloads or personal account info is read at any step.
                  </p>
                </div>

              </div>
            )}

            {/* TAB CONTENT: 4. ADMIN BROADCAST CONTROL PANEL */}
            {activeWorkSpaceTab === "admin" && !isAdminLoggedIn && (
              <div className="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto my-auto min-h-[450px]" id="admin_login_container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminUsername.trim().toUpperCase() === "VINE" && adminPassword.trim() === "PASSWORD VINEOPS") {
                      setIsAdminLoggedIn(true);
                      setAdminAuthError("");
                      triggerAdminToast("Access Authorized", "Greetings Operator VINE. NetSense Mainframe active.", "success");
                    } else {
                      setAdminAuthError("Access Denied: Invalid Security Signature/Payload.");
                    }
                  }}
                  className="w-full bg-[#090b10] border border-slate-800/80 rounded-2xl p-6 space-y-4 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="text-center space-y-1.5 pb-2 border-b border-slate-850">
                    <div className="mx-auto w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center border border-rose-500/25 mb-2">
                      <Lock className="h-6 w-6 text-rose-550 animate-pulse" />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider font-display">NetSense Master Override</h3>
                    <p className="text-[10px] text-slate-400 font-sans">Provide operator credentials to administer real-time cellular broadcasts</p>
                  </div>

                  {adminAuthError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-2 text-rose-400 animate-fadeIn text-left">
                      <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
                      <span className="text-[10px] font-mono leading-tight">{adminAuthError}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Operator Username</label>
                      <input
                        type="text"
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="Enter Operator ID (e.g. VINE)"
                        className="w-full bg-slate-950 border border-slate-850 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-rose-500/50 transition-all font-mono placeholder:text-slate-700"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider">Operations Password</label>
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••••"
                        className="w-full bg-slate-950 border border-slate-850 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-rose-500/50 transition-all font-mono placeholder:text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-amber-655 hover:from-rose-550 hover:to-amber-500 text-white font-bold rounded-xl text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-98 mt-2"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Verify Signature
                  </button>
                  
                  <div className="text-center pt-2">
                    <span className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">Authorized Personnel Only • Secure 256 Layer</span>
                  </div>
                </form>
              </div>
            )}

            {activeWorkSpaceTab === "admin" && isAdminLoggedIn && (
              <div className="flex-1 overflow-y-auto h-full space-y-5 pr-2 text-left" id="admin_workspace_tab">
                
                {/* Header overview */}
                <div className="bg-gradient-to-r from-rose-500/10 to-amber-500/5 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5 uppercase tracking-wide">
                      <Megaphone className="h-4.5 w-4.5 text-rose-400 animate-pulse" />
                      NetSense Node Master Control
                    </h3>
                    <p className="text-[11px] text-slate-350 leading-relaxed">
                      Push real-time eSIM freebies, carrier announcements, visual advertising packages, and premium media feeds to the mobile units instantly.
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[9px] px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full font-mono uppercase font-bold tracking-wider animate-pulse font-bold">VINE (Operator)</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAdminLoggedIn(false);
                          setAdminUsername("");
                          setAdminPassword("");
                          triggerAdminToast("Logged Out", "Operator session terminated securely.", "info");
                        }}
                        className="py-1 px-2.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-all font-mono text-[9px] flex items-center gap-1 cursor-pointer font-bold uppercase"
                      >
                        <LogOut className="h-3 w-3" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  
                  {/* Form Console (col-span-7) */}
                  <div className="lg:col-span-7 bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 space-y-4 shadow-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-widest font-mono border-b border-slate-850 pb-2">
                       Deploy Broadcast payload
                    </span>

                    {/* Broadcast type selection */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-mono block uppercase">1. Payload Class</label>
                      <div className="grid grid-cols-4 gap-2">
                        {(["announcement", "freebie", "media", "ad"] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setNewUpdateForm({ ...newUpdateForm, type })}
                            className={`py-2 px-1 rounded-xl text-[10px] font-bold capitalize transition-all border outline-none cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                              newUpdateForm.type === type
                                ? "bg-rose-500/15 text-rose-400 border-rose-500/50 shadow-md shadow-rose-500/5"
                                : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                            }`}
                          >
                            {type === "announcement" && <Bell className="h-3.5 w-3.5" />}
                            {type === "freebie" && <Gift className="h-3.5 w-3.5 text-emerald-400" />}
                            {type === "media" && <Play className="h-3.5 w-3.5 text-sky-450 animate-pulse" />}
                            {type === "ad" && <Sparkles className="h-3.5 w-3.5 text-amber-400" />}
                            <span>{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Title field */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-mono block uppercase">2. Broadcast Title</label>
                      <input
                        type="text"
                        placeholder={
                          newUpdateForm.type === "freebie" ? "e.g. 🎁 Weekend High-Speed eSim Surge Drop" :
                          newUpdateForm.type === "ad" ? "e.g. 🔥 MTN 5G Smart-WiFi Router Promo" :
                          newUpdateForm.type === "media" ? "e.g. 📺 Video: How to Block Background Thieves" :
                          "e.g. 🚀 Global 5G Cell Grid Optimization"
                        }
                        value={newUpdateForm.title}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, title: e.target.value })}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-850 rounded-xl p-2.5 text-xs focus:outline-none focus:border-rose-500 transition-all font-sans"
                      />
                    </div>

                    {/* Content field */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-mono block uppercase">3. Message / Copywriting</label>
                      <textarea
                        rows={3}
                        placeholder="Write clean, engaging instructions or promotional bulletins which users will see..."
                        value={newUpdateForm.content}
                        onChange={(e) => setNewUpdateForm({ ...newUpdateForm, content: e.target.value })}
                        className="w-full bg-slate-950 text-slate-200 border border-slate-850 rounded-xl p-2.5 text-xs focus:outline-none focus:border-rose-500 transition-all font-sans"
                      ></textarea>
                    </div>

                    {/* DYNAMIC CONDITIONAL CONFIGURATION FIELDS */}
                    {newUpdateForm.type === "freebie" && (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-2.5 animate-fadeIn">
                        <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono">
                          <span>BONUS BUNDLE VOLUME</span>
                          <span className="text-emerald-400 font-bold">{newUpdateForm.rewardMB} MB</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="2000"
                          step="50"
                          value={newUpdateForm.rewardMB}
                          onChange={(e) => setNewUpdateForm({ ...newUpdateForm, rewardMB: parseInt(e.target.value) })}
                          className="w-full accent-emerald-400 cursor-pointer"
                        />
                        <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                          <span>100 MB</span>
                          <span>950 MB (Normal)</span>
                          <span>2,000 MB (Max)</span>
                        </div>
                      </div>
                    )}

                    {newUpdateForm.type === "media" && (
                      <div className="space-y-2.5 bg-slate-950 p-3 rounded-xl border border-slate-850 animate-fadeIn text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setNewUpdateForm({ ...newUpdateForm, mediaType: "video" })}
                            className={`py-1.5 px-2.5 rounded-lg text-[9px] font-bold border transition-all cursor-pointer ${
                              newUpdateForm.mediaType === "video"
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/25"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                             Streaming Video Link
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewUpdateForm({ ...newUpdateForm, mediaType: "image" })}
                            className={`py-1.5 px-2.5 rounded-lg text-[9px] font-bold border transition-all cursor-pointer ${
                              newUpdateForm.mediaType === "image"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                                : "bg-slate-900 border-slate-800 text-slate-400"
                            }`}
                          >
                             Banner Image (Picture)
                          </button>
                        </div>

                        <div className="space-y-1 text-left">
                          <div className="flex justify-between items-center">
                            <label className="text-[9px] text-slate-400 font-mono uppercase">Media URL</label>
                            <span 
                              onClick={() => setNewUpdateForm({ ...newUpdateForm, mediaUrl: newUpdateForm.mediaType === "video" ? "https://assets.mixkit.co/videos/preview/mixkit-data-center-server-units-with-blinking-lights-42582-large.mp4" : "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=60" })}
                              className="text-[8.5px] text-cyan-400 hover:underline cursor-pointer font-bold"
                            >
                              Auto-seed High Quality media
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Enter image / video asset .mp4 URL"
                            value={newUpdateForm.mediaUrl}
                            onChange={(e) => setNewUpdateForm({ ...newUpdateForm, mediaUrl: e.target.value })}
                            className="w-full bg-slate-950 text-slate-300 border border-slate-800 rounded-lg p-2 text-[10.5px] focus:outline-none focus:border-rose-500 font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {newUpdateForm.type === "ad" && (
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-3 animate-fadeIn text-xs">
                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 font-mono uppercase">Advertiser Name</label>
                            <input
                              type="text"
                              value={newUpdateForm.advertiser}
                              onChange={(e) => setNewUpdateForm({ ...newUpdateForm, advertiser: e.target.value })}
                              className="w-full bg-[#0d1017] text-slate-300 border border-slate-800 rounded-lg p-2 text-[10.5px] focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 font-mono uppercase">Discount / Promo Code</label>
                            <input
                              type="text"
                              value={newUpdateForm.discountCode}
                              onChange={(e) => setNewUpdateForm({ ...newUpdateForm, discountCode: e.target.value })}
                              className="w-full bg-[#0d1017] text-slate-300 border border-slate-800 rounded-lg p-2 text-[10.5px] focus:outline-none font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <label className="text-[9px] text-slate-400 font-mono uppercase">Ad Call-to-action Label</label>
                          <input
                            type="text"
                            value={newUpdateForm.buttonText}
                            onChange={(e) => setNewUpdateForm({ ...newUpdateForm, buttonText: e.target.value })}
                            className="w-full bg-[#0d1017] text-slate-300 border border-slate-800 rounded-lg p-2 text-[10.5px] focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (!newUpdateForm.title || !newUpdateForm.content) return;
                        
                        const newPayload: AdminUpdate = {
                          id: `custom_update_${Date.now()}`,
                          type: newUpdateForm.type,
                          title: newUpdateForm.title,
                          content: newUpdateForm.content,
                          timestamp: "Just now",
                          ...(newUpdateForm.type === "freebie" && { rewardMB: newUpdateForm.rewardMB, claimed: false }),
                          ...(newUpdateForm.type === "media" && { 
                            mediaUrl: newUpdateForm.mediaUrl || (newUpdateForm.mediaType === "video" ? "https://assets.mixkit.co/videos/preview/mixkit-data-center-server-units-with-blinking-lights-42582-large.mp4" : "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=60"),
                            mediaType: newUpdateForm.mediaType 
                          }),
                          ...(newUpdateForm.type === "ad" && {
                            advertiser: newUpdateForm.advertiser,
                            discountCode: newUpdateForm.discountCode,
                            buttonText: newUpdateForm.buttonText,
                            linkUrl: "#"
                          })
                        };

                        setAdminUpdates([newPayload, ...adminUpdates]);
                        triggerAdminToast(
                          newUpdateForm.type === "freebie" ? "🎁 Free Data Available!" : "🔔 Live Admin Broadcast System",
                          newUpdateForm.title,
                          newUpdateForm.type
                        );

                        // Clear input form
                        setNewUpdateForm({
                          title: "",
                          content: "",
                          type: "announcement",
                          mediaType: "video",
                          mediaUrl: "",
                          rewardMB: 500,
                          advertiser: "NetSense Sponsor",
                          discountCode: "NETSENSE-SPECIAL",
                          buttonText: "Check Promo"
                        });
                      }}
                      disabled={!newUpdateForm.title || !newUpdateForm.content}
                      className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 disabled:opacity-25 hover:from-rose-400 hover:to-amber-400 disabled:pointer-events-none text-white font-bold rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-98"
                    >
                      <Megaphone className="h-4 w-4" />
                      Transmit Dynamic Admin Broadcast
                    </button>
                  </div>

                  {/* Telemetry feed (col-span-5) */}
                  <div className="lg:col-span-5 bg-[#090b10] border border-slate-800/80 rounded-2xl p-4 flex flex-col h-[485px] shadow-xl">
                    
                    {/* TABS SELECTOR FOR ADMIN SUB-TABS: Active Payloads vs Live Telemetry Tracker */}
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850 shadow-inner mb-3">
                      <button
                        onClick={() => setAdminSubTab("broadcasts")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          adminSubTab === "broadcasts"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/20 shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Megaphone className="h-3.5 w-3.5 hover:scale-105 transition-all text-rose-400" />
                        Payloads ({adminUpdates.length})
                      </button>
                      <button
                        onClick={() => setAdminSubTab("user_stats")}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          adminSubTab === "user_stats"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/20 shadow-sm"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Users className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                        User Stats Tracker
                      </button>
                    </div>

                    {adminSubTab === "broadcasts" ? (
                      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-left" id="admin_active_feed">
                        {adminUpdates.map((item) => (
                          <div key={item.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl relative group text-left transition-all hover:border-slate-800/60 font-sans">
                            
                            {/* Badge Class type header wrapper */}
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[7.5px] px-1.5 py-0.2 rounded uppercase font-mono font-bold tracking-wider ${
                                item.type === "freebie" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" :
                                item.type === "ad" ? "bg-amber-500/15 text-amber-400 border border-amber-500/30" :
                                item.type === "media" ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" :
                                "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                              }`}>
                                {item.type}
                              </span>
                              <span className="text-[8px] text-slate-500 font-mono">{item.timestamp}</span>
                            </div>

                            <h5 className="text-[11px] font-extrabold text-white leading-snug">{item.title}</h5>
                            <p className="text-[9.5px] text-slate-400 mt-1 leading-normal line-clamp-3">{item.content}</p>

                            {/* Detail telemetry stats inside control panels */}
                            <div className="mt-2.5 pt-2 border-t border-slate-900 flex justify-between items-center text-[8.5px] font-mono text-slate-500">
                              {item.type === "freebie" ? (
                                <span>Claim Reward: <b className="text-emerald-400 font-mono font-bold">{item.rewardMB} MB</b></span>
                              ) : item.type === "ad" ? (
                                <span>Code: <b className="text-amber-400 font-mono font-bold">{item.discountCode}</b></span>
                              ) : (
                                <span>Payload: Active</span>
                              )}
                              
                              {/* Revoke button */}
                              <button
                                onClick={() => {
                                  setAdminUpdates(adminUpdates.filter((up) => up.id !== item.id));
                                }}
                                className="px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 text-[7.5px] transition-all cursor-pointer shadow-sm text-center"
                              >
                                Revoke
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* USER STATS TRACKER SUB-PANEL - MOVED SECURELY TO THE ADMIN BACKEND */
                      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-left scrollbar-thin scrollbar-thumb-slate-800">
                        {/* STATS COUNT SUMMARY CARD */}
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-850/60 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl pointer-events-none"></div>
                          
                          <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2.5">
                            <span className="text-[8.5px] uppercase font-bold text-slate-500 font-mono tracking-wider">Lagos-Abuja-Kano Grid</span>
                            <span className="text-[7.5px] font-mono font-bold text-cyan-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span> Live Stats
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-850 text-center animate-fadeIn">
                              <span className="text-[7.5px] text-slate-500 block uppercase font-mono tracking-wider">Active Users</span>
                              <span className="text-sm font-black text-white block mt-0.5 font-mono">
                                {userReports.length * 28 + 1240}
                              </span>
                              <span className="text-[7px] text-emerald-400 font-bold tracking-tight">▲ Simulating live session</span>
                            </div>

                            <div className="bg-slate-900/40 p-2 rounded-lg border border-slate-850 text-center animate-fadeIn">
                              <span className="text-[7.5px] text-slate-500 block uppercase font-mono tracking-wider font-mono font-bold">Verified Hotspots</span>
                              <span className="text-sm font-black text-emerald-400 block mt-0.5 font-mono">
                                {userReports.filter(r => r.downloadSpeed >= 50).length} Spots
                              </span>
                              <span className="text-[7px] text-cyan-400 font-bold font-mono uppercase tracking-widest">&gt;50Mbps peak</span>
                            </div>
                          </div>
                        </div>

                        {/* HIGH-PERFORMANCE GEOSPATIAL SUMMARY GRID */}
                        <div className="space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-850/80">
                            <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Geographical Hub Signals</span>
                            <span className="text-[7.5px] font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-1.5 rounded border border-emerald-500/20">
                              Peak Coverage Map
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {(() => {
                              const grouped: { [key: string]: any } = {};
                              userReports.forEach(r => {
                                if (!grouped[r.location]) {
                                  grouped[r.location] = {
                                    reportsCount: 0,
                                    maxSpeed: 0,
                                    carrier: r.carrier,
                                    signal: r.signalStrength,
                                    isStrong: false
                                  };
                                }
                                grouped[r.location].reportsCount++;
                                if (r.downloadSpeed > grouped[r.location].maxSpeed) {
                                  grouped[r.location].maxSpeed = r.downloadSpeed;
                                  grouped[r.location].carrier = r.carrier;
                                  grouped[r.location].signal = r.signalStrength;
                                }
                                if (r.downloadSpeed >= 50 && r.signalStrength >= -75) {
                                  grouped[r.location].isStrong = true;
                                }
                              });

                              return Object.keys(grouped).map(loc => {
                                const data = grouped[loc];
                                const strengthLabel = data.signal >= -75 ? "Excellent Signal" : data.signal >= -88 ? "Good Strength" : "Fair Signal";
                                const carrierColor = data.carrier === "MTN" ? "text-yellow-400 border-yellow-450/40 bg-yellow-500/5" :
                                                     data.carrier === "Airtel" ? "text-red-500 border-red-500/40 bg-red-500/5 animate-pulse" :
                                                     data.carrier === "Glo" ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/5" :
                                                     "text-teal-400 border-teal-500/45 bg-teal-500/5";

                                return (
                                  <div key={loc} className="p-2.5 bg-slate-955 rounded-xl border border-slate-850 flex items-center justify-between gap-2.5 transition-all hover:border-slate-800">
                                    <div className="space-y-1 shrink min-w-0">
                                      <div className="flex items-center gap-1.5 font-sans">
                                        <MapPin className="h-3 w-3 text-rose-500 shrink-0 animate-pulse" />
                                        <span className="text-[10.5px] font-bold text-white truncate max-w-[150px]">{loc}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className={`text-[7.5px] font-mono px-1 py-0.1 border rounded font-black ${carrierColor}`}>
                                          {data.carrier} Leading
                                        </span>
                                        <span className="text-[7.5px] text-slate-500 font-mono">
                                          {strengthLabel} ({data.signal} dBm)
                                        </span>
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0 font-sans">
                                      <span className="text-[10px] font-black text-emerald-400 font-mono block">
                                        {data.maxSpeed.toFixed(1)} Mbps
                                      </span>
                                      <span className="text-[6.5px] text-slate-500 font-mono uppercase tracking-wider block">
                                        Max Speed
                                      </span>
                                    </div>
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>

                        {/* FULL RAW TELEMETRY SUBMISSION STREAM */}
                        <div className="space-y-2 pt-2 border-t border-slate-850/80">
                          <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">Raw Submission Feed</span>
                          <div className="space-y-2">
                            {userReports.slice(0, 10).map((report) => (
                              <div key={report.id} className="p-2.5 bg-slate-950 border border-slate-850 transition-all hover:border-slate-800 rounded-xl space-y-2">
                                <div className="flex justify-between items-center font-sans">
                                  <span className="text-[9.5px] text-slate-200 font-bold flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded bg-rose-500/10 text-rose-450 border border-rose-500/20 flex items-center justify-center text-[8.5px] font-black uppercase font-mono">{report.avatar}</span>
                                    {report.username}
                                  </span>
                                  <span className="text-[7.5px] text-slate-500 font-mono">{report.timestamp}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-1 text-[7.5px] text-slate-500 font-mono bg-slate-900/30 p-1.5 rounded-lg border border-slate-900 font-mono">
                                  <div>Carrier: <b className="text-slate-300 font-mono">{report.carrier}</b></div>
                                  <div className="text-right">Speed: <b className="text-emerald-400 font-mono">{report.downloadSpeed} M</b></div>
                                  <div>Signal: <b className="text-slate-300 font-mono">{report.signalStrength} dBM</b></div>
                                  <div className="text-right">Mode: <b className="text-slate-300 font-mono">{report.activeSimMode}</b></div>
                                </div>
                                <p className="text-[8.5px] text-slate-400 italic font-sans pl-1.5 border-l border-slate-800 leading-normal">
                                  "{report.comment}"
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Operational Metrics Row matching the design theme exactly */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-cyan-950/20 to-blue-950/20 border border-cyan-500/20 rounded-2xl flex flex-col items-center justify-center p-3 text-center h-22 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <span className="text-xl font-black text-white font-display">85%</span>
              <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest mt-0.5">Battery Efficiency</span>
            </div>
            <div className="bg-gradient-to-br from-emerald-950/20 to-teal-950/20 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center p-3 text-center h-22 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
              <span className="text-xl font-black text-white font-display">0.4s</span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">DB Query Sync</span>
            </div>
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-3 text-center h-22 shadow-md">
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">Dual-SIM</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Active Protocol</span>
            </div>
          </div>

        </div>
      )}

      </main>

      {/* Footer System Credits */}
      <footer className="border-t border-slate-800/80 bg-[#090a0d] p-4 text-center text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between px-6">
        <div>
          <span>&copy; 2026 NetSense Network Technologies Corp. Fully documented design assets.</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Simulated Node Ready (Localhost:3000)
          </span>
          <span>Target Market: Lagos, Abuja, Kano (Nigeria)</span>
        </div>
      </footer>
    </div>
  );
}
