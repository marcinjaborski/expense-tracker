import { ClassValue, clsx } from "clsx";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import { ZodIssue } from "zod";

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
