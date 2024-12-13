"use client";

import { useTranslations } from "next-intl";
import { LuSlidersHorizontal } from "react-icons/lu";

import { getModal } from "@/utils/functions";
import { EXPENSE_FILTERS_MODAL } from "@/utils/ids";

export function ExpenseFiltersButton() {
  const t = useTranslations("ExpenseList");

  return (
    <button
      type="button"
      className="btn btn-square"
      aria-label={t("filtersModal")}
      onClick={() => getModal(EXPENSE_FILTERS_MODAL).showModal()}
    >
      <LuSlidersHorizontal className="text-xl" />
    </button>
  );
}
