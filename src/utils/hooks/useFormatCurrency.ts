import { defaultLocale } from "@/utils/constants";
import { toCurrency } from "@/utils/functions";

export function useFormatCurrency() {
  return (value: number, currency?: string) =>
    Intl.NumberFormat(defaultLocale, { style: "currency", currency: toCurrency(currency) }).format(value);
}
