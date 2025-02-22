import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy, mean, sumBy } from "lodash";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";
import { isCurrentMonth } from "@src/utils/functions.ts";

function useAverageExpenses() {
  const { startDate, endDate } = useDashboardContext();
  const { data: amounts, isLoading } = useAmountByCategoryAndDate(
    startDate,
    endDate,
    endDate.hasSame(DateTime.now(), "month"),
  );
  const plannedExpenses = useUnrealizedPlannedExpenses();

  if (isLoading || !amounts) return NaN;

  const { expense } = groupBy(amounts.data, "type");
  const monthlyExpenses = Object.entries(groupBy(expense, "month")).map(([month, expenses]) => {
    return sumBy(expenses, "sum") + (isCurrentMonth(month) ? plannedExpenses.expenses : 0);
  });
  return mean(monthlyExpenses) || 0;
}

export default useAverageExpenses;
