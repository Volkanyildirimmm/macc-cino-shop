// Minimal type declarations for geoip-lite (the package ships no types).
declare module "geoip-lite" {
  export interface GeoIpLookupResult {
    range: [number, number];
    country: string;
    region: string;
    eu: "0" | "1";
    timezone: string;
    city: string;
    ll: [number, number];
    metro: number;
    area: number;
  }
  export function lookup(ip: string): GeoIpLookupResult | null;
  const geoip: { lookup: typeof lookup };
  export default geoip;
}
