import useAccounts from "@src/repository/useAccounts.ts";
import useTotalExpenses from "@src/repository/useTotalExpenses.ts";
import { DateTime } from "luxon";
import { groupBy, sum, sumBy } from "lodash";
import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";

function useTotalMoney(endDate: DateTime, planned: boolean) {
  const { data: accounts } = useAccounts();
  const { data: totalExpenses, isLoading } = useTotalExpenses(endDate);
  const plannedExpenses = useUnrealizedPlannedExpenses();

  if (isLoading || !totalExpenses) return NaN;
  const expensesByAccount = groupBy(totalExpenses?.data, "account");
  const totalMoneyForAccounts = Object.values(expensesByAccount).map((accountExpenses) => {
    const incomes = accountExpenses.find((expense) => expense.type === "income")?.sum || 0;
    const expenses = accountExpenses.find((expense) => expense.type === "expense")?.sum || 0;
    return incomes - expenses;
  });
  const plannedExpensesSum = planned ? plannedExpenses.incomes - plannedExpenses.expenses : 0;
  return sum(totalMoneyForAccounts) + sumBy(accounts, "initialBalance") + plannedExpensesSum;
}

export default useTotalMoney;
