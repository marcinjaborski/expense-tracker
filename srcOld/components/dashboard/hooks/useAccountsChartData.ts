import { groupBy, uniq } from "lodash";

import { useAccounts } from "@/repository/useAccounts";
import { useOutgoingTransfersByAccounts } from "@/repository/useOutgoingTransfersByAccounts";
import { useTotalExpenses } from "@/repository/useTotalExpenses";

import { useDashboardContext } from "../DashboardContext";

export function useAccountsChartData() {
  const { endDate } = useDashboardContext();
  const { data: accounts } = useAccounts();
  const totalExpensesQuery = useTotalExpenses(endDate);
  const outgoingTransfersByAccountsQuery = useOutgoingTransfersByAccounts(endDate);

  const outgoingTransfersByAccounts = outgoingTransfersByAccountsQuery.data?.data || [];
  const expensesByAccount = groupBy(totalExpensesQuery.data?.data, "account");
  const totalMoneyForAccounts = Object.entries(expensesByAccount).map(([accountName, accountExpenses]) => {
    const initialBalance = accounts?.find(({ name }) => name === accountName)?.initialBalance || 0;
    const incomes = accountExpenses.find((expense) => expense.type === "income")?.sum || 0;
    const expenses = accountExpenses.find((expense) => expense.type === "expense")?.sum || 0;
    const incomingTransfers = accountExpenses.find((expense) => expense.type === "transfer")?.sum || 0;
    const outgoingTransfers =
      outgoingTransfersByAccounts.find((transfer) => transfer.from_account === accountName)?.sum || 0;
    return initialBalance + incomes - expenses + incomingTransfers - outgoingTransfers;
  });

  return {
    ...totalExpensesQuery,
    data: {
      labels: uniq(totalExpensesQuery.data?.data?.map(({ account }) => account)),
      datasets: [{ data: totalMoneyForAccounts }],
    },
  };
}
