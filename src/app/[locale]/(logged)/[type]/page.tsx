import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import _ from "lodash";
import { Fragment } from "react";
import { isExpenseRoute, mapRouteToType } from "@/utils/routes";
import { ExpenseType } from "@/utils/types";
import { LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";
import { Tables } from "@/utils/supabase/database.types";
import { DynamicIcon, PageHeader, ExpenseLink } from "@/components";
import { redirect } from "@/navigation";

type ExpensesProps = {
  params: {
    type: string;
  };
};

type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories"> | null;
};

export default async function Expenses({ params }: ExpensesProps) {
  const route = `/${params.type}`;
  if (!isExpenseRoute(route)) notFound();
  const type = mapRouteToType[route];
  const supabase = createClient();
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select("*, category (*)")
    .eq("type", type)
    .returns<ExpenseReturnType[]>();
  const expensesByDate = _.groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) => date2.localeCompare(date1));
  if (error) redirect("/error");

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <PageHeader title="List of expenses" />
      <div className="join">
        <ExpenseLink currentType={type} type={ExpenseType.enum.income} Icon={LuPlus} label="Incomes" href="/incomes" />
        <ExpenseLink
          currentType={type}
          type={ExpenseType.enum.expense}
          Icon={LuMinus}
          label="Expenses"
          href="/expenses"
        />
        <ExpenseLink
          currentType={type}
          type={ExpenseType.enum.transfer}
          Icon={LuArrowRightLeft}
          label="Transfers"
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
                  <td className="text-right">{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </Fragment>
        ))}
      </table>
    </div>
  );
}
