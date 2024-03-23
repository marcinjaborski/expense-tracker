import { groupBy } from "lodash";
import { Fragment } from "react";

import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { DIR, DirOption } from "@/utils/searchParams";

import { ExpenseRow } from "./ExpenseRow";

type ExpenseTableWithPinnedRowsProps = {
  expenses: ExpenseReturnType[];
  dir: DirOption;
};

export function ExpenseTableWithPinnedRows({ expenses, dir }: ExpenseTableWithPinnedRowsProps) {
  const expensesByDate = groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) =>
    dir === DIR.desc ? date2.localeCompare(date1) : date1.localeCompare(date2),
  );

  return (
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
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </tbody>
        </Fragment>
      ))}
    </table>
  );
}
