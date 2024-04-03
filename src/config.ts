import { Pathnames } from "next-intl/navigation";

export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  "/": "/",
  "/error": "/error",
  "/login": {
    en: "/login",
    pl: "/logowanie",
  },
  "/register": {
    en: "/register",
    pl: "/rejestracja",
  },
  "/create-expense": {
    en: "/create-expense",
    pl: "/stworz-wydatek",
  },
  "/all": {
    en: "/transactions",
    pl: "/transakcje",
  },
  "/expenses": {
    en: "/expenses",
    pl: "/wydatki",
  },
  "/incomes": {
    en: "/icomes",
    pl: "/przychody",
  },
  "/transfers": {
    en: "/transfers",
    pl: "/transfery",
  },
  "/other": {
    en: "/other",
    pl: "/pozostale",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
