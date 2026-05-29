import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize express app
const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (aiClient) return aiClient;
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    console.warn("GEMINI_API_KEY is not defined. Falling back to rule-based engine.");
    return null;
  }
  
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    return aiClient;
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI client:", error);
    return null;
  }
}

// Clean markdown wrap or trailing control characters from string before JSON parsing
function cleanJSONString(str: string): string {
  let cleaned = str.trim();
  // Remove markdown block ticks if present (e.g. ```json or ```)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```[a-zA-Z0-9]*\r?\n/, "");
    cleaned = cleaned.replace(/\r?\n```$/, "");
    cleaned = cleaned.trim();
  }
  return cleaned;
}

// Solid fallback generator matching expected UI format in case of missing key, parsing syntax errors, or timeouts
function getRuleBasedFallback(
  location: string,
  timeOfDay: string,
  currentCarrier: string,
  speed: number,
  latency: number,
  dataApps: any[],
  isOverloaded: boolean = false,
  errorMessage: string = ""
): any {
  const recommendations = [];
  
  // Check key data metrics
  const backgroundThief = dataApps ? dataApps.find((app: any) => app.backgroundMB > 200 && app.category === "Entertainment") : null;
  if (backgroundThief) {
    recommendations.push({
      id: "r1",
      title: "Background Drain Alert",
      desc: `"${backgroundThief.appName}" consumed ${backgroundThief.backgroundMB}MB in the background. Mobile data is active; restrict background usage in settings.`,
      severity: "warning",
      category: "data_thief"
    });
  } else if (dataApps && dataApps.length > 0) {
    const topApp = [...dataApps].sort((a: any, b: any) => (b.foregroundMB + b.backgroundMB) - (a.foregroundMB + a.backgroundMB))[0];
    recommendations.push({
      id: "r1",
      title: "High Usage App Alert",
      desc: `"${topApp.appName}" consumed ${Math.round(topApp.foregroundMB + topApp.backgroundMB)}MB of data. Avoid non-essential streaming unless connected to cheaper off-peak plans.`,
      severity: "info",
      category: "data_thief"
    });
  }

  // SIM mode insights
  if (currentCarrier === "MTN" && speed < 10) {
    recommendations.push({
      id: "r2",
      title: "Network Switch Tip",
      desc: `MTN is congested (${latency}ms) in ${location} right now. Airtel has higher signal strength in this sector. Consider swapping active SIM data.`,
      severity: "warning",
      category: "network"
    });
  } else {
    recommendations.push({
      id: "r2",
      title: "Optimized Carrier Active",
      desc: `${currentCarrier} matches peak speed tests (${speed} Mbps) for ${location}. Good connection stability, ideal for current data processes.`,
      severity: "success",
      category: "network"
    });
  }

  // Time of day off-peak suggestions
  if (timeOfDay === "Night") {
    recommendations.push({
      id: "r3",
      title: "Night-Time Off-Peak Opportunity",
      desc: "Airtel/MTN night plans offer cheaper data bundles between 11PM and 5AM. Schedule massive cloud backups or high-res downloads now.",
      severity: "success",
      category: "cost"
    });
  } else {
    recommendations.push({
      id: "r3",
      title: "Daytime Data Conservation",
      desc: "Airtel/MTN standard bundles apply. Keep social auto-play disabled. Use off-peak hours for updates to avoid active daytime data exhausting.",
      severity: "info",
      category: "cost"
    });
  }

  return {
    useFallback: true,
    geminiOverloaded: isOverloaded,
    geminiErrorMessage: errorMessage,
    insights: recommendations,
    summary: isOverloaded
      ? `The Gemini API is currently experiencing unusually high demand. NetSense activated Local Rule Engine for ${location} (${timeOfDay === "Night" ? "Night-Standby" : "Day-Active"}) with carrier ${currentCarrier}.`
      : `Processed via NetSense Local Rule Engine for ${location} (${timeOfDay === "Night" ? "Night-Standby" : "Day-Active"}) with carrier ${currentCarrier}. Optimization active.`
  };
}

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API: Network & Data Insights Engine powered by Gemini 3.5 Flash
app.post("/api/gemini/insights", async (req, res) => {
  const {
    location,
    timeOfDay,
    multiSimMode,
    currentCarrier,
    networkType,
    signalStrength,
    latency,
    speed,
    dataApps,
  } = req.body;

  const activeLoc = location || "Lagos";
  const activeTOD = timeOfDay || "Day";
  const activeSim = multiSimMode || "Dual-SIM Active";
  const activeCarrier = currentCarrier || "MTN";
  const activeNetType = networkType || "4G";
  const activeSignal = signalStrength || -80;
  const activeLatency = latency || 45;
  const activeSpeed = speed || 25;
  const activeDataApps = dataApps || [];

  const ai = getGeminiClient();

  if (!ai) {
    const fallback = getRuleBasedFallback(activeLoc, activeTOD, activeCarrier, activeSpeed, activeLatency, activeDataApps);
    return res.json(fallback);
  }

  try {
    const prompt = `
System Instruction:
You are the AI Insight Engine for NetSense (Network & Data Intelligence App). 
Analyze network performance data and per-app mobile data usage to produce exact, human-readable insights for a non-technical user in a developing market (e.g., Nigeria, where multiple SIMs and unstable connections are common).
Provide real-world, helpful, and highly contextual suggestions using local references when appropriate (e.g., "Ikeja", "LeKKi", "night data bundles", "MTN off-peak", "Airtel 11PM bundle").

Inputs:
- Current Location: ${activeLoc}
- Time of Day: ${activeTOD} (Day = 6AM-10PM, Night = 10PM-6AM)
- Connected Carrier: ${activeCarrier}
- Network Type: ${activeNetType}
- Signal Strength: ${activeSignal} dBm
- Latency: ${activeLatency} ms
- Download Speed: ${activeSpeed} Mbps
- Selected Multi-SIM setting: ${activeSim}
- Apps Data Consumption (MB): ${JSON.stringify(activeDataApps)}

Requirement:
Respond STRICTLY with a JSON object containing correct information that exactly satisfies the following responseSchema.
Do not insert syntax comments or invalid backslashes inside JSON.
`;

    let response;
    let attempts = 4;
    let delay = 300; // ms initial delay
    let lastError: any = null;

    for (let i = 0; i < attempts; i++) {
      try {
        // Strictly declare structural output formats via Gemini responseSchema
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                insights: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      desc: { type: Type.STRING },
                      severity: { type: Type.STRING },
                      category: { type: Type.STRING },
                    },
                    required: ["id", "title", "desc", "severity", "category"]
                  }
                },
                summary: { type: Type.STRING }
              },
              required: ["insights", "summary"]
            }
          }
        });
        lastError = null;
        break; // break the retry loop on success
      } catch (err: any) {
        lastError = err;
        const errMsg = err.message || String(err);
        
        // Quota limits or rate limits (429) are non-transient over milliseconds. Bypass retry loop immediately.
        const isQuotaErr = err.status === 429 || 
                           errMsg.includes("429") || 
                           errMsg.includes("quota") || 
                           errMsg.includes("RESOURCE_EXHAUSTED") ||
                           errMsg.includes("rate-limits");
                           
        if (isQuotaErr) {
          console.warn("[Gemini API Quota Info] Active minute quota reached or rate-limited. Activating responsive local-rule pipeline immediately.");
          break; // break immediately to proceed to fallback
        }

        const isTransient = err.status === 503 || 
                            errMsg.includes("503") || 
                            errMsg.includes("UNAVAILABLE") || 
                            errMsg.includes("high demand") ||
                            errMsg.includes("overloaded");
        
        if (isTransient && i < attempts - 1) {
          console.warn(`[Gemini API Warning] Outage or high demand detected (Attempt ${i + 1}/${attempts}). Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2.5; // Exponential increase
        } else {
          throw err;
        }
      }
    }

    if (lastError) {
      throw lastError;
    }

    const responseText = response.text || "{}";
    const cleanedText = cleanJSONString(responseText);
    const parsedResult = JSON.parse(cleanedText);
    
    if (!parsedResult.insights || !Array.isArray(parsedResult.insights)) {
      throw new Error("Missing array structure in insights field.");
    }

    return res.json(parsedResult);
  } catch (err: any) {
    // Gracefully handle any API outage, syntax errors, or JSON failures by logging and falling back to clean rule-based JSON
    const errMsg = err.message || String(err);
    const isQuota = err.status === 429 || errMsg.includes("429") || errMsg.includes("quota") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("rate-limits");
    const isOverloaded = err.status === 503 || errMsg.includes("503") || errMsg.includes("UNAVAILABLE") || errMsg.includes("high demand") || errMsg.includes("overloaded");
    
    console.warn(`[NetSense System Fallback] Service status handles: isQuota=${isQuota}, isOverloaded=${isOverloaded}`);

    const fallback = getRuleBasedFallback(
      activeLoc, 
      activeTOD, 
      activeCarrier, 
      activeSpeed, 
      activeLatency, 
      activeDataApps,
      isOverloaded || isQuota,
      isQuota 
        ? "Gemini API rate/quota limits active." 
        : "The AI model is experiencing heavy queues. Applying local offline rules."
    );
    
    // Supplement fallback payload with state variables for client rendering
    fallback.geminiQuotaActive = isQuota;
    fallback.geminiOverloaded = isOverloaded || isQuota;
    return res.json(fallback);
  }
});

// Handle Vite in dev environment or static folder in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res: any) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express simulation server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
