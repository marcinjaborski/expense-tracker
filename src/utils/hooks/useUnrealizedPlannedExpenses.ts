import usePlannedExpenses from "@src/repository/usePlannedExpenses.ts";
import { isPlannedExpenseRealized } from "@src/utils/functions.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import { groupBy, sumBy } from "lodash";

type GroupBy = "type" | "category" | "account";

function useUnrealizedPlannedExpenses(groupExpensesBy: GroupBy = "type") {
  const { endDate, planned } = useDashboardContext();
  const { data: plannedExpenses } = usePlannedExpenses();

  if (!planned || !endDate.hasSame(DateTime.now(), "month"))
    return {
      expenses: 0,
      incomes: 0,
    };

  const allUnrealized = plannedExpenses.filter((plannedExpense) => !isPlannedExpenseRealized(plannedExpense.realized));

  if (groupExpensesBy === "category") {
    const grouped = groupBy(allUnrealized, "category.id");
    return Object.fromEntries(Object.entries(grouped).map(([name, expenses]) => [name, sumBy(expenses, "amount")]));
  }

  if (groupExpensesBy === "account") {
    const grouped = groupBy(allUnrealized, "account.id");
    return Object.fromEntries(
      Object.entries(grouped).map(([name, expenses]) => [
        name,
        sumBy(expenses, (expense) => (expense.type === "income" ? expense.amount : -expense.amount)),
      ]),
    );
  }

  const { expense, income } = groupBy(allUnrealized, "type");
  return {
    expenses: sumBy(expense, "amount"),
    incomes: sumBy(income, "amount"),
  };
}

export default useUnrealizedPlannedExpenses;
