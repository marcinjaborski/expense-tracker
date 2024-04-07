import { useParams } from "next/navigation";

import { Locale } from "@/config";
import { toCurrency } from "@/utils/functions";

export function useFormatCurrency() {
  const { locale } = useParams<{ locale: Locale }>();
  return (value: number, currency?: string) =>
    Intl.NumberFormat(locale, { style: "currency", currency: toCurrency(currency) }).format(value);
}
