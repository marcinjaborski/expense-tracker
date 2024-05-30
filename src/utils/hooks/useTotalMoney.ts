import { groupBy, sum, sumBy } from "lodash";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { useAccounts } from "@/repository/useAccounts";
import { useTotalExpenses } from "@/repository/useTotalExpenses";

export function useTotalMoney() {
  const { data: accounts } = useAccounts();
  const { endDate } = useDashboardContext();
  const totalExpensesQuery = useTotalExpenses(endDate);
  if (totalExpensesQuery.isLoading) return NaN;

  const expensesByAccount = groupBy(totalExpensesQuery.data?.data, "account");
  const totalMoneyForAccounts = Object.values(expensesByAccount).map((accountExpenses) => {
    const incomes = accountExpenses.find((expense) => expense.type === "income")?.sum || 0;
    const expenses = accountExpenses.find((expense) => expense.type === "expense")?.sum || 0;
    return incomes - expenses;
  });
  return sum(totalMoneyForAccounts) + sumBy(accounts, "initialBalance");
}
