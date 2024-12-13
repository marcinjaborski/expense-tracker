import { useParams } from "next/navigation";

import { Locale } from "@/config";

export function useLocale() {
  const { locale } = useParams<{ locale: Locale }>();
  return locale;
}
