"use client";

import _ from "lodash";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { LuArrowRightLeft, LuMinus, LuPlus, LuShapes } from "react-icons/lu";

import { DynamicIcon, ExpenseLink } from "@/components";
import { redirect } from "@/navigation";
import { useExpenses } from "@/repository/useExpenses";
import { cn } from "@/utils/functions";
import { ExpenseOption, ExpenseTypes } from "@/utils/types";

type ExpenseListClientProps = {
  type: ExpenseOption;
};

export function ExpenseListClient({ type }: ExpenseListClientProps) {
  const t = useTranslations("ExpenseList");
  const { data: expenses, error } = useExpenses(type);
  const expensesByDate = _.groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) => date2.localeCompare(date1));
  if (error) redirect("/error");

  return (
    <>
      <div className="join flex flex-wrap gap-y-2">
        <ExpenseLink currentType={type} type="all" Icon={LuShapes} label={t("all")} href="/all" />
        <ExpenseLink
          currentType={type}
          type={ExpenseTypes.enum.income}
          Icon={LuPlus}
          label={t("incomes")}
          href="/incomes"
        />
        <ExpenseLink
          currentType={type}
          type={ExpenseTypes.enum.expense}
          Icon={LuMinus}
          label={t("expenses")}
          href="/expenses"
        />
        <ExpenseLink
          currentType={type}
          type={ExpenseTypes.enum.transfer}
          Icon={LuArrowRightLeft}
          label={t("transfers")}
          href="/transfers"
        />
      </div>
      <table className="table table-pin-rows">
        {sortedDates.map((date) => (
          <Fragment key={date}>
            <thead>
              <tr>
                <th>{date}</th>
              </tr>
            </thead>
            <tbody>
              {expensesByDate[date].map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td className="flex items-center gap-2">
                    <DynamicIcon icon={expense.category?.icon} />
                    {expense.category?.name}
                  </td>
                  <td
                    className={cn("text-right", {
                      "text-red-300": expense.type === ExpenseTypes.enum.expense,
                      "text-green-300": expense.type === ExpenseTypes.enum.income,
                    })}
                  >
                    {expense.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </Fragment>
        ))}
      </table>
    </>
  );
}
