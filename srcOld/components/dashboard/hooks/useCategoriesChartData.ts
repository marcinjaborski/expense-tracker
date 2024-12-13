import { groupBy, sumBy, uniq } from "lodash";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";
import { ExpenseType } from "@/utils/types";

export function useCategoriesChartData(expenseType: ExpenseType) {
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);

  const expensesByType = query.data?.data?.filter(({ type }) => type === expenseType) || [];
  const expensesByCategory = Object.values(groupBy(expensesByType, "category")).map((expenses) =>
    sumBy(expenses, "sum"),
  );

  return {
    ...query,
    data: {
      labels: uniq(expensesByType.map(({ category }) => category)),
      datasets: [{ data: expensesByCategory }],
    },
  };
}
