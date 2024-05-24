export const currencies = ["PLN", "EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency = "PLN";

export const defaultLocale = "pl";
