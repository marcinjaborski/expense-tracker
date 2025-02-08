import { useTranslation } from "react-i18next";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy } from "lodash";
import { Interval } from "luxon";
import { colors } from "@mui/material";
import { formatDate, getSumByMonth } from "@src/utils/functions.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { CHART_POINT_RADIUS, CHART_TENSION } from "@src/utils/constants.ts";

function useExpenseTypeChartData() {
  const { t } = useTranslation("Dashboard");
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
          borderColor: colors.lightGreen["500"],
          backgroundColor: colors.lightGreen["300"],
          tension: CHART_TENSION,
          pointRadius: CHART_POINT_RADIUS,
        },
        {
          label: t("expense"),
          data: expensesByMonth,
          borderColor: colors.red["500"],
          backgroundColor: colors.red["300"],
          tension: CHART_TENSION,
          pointRadius: CHART_POINT_RADIUS,
        },
      ],
    },
  };
}

export default useExpenseTypeChartData;
