import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy, mean, sumBy } from "lodash";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";

function useAverageExpenses() {
  const { startDate, endDate } = useDashboardContext();
  const { data: amounts, isLoading } = useAmountByCategoryAndDate(
    startDate,
    endDate,
    endDate.hasSame(DateTime.now(), "month"),
  );

  if (isLoading || !amounts) return NaN;

  const { expense } = groupBy(amounts.data, "type");
  const monthlyExpenses = Object.values(groupBy(expense, "month")).map((expenses) => sumBy(expenses, "sum"));
  return mean(monthlyExpenses) || 0;
}

export default useAverageExpenses;
