import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { localePrefix, locales, pathnames } from "./config";

export const { Link, redirect, usePathname, useRouter, getPathname, permanentRedirect } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });
