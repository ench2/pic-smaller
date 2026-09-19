// This public measurement ID belongs to the LiteFrame website, not a secret.
// Set NEXT_PUBLIC_GA_MEASUREMENT_ID="" at build time to disable analytics.
export const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-CMCBVVY1XF";
export const analyticsEnabled =
  process.env.NODE_ENV === "production" && /^G-[A-Z0-9]+$/.test(measurementId);
export const consentKey = "liteframe-analytics-consent-v1";
const consentLifetime = 180 * 24 * 60 * 60 * 1000;

export type Consent = "granted" | "denied";
type AnalyticsEvents = {
  images_imported: { image_count: number };
  compression_completed: {
    input_format: string;
    output_format: string;
    result: "success" | "preserved" | "error";
  };
  image_download: { output_format: string };
  batch_download: { image_count: number };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let consent: Consent | null = null;
let initialized = false;
let lastPage = "";

export function parseConsent(
  raw: string | null,
  now = Date.now(),
): Consent | null {
  try {
    const data = JSON.parse(raw ?? "null");
    return data &&
      (data.value === "granted" || data.value === "denied") &&
      typeof data.updatedAt === "number" &&
      data.updatedAt <= now &&
      now - data.updatedAt < consentLifetime
      ? data.value
      : null;
  } catch {
    return null;
  }
}

export function readConsent(): Consent | null {
  try {
    return parseConsent(window.localStorage.getItem(consentKey));
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(
      consentKey,
      JSON.stringify({ value, updatedAt: Date.now() }),
    );
  } catch {
    // A blocked storage API must never prevent image processing or this choice.
  }
}

export function safeFormat(mime: string) {
  const formats: Record<string, string> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/svg+xml": "svg",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/heif": "heif",
  };
  return formats[mime.toLowerCase()] ?? "other";
}

export function pageContext(
  location: { origin: string; pathname: string },
  referrer: string,
) {
  const match = location.pathname.match(
    /^\/(en-US|zh-CN|zh-TW|tr-TR|fr-FR|es-ES|ko-KR|ja-JP|fa-IR)\/?$/,
  );
  let source = "";
  try {
    const url = new URL(referrer);
    if (["https:", "http:"].includes(url.protocol)) source = url.origin;
  } catch {}
  return {
    page_location: location.origin + (match ? `/${match[1]}/` : "/"),
    page_referrer: source,
    page_title: "LiteFrame — Image tools",
  };
}

function clearAnalyticsCookies() {
  const domains = window.location.hostname.split(".");
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    const expired = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = expired;
    for (let index = 0; index < domains.length - 1; index++) {
      document.cookie = `${expired}; domain=${domains.slice(index).join(".")}`;
    }
  }
}

// Basic consent mode: do not even request Google's script before opt-in.
export function applyConsent(value: Consent | null) {
  consent = value;
  if (typeof window === "undefined" || !analyticsEnabled) return;
  const flags = window as unknown as Record<string, unknown>;
  flags[`ga-disable-${measurementId}`] = value !== "granted";
  if (value !== "granted") {
    lastPage = "";
    if (initialized)
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    try {
      clearAnalyticsCookies();
    } catch {
      // Cookie access can also be blocked; the collection-disable flag still applies.
    }
    return;
  }
  if (!initialized) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // gtag's documented queue format uses an Arguments object, not an event object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      ...pageContext(window.location, document.referrer),
    });
    initialized = true;
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  }
}

export function trackPageView() {
  if (
    !analyticsEnabled ||
    consent !== "granted" ||
    typeof window === "undefined"
  )
    return;
  const context = pageContext(window.location, document.referrer);
  if (lastPage === context.page_location) return;
  lastPage = context.page_location;
  window.gtag?.("set", context);
  window.gtag?.("event", "page_view", { ...context, send_to: measurementId });
}

export function trackEvent<Name extends keyof AnalyticsEvents>(
  name: Name,
  data: AnalyticsEvents[Name],
) {
  if (
    !analyticsEnabled ||
    consent !== "granted" ||
    typeof window === "undefined"
  )
    return;
  // Explicit allowlists protect against accidental File/Error/object spreading.
  const fields: Record<keyof AnalyticsEvents, readonly string[]> = {
    images_imported: ["image_count"],
    compression_completed: ["input_format", "output_format", "result"],
    image_download: ["output_format"],
    batch_download: ["image_count"],
  };
  const params = Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        fields[name].includes(key) &&
        (typeof value === "string" || typeof value === "number"),
    ),
  );
  window.gtag?.("event", name, { ...params, send_to: measurementId });
}
