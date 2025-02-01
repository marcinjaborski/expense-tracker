import { useTranslation } from "react-i18next";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import useTotalMoney from "@src/utils/hooks/useTotalMoney.ts";
import { groupBy } from "lodash";
import { formatDate, getSumByMonth } from "@src/utils/functions.ts";
import { Interval } from "luxon";
import { colors } from "@mui/material";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";

function useTotalMoneyOverTimeChartData() {
  const { t } = useTranslation("Dashboard");
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);
  const startTotalMoney = useTotalMoney(startDate.minus({ day: 1 }));

  const { income, expense } = groupBy(query.data?.data, "type");
  const incomesByMonth = getSumByMonth(income, startDate, endDate);
  const expensesByMonth = getSumByMonth(expense, startDate, endDate);

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
          label: t("totalMoney"),
          borderColor: colors.cyan["500"],
          backgroundColor: colors.cyan["300"],
          tension: 0.3,
          pointRadius: 5,
        },
      ],
    },
  };
}

export default useTotalMoneyOverTimeChartData;
