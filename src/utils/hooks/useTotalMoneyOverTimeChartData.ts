import { useTranslation } from "react-i18next";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import useTotalMoney from "@src/utils/hooks/useTotalMoney.ts";
import { groupBy, last } from "lodash";
import { currencyFormat, formatDate, getSumByMonth } from "@src/utils/functions.ts";
import { Interval } from "luxon";
import { colors } from "@mui/material";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { CHART_POINT_RADIUS, CHART_TENSION } from "@src/utils/constants.ts";
import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";

function useTotalMoneyOverTimeChartData() {
  const { t } = useTranslation("Dashboard");
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);
  const startTotalMoney = useTotalMoney(startDate.minus({ day: 1 }), false);
  const plannedExpenses = useUnrealizedPlannedExpenses();

  const { income, expense } = groupBy(query.data?.data, "type");
  const incomesByMonth = getSumByMonth(income, startDate, endDate, plannedExpenses.incomes);
  const expensesByMonth = getSumByMonth(expense, startDate, endDate, plannedExpenses.expenses);

  const monthsDifference = Math.ceil(Interval.fromDateTimes(startDate, endDate).length("months"));
  let totalProfit = 0;
  const totalMoneyOverMonths = Array.from({ length: monthsDifference }, () => startTotalMoney).map((value, index) => {
    totalProfit += incomesByMonth[index] - expensesByMonth[index];
    return value + totalProfit;
  });

  const labels = Interval.fromDateTimes(startDate, endDate)
    .splitBy({ month: 1 })
    .map((interval) => formatDate(interval.start!.toSQLDate()));

  return {
    ...query,
    data: {
      labels,
      datasets: [
        {
          data: totalMoneyOverMonths,
          label: `${t("totalMoney")} (${currencyFormat().format(last(totalMoneyOverMonths)! - startTotalMoney)})`,
          borderColor: colors.cyan["500"],
          backgroundColor: colors.cyan["300"],
          tension: CHART_TENSION,
          pointRadius: CHART_POINT_RADIUS,
        },
      ],
    },
  };
}

export default useTotalMoneyOverTimeChartData;
