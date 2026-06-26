// src/proxy.ts
// Next.js Proxy (the v16 successor to middleware.ts, runs on the Node.js
// runtime by default — required so geoip-lite's fs-based lookup works).
//
// It adds automatic, country-based language detection on top of next-intl:
// a first-time visitor landing on "/" is redirected to the locale that matches
// their country (Germany -> /de, Turkey -> /tr, everyone else -> /en). Once the
// visitor picks a language from the switcher, next-intl writes the NEXT_LOCALE
// cookie; from then on that explicit choice wins and we never auto-redirect.
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { geoCountry, localeForCountry } from "./i18n/geo";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Detect by country only on the bare entry point and only when no language
  // has been chosen yet. Deep links already carry a locale prefix and are left
  // to next-intl; a present NEXT_LOCALE cookie means the visitor chose already.
  if (pathname === "/" && !request.cookies.get("NEXT_LOCALE")) {
    const locale = localeForCountry(geoCountry(request)) ?? routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip API, static files, favicon, etc.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
