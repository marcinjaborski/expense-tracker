import { DynamicIcon } from "@/components/shared";
import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { cn } from "@/utils/functions";
import { ExpenseTypes } from "@/utils/types";

type ExpenseCellProps = {
  expense: ExpenseReturnType;
};

export function ExpenseRow({ expense }: ExpenseCellProps) {
  return (
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
  );
}
