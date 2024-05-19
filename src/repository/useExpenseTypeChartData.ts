import { useQuery } from "@tanstack/react-query";
import { groupBy, sortedUniq, sumBy } from "lodash";
import { useTranslations } from "next-intl";
import colors from "tailwindcss/colors";

import { createClient } from "@/utils/supabase/client";

export function useExpenseTypeChartData(startDate: string, endDate: string) {
  const supabase = createClient();
  const t = useTranslations("Dashboard");

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit" });

  const query = useQuery({
    queryKey: ["expenseTypeChart", startDate, endDate],
    queryFn: async () =>
      supabase.rpc("get_amount_by_category_and_date", {
        date_start: startDate,
        date_end: endDate,
      }),
  });

  const { income, expense } = groupBy(query.data?.data, "type");
  const incomesByMonth = Object.values(groupBy(income, "month")).map((incomes) => sumBy(incomes, "sum"));
  const expensesByMonth = Object.values(groupBy(expense, "month")).map((expenses) => sumBy(expenses, "sum"));

  return {
    ...query,
    data: {
      labels: sortedUniq(query.data?.data?.map(({ month }) => formatDate(month))),
      datasets: [
        {
          label: t("income"),
          data: incomesByMonth,
          borderColor: colors.emerald["500"],
          backgroundColor: colors.emerald["300"],
        },
        {
          label: t("expense"),
          data: expensesByMonth,
          borderColor: colors.rose["500"],
          backgroundColor: colors.rose["300"],
        },
      ],
    },
  };
}
