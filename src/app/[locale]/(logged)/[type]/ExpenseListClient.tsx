"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { LuArrowRightLeft, LuMinus, LuPlus, LuShapes } from "react-icons/lu";

import {
  ConfirmModal,
  ExpenseFiltersButton,
  ExpenseLink,
  ExpenseTable,
  ExpenseTableWithPinnedRows,
} from "@/components";
import { ExpenseFiltersModal } from "@/components/expense-list";
import { redirect } from "@/navigation";
import { useDeleteExpense } from "@/repository/useDeleteExpense";
import { useExpenses } from "@/repository/useExpenses";
import { ModalContext } from "@/utils/context/ModalContext";
import { notNull } from "@/utils/functions";
import { useMutateModals } from "@/utils/hooks";
import { useObserver } from "@/utils/hooks/useObserver";
import { parseDirOption, parseQuery, parseSortOption, SORT } from "@/utils/searchParams";
import { ExpenseOption, ExpenseTypes } from "@/utils/types";

type ExpenseListClientProps = {
  type: ExpenseOption;
};

export function ExpenseListClient({ type }: ExpenseListClientProps) {
  const t = useTranslations("ExpenseList");
  const searchParams = useSearchParams();
  const { deleteId, contextValue } = useMutateModals("");

  const query = new URLSearchParams(searchParams).toString();
  const sort = parseSortOption(searchParams.get("sort"));
  const dir = parseDirOption(searchParams.get("dir"));
  const q = parseQuery(searchParams.get("q"));

  const { data, error, fetchNextPage } = useExpenses(type, q, sort, dir);
  const { mutate: deleteExpense } = useDeleteExpense();

  if (error) redirect("/error");

  const expenses = data?.pages.flat().filter(notNull) ?? [];
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  return (
    <ModalContext.Provider value={contextValue}>
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
      <div className="w-[calc(100vw-1rem)] flex-1 overflow-x-auto">
        {sort === SORT.date ? (
          <ExpenseTableWithPinnedRows expenses={expenses} dir={dir} />
        ) : (
          <ExpenseTable expenses={expenses} />
        )}
      </div>
      <div ref={observerTarget} />
      <ExpenseFiltersModal />
      <ConfirmModal title={t("confirmDelete")} onConfirm={() => deleteId && deleteExpense(deleteId)} />
    </ModalContext.Provider>
  );
}
