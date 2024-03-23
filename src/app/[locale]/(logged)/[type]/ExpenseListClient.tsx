"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuArrowRightLeft, LuMinus, LuPlus, LuShapes } from "react-icons/lu";

import { ExpenseFiltersButton, ExpenseLink, ExpenseTable, ExpenseTableWithPinnedRows } from "@/components";
import { ExpenseFiltersModal } from "@/components/expense-list";
import { redirect } from "@/navigation";
import { useExpenses } from "@/repository/useExpenses";
import { parseDirOption, parseQuery, parseSortOption, SORT } from "@/utils/searchParams";
import { ExpenseOption, ExpenseTypes } from "@/utils/types";

type ExpenseListClientProps = {
  type: ExpenseOption;
};

export function ExpenseListClient({ type }: ExpenseListClientProps) {
  const t = useTranslations("ExpenseList");
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams).toString();
  const sort = parseSortOption(searchParams.get("sort"));
  const dir = parseDirOption(searchParams.get("dir"));
  const q = parseQuery(searchParams.get("q"));
  const { data: expenses, error } = useExpenses(type, q, sort, dir);
  if (error) redirect("/error");

  return (
    <>
      <div className="flex gap-2">
        <div className="join flex flex-wrap gap-y-2">
          <ExpenseLink
            currentType={type}
            type="all"
            Icon={LuShapes}
            label={t("all")}
            href={{
              pathname: "/all",
              query,
            }}
          />
          <ExpenseLink
            currentType={type}
            type={ExpenseTypes.enum.income}
            Icon={LuPlus}
            label={t("incomes")}
            href={{
              pathname: "/incomes",
              query,
            }}
          />
          <ExpenseLink
            currentType={type}
            type={ExpenseTypes.enum.expense}
            Icon={LuMinus}
            label={t("expenses")}
            href={{
              pathname: "/expenses",
              query,
            }}
          />
          <ExpenseLink
            currentType={type}
            type={ExpenseTypes.enum.transfer}
            Icon={LuArrowRightLeft}
            label={t("transfers")}
            href={{
              pathname: "/transfers",
              query,
            }}
          />
        </div>
        <ExpenseFiltersButton />
      </div>
      {sort === SORT.date ? (
        <ExpenseTableWithPinnedRows expenses={expenses ?? []} />
      ) : (
        <ExpenseTable expenses={expenses ?? []} />
      )}
      <ExpenseFiltersModal />
    </>
  );
}
