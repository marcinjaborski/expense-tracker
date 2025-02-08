import { groupBy, uniq } from "lodash";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import useAccounts from "@src/repository/useAccounts.ts";
import useTotalExpenses from "@src/repository/useTotalExpenses.ts";
import useOutgoingTransfersByAccounts from "@src/repository/useOutgoingTransfersByAccounts.ts";
import { sortChartData } from "@src/utils/functions.ts";

function useTotalMoneyPerAccountChartData() {
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
  const labels = uniq(totalExpensesQuery.data?.data?.map(({ account }) => account));
  const [sortedLabels, sortedData] = sortChartData(labels, totalMoneyForAccounts);

  return {
    ...totalExpensesQuery,
    data: {
      labels: sortedLabels || [],
      datasets: [{ data: sortedData || [] }],
    },
  };
}

export default useTotalMoneyPerAccountChartData;
