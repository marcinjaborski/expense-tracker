import { ExpenseReturnType } from "@/repository/prefetchExpenses";

import { ExpenseRow } from "./ExpenseRow";

type ExpenseTableProps = {
  expenses: ExpenseReturnType[];
};

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <table className="table">
      <tbody>
        {expenses.map((expense) => (
          <ExpenseRow key={expense.id} expense={expense} />
        ))}
      </tbody>
    </table>
  );
}
