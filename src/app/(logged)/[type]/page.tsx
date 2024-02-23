import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import _ from "lodash";
import { Fragment } from "react";
import { ExpensesRoute, isExpenseRoute } from "@/utils/routes";
import { ExpenseType } from "@/utils/types";
import { LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";
import { ExpenseLink } from "@/app/(logged)/[type]/(components)";

type ExpensesProps = {
  params: {
    type: string;
  };
};

const mapRouteToType: Record<ExpensesRoute, ExpenseType> = {
  expenses: "expense",
  incomes: "income",
  transfers: "transfer",
};

export default async function Expenses({ params }: ExpensesProps) {
  if (!isExpenseRoute(params.type)) notFound();
  const type = mapRouteToType[params.type];
  const supabase = createClient();
  const { data: expenses, error } = await supabase
    .from("expenses")
    .select()
    .eq("type", type);
  const expensesByDate = _.groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) =>
    date2.localeCompare(date1),
  );
  if (error) redirect("/error");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl">List of expenses</h1>
      <div className="join">
        <ExpenseLink
          currentType={type}
          type={ExpenseType.enum.income}
          Icon={LuPlus}
          label="Incomes"
          href="/incomes"
        />
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
