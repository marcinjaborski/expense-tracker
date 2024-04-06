"use client";

import { useTranslations } from "next-intl";
import { LuPlus } from "react-icons/lu";

import { createButtonStyles } from "@/utils/constants";
import { getModal } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { CREATE_ACCOUNT_MODAL } from "@/utils/ids";
import { UPDATE_ID } from "@/utils/searchParams";

export function CreateAccountButton() {
  const t = useTranslations("Accounts");
  const updateParams = useUpdateParams();

  const onClick = () => {
    updateParams(UPDATE_ID, null);
    getModal(CREATE_ACCOUNT_MODAL).showModal();
  };

  return (
    <button className={createButtonStyles} type="button" onClick={onClick} aria-label={t("createAccount")}>
      <LuPlus />
    </button>
  );
}
