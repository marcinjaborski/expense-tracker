import { useParams } from "next/navigation";

import { Locale } from "@/config";
import { toCurrency } from "@/utils/functions";

export function useCurrencySymbol() {
  const { locale } = useParams<{ locale: Locale }>();
  return (currency: string) =>
    (0)
      .toLocaleString(locale, {
        style: "currency",
        currency: toCurrency(currency),
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      .replace(/\d/g, "")
      .trim();
}
