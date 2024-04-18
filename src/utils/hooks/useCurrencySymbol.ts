import { toCurrency } from "@/utils/functions";

import { useLocale } from "./useLocale";

export function useCurrencySymbol() {
  const locale = useLocale();
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
