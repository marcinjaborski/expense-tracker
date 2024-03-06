import { updateSession } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "@/config";

const handleI18nRouting = createIntlMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
  localePrefix,
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  return await updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
