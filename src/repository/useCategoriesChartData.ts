import { useQuery } from "@tanstack/react-query";
import { groupBy, sumBy, uniq } from "lodash";

import { createClient } from "@/utils/supabase/client";
import { ExpenseType } from "@/utils/types";

export function useCategoriesChartData(expenseType: ExpenseType, startDate: string, endDate: string) {
  const supabase = createClient();

  const query = useQuery({
    queryKey: ["expenseTypeChart", startDate, endDate],
    queryFn: async () =>
      supabase.rpc("get_amount_by_category_and_date", {
        date_start: startDate,
        date_end: endDate,
      }),
  });

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
