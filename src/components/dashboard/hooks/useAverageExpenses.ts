import { groupBy, mean, sumBy } from "lodash";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";

export function useAverageExpenses() {
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate, true);
  if (query.isLoading) return NaN;

  const { expense } = groupBy(query.data?.data, "type");
  const monthlyExpenses = Object.values(groupBy(expense, "month")).map((expenses) => sumBy(expenses, "sum"));
  return mean(monthlyExpenses);
}
