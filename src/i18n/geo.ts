// src/i18n/geo.ts
// GeoIP-based language detection helpers for the proxy (see src/proxy.ts).
//
// We resolve the visitor's country from their IP using geoip-lite's bundled,
// offline database (no API key, no network call) and map it to one of our
// three locales. The real client IP is read from the X-Forwarded-For header
// set by the reverse proxy (Coolify/Traefik) in front of the app.
import type { NextRequest } from "next/server";
import geoip from "geoip-lite";
import { routing } from "./routing";

type Locale = (typeof routing.locales)[number];

// Country (ISO-3166-1 alpha-2) -> locale. We only ship three languages, so
// German-speaking countries map to `de`, Turkey to `tr`, everyone else to
// English. Edit this map to change the behaviour.
const COUNTRY_LOCALE: Record<string, Locale> = {
  TR: "tr",
  DE: "de",
  AT: "de",
  CH: "de",
  LI: "de",
};
const DEFAULT_FOREIGN: Locale = "en"; // any country not listed above

// Map an ISO country code to a locale. Returns null when the country is
// unknown (e.g. a private/localhost IP geoip can't place) so the caller can
// fall back to the default locale.
export function localeForCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  return COUNTRY_LOCALE[country] ?? DEFAULT_FOREIGN;
}

// Resolve the request's country from the forwarded client IP. Returns null
// when there's no usable IP or geoip can't place it.
export function geoCountry(request: NextRequest): string | null {
  const xff = request.headers.get("x-forwarded-for");
  let ip = (xff ? xff.split(",")[0] : request.headers.get("x-real-ip") ?? "").trim();
  if (ip.startsWith("::ffff:")) ip = ip.slice(7); // unwrap IPv4-mapped IPv6
  if (!ip) return null;
  const geo = geoip.lookup(ip);
  return geo?.country ?? null;
}
