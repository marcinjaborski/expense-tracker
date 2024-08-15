import { groupBy } from "lodash";
import { Interval } from "luxon";
import { useTranslations } from "next-intl";
import colors from "tailwindcss/colors";

import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";
import { formatDate, getSumByMonth } from "@/utils/functions";

import { useDashboardContext } from "../DashboardContext";

export function useExpenseTypeChartData() {
  const t = useTranslations("Dashboard");
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);

  const { income, expense } = groupBy(query.data?.data, "type");
  const incomesByMonth = getSumByMonth(income, startDate, endDate);
  const expensesByMonth = getSumByMonth(expense, startDate, endDate);

  const labels = Interval.fromDateTimes(startDate, endDate)
    .splitBy({ month: 1 })
    .map((interval) => formatDate(interval.start!.toSQLDate()));

  return {
    ...query,
    data: {
      labels,
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
