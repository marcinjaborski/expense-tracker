import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { localePrefix, locales, pathnames } from "@/config";
import { defaultLocale } from "@/utils/constants";
import { updateSession } from "@/utils/supabase/middleware";

const handleI18nRouting = createIntlMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
