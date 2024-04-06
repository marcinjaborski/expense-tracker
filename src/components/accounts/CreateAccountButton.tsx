"use client";

import { useTranslations } from "next-intl";
import { LuPlus } from "react-icons/lu";

import { createButtonStyles } from "@/utils/constants";
import { getModal } from "@/utils/functions";
import { CREATE_ACCOUNT_MODAL } from "@/utils/ids";

export function CreateAccountButton() {
  const t = useTranslations("Accounts");

  return (
    <button
      className={createButtonStyles}
      type="button"
      onClick={() => getModal(CREATE_ACCOUNT_MODAL).showModal()}
      aria-label={t("createAccount")}
    >
      <LuPlus />
    </button>
  );
}
