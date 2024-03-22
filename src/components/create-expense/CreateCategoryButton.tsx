"use client";

import { useTranslations } from "next-intl";
import { LuPlus } from "react-icons/lu";

import { getModal } from "@/utils/functions";
import { CREATE_CATEGORY_MODAL } from "@/utils/ids";

export function CreateCategoryButton() {
  const t = useTranslations("CreateExpense");

  return (
    <button
      type="button"
      className="btn btn-square"
      aria-label={t("createCategory")}
      onClick={() => getModal(CREATE_CATEGORY_MODAL).showModal()}
    >
      <LuPlus className="text-xl" />
    </button>
  );
}
