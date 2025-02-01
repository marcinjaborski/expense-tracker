import { useAppSelector } from "@src/store/store.ts";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy, mean, sumBy } from "lodash";

function useAverageExpenses() {
  const { startDate, endDate } = useAppSelector((state) => state.dashboard);
  const { data: amounts, isLoading } = useAmountByCategoryAndDate(startDate, endDate, true);

  if (isLoading || !amounts) return NaN;

  const { expense } = groupBy(amounts.data, "type");
  const monthlyExpenses = Object.values(groupBy(expense, "month")).map((expenses) => sumBy(expenses, "sum"));
  return mean(monthlyExpenses) || 0;
}

export default useAverageExpenses;
