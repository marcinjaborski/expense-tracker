import { groupBy, sumBy } from "lodash";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";
import { ExpenseTypes } from "@/utils/types";

export function useMonthExpenses() {
  const { endDate } = useDashboardContext();
  const startDate = endDate.startOf("month");
  const query = useAmountByCategoryAndDate(startDate, endDate);
  if (query.isLoading)
    return {
      monthExpenses: NaN,
      monthIncomes: NaN,
      monthTransfers: NaN,
    };

  const expensesByType = groupBy(query.data?.data, "type");
  return {
    monthExpenses: sumBy(expensesByType[ExpenseTypes.enum.expense], "sum"),
    monthIncomes: sumBy(expensesByType[ExpenseTypes.enum.income], "sum"),
    monthTransfers: sumBy(expensesByType[ExpenseTypes.enum.transfer], "sum"),
  };
}
