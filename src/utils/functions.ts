import { ClassValue, clsx } from "clsx";
import { DateTime, Interval } from "luxon";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

import { currencies, Currency, defaultCurrency } from "@/utils/constants";
import { Functions } from "@/utils/types";

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

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit" });
}

export function getSumByMonth(
  collection: Functions["get_amount_by_category_and_date"]["Returns"],
  dateStart: DateTime<true>,
  dateEnd: DateTime<true>,
): number[] {
  const sums = Object.fromEntries(
    Interval.fromDateTimes(dateStart, dateEnd)
      .splitBy({ month: 1 })
      .map((interval) => interval.start!)
      .map((month) => [month.toSQLDate(), 0]),
  );
  collection?.forEach((element) => (sums[element.month.split(" ")[0]] += element.sum));
  return Object.values(sums);
}
