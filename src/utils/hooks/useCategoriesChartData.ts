import { groupBy, sumBy, uniq } from "lodash";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { sortChartData } from "@src/utils/functions.ts";
import { Enums } from "@src/utils/database.types.ts";

function useCategoriesChartData(expenseType: Enums<"expense_type">) {
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);

  const expensesByType = query.data?.data?.filter(({ type }) => type === expenseType) || [];
  const expensesByCategory = Object.values(groupBy(expensesByType, "category")).map((expenses) =>
    sumBy(expenses, "sum"),
  );
  const labels = uniq(expensesByType.map(({ category }) => category));
  const [sortedLabels, sortedData] = sortChartData(labels, expensesByCategory);

  return {
    ...query,
    data: {
      labels: sortedLabels || [],
      datasets: [{ data: sortedData || [] }],
    },
  };
}

export default useCategoriesChartData;
