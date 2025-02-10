import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy, sumBy } from "lodash";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";

function useMonthExpenses() {
  const { endDate } = useDashboardContext();
  const startDate = endDate.startOf("month");
  const { data: amounts, isLoading } = useAmountByCategoryAndDate(startDate, endDate);
  const unrealizedPlannedExpenses = useUnrealizedPlannedExpenses();

  if (isLoading || !amounts)
    return {
      monthExpenses: NaN,
      monthIncomes: NaN,
      monthTransfers: NaN,
    };

  const expensesByType = groupBy(amounts.data, "type");
  return {
    monthExpenses: sumBy(expensesByType["expense"], "sum") + unrealizedPlannedExpenses.expenses,
    monthIncomes: sumBy(expensesByType["income"], "sum") + unrealizedPlannedExpenses.incomes,
    monthTransfers: sumBy(expensesByType["transfer"], "sum"),
  };
}

export default useMonthExpenses;
