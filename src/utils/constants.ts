export const currencies = ["PLN", "EUR", "USD"] as const;
export type Currency = (typeof currencies)[number];
export const defaultCurrency = "PLN";

export const createButtonStyles = "btn btn-circle btn-primary fixed bottom-20 [&_svg]:text-xl";
