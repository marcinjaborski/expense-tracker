import { toCurrency } from "@/utils/functions";

import { useLocale } from "./useLocale";

export function useFormatCurrency() {
  const locale = useLocale();
  return (value: number, currency?: string) =>
    Intl.NumberFormat(locale, { style: "currency", currency: toCurrency(currency) }).format(value);
}
