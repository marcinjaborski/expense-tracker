import { groupBy } from "lodash";
import { Fragment } from "react";

import { ExpenseReturnType } from "@/repository/buildExpensesQuery";

import { ExpenseRow } from "./ExpenseRow";

type ExpenseTableWithPinnedRowsProps = {
  expenses: ExpenseReturnType[];
};

export function ExpenseTableWithPinnedRows({ expenses }: ExpenseTableWithPinnedRowsProps) {
  const expensesByDate = groupBy(expenses, "date");
  const sortedDates = Object.keys(expensesByDate).sort((date1, date2) => date2.localeCompare(date1));

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
