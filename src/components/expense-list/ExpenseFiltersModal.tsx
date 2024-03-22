"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuMoveDown } from "react-icons/lu";

import { cn } from "@/utils/functions";
import { EXPENSE_FILTERS_MODAL } from "@/utils/ids";
import { DIR, SORT } from "@/utils/searchParams";

export function ExpenseFiltersModal() {
  const t = useTranslations("ExpenseList");
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = (name: string, value: string) => {
    router.push(
      `?${new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        [name]: value,
      })}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <dialog id={EXPENSE_FILTERS_MODAL} className="modal">
      <div className="modal-box flex flex-col gap-2">
        <h3 className="text-lg font-bold">{t("filtersModal")}</h3>
        <div className="flex items-end gap-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">{t("sort")}</span>
            </div>
            <select
              className="select select-bordered w-full"
              value={searchParams.get(SORT.name) ?? SORT.date}
              onChange={(event) => updateParams(SORT.name, event.target.value)}
            >
              <option value={SORT.date}>{t("byDate")}</option>
              <option value={SORT.amount}>{t("byAmount")}</option>
            </select>
          </label>
          <button
            className="btn"
            type="button"
            aria-label={t("changeDirection")}
            onClick={() => updateParams(DIR.name, searchParams.get(DIR.name) === DIR.asc ? DIR.desc : DIR.asc)}
          >
            <LuMoveDown
              className={cn("text-xl transition-transform", {
                "rotate-180": searchParams.get(DIR.name) === DIR.asc,
              })}
            />
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">{t("close")}</button>
      </form>
    </dialog>
  );
}
