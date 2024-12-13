"use client";

import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuMoveDown, LuSearch } from "react-icons/lu";

import { Modal, MultipleSelect } from "@/components/shared";
import { useAccounts } from "@/repository/useAccounts";
import { useCategories } from "@/repository/useCategories";
import { cn } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { EXPENSE_FILTERS_MODAL } from "@/utils/ids";
import { DIR, QUERY, SORT } from "@/utils/searchParams";

export function ExpenseFiltersModal() {
  const t = useTranslations("ExpenseList");
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories();

  const debouncedUpdateQ = debounce((q: string) => updateParams("q", q), 1000);

  return (
    <Modal id={EXPENSE_FILTERS_MODAL} title={t("filtersModal")}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder={t("search")}
          defaultValue={searchParams.get(QUERY) ?? ""}
          onChange={(e) => debouncedUpdateQ(e.target.value)}
        />
        <LuSearch />
      </label>
      <MultipleSelect
        title={t("accounts")}
        options={accounts?.map(({ name, id }) => ({ label: name, value: id }))}
        onChange={(newValue) =>
          updateParams(
            "accounts",
            newValue.map(({ value }) => String(value)),
          )
        }
      />
      <MultipleSelect
        title={t("categories")}
        options={categories?.map(({ name, id }) => ({ label: name, value: id }))}
        onChange={(newValue) =>
          updateParams(
            "categories",
            newValue.map(({ value }) => String(value)),
          )
        }
      />
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
    </Modal>
  );
}
