export const FB_PIXEL_ID = "1570775081113358";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function fbTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

export function fbTrackLead(params?: Record<string, unknown>) {
  fbTrack("Lead", params);
}
