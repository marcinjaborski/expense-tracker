import { ClassValue, clsx } from "clsx";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

import { currencies, Currency, defaultCurrency } from "@/utils/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getModal(id: string) {
  return document.getElementById(id) as HTMLDialogElement;
}

export function getZodErrorMessage(t: ReturnType<typeof useTranslations>, field: string, errors: ZodIssue[]): string {
  const fieldError = errors.find(({ path }) => path.includes(field));
  return fieldError ? t(fieldError.message as any) : "";
}

export function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function notNull<T>(x: T | null): x is T {
  return x !== null;
}

export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function toCurrency(value?: string): Currency {
  return currencies.includes(value as Currency) ? (value as Currency) : defaultCurrency;
}

export function containsAll<T>(array: T[], values: T[]) {
  return values.every((value) => array.includes(value));
}
