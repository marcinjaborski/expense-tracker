"use client";

import { useTranslations } from "next-intl";
import { LuLogOut } from "react-icons/lu";

import { OtherLink } from "@/components";
import { createClient } from "@/utils/supabase/client";

export function LogoutLink() {
  const t = useTranslations("Other");
  const supabase = createClient();

  return (
    <button type="button" onClick={() => supabase.auth.signOut()} aria-label={t("logout")}>
      <OtherLink title={t("logout")} Icon={LuLogOut} href="/login" />
    </button>
  );
}
