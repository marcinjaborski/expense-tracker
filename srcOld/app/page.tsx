import { redirect } from "next/navigation";

import { defaultLocale } from "@/utils/constants";

export default async function RedirectToLocale() {
  redirect(defaultLocale);
}
