import { groupBy, sortedUniq, sumBy } from "lodash";
import { useTranslations } from "next-intl";
import colors from "tailwindcss/colors";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";

export function useExpenseTypeChartData() {
  const t = useTranslations("Dashboard");
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit" });

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
