import { groupBy } from "lodash";
import { Interval } from "luxon";
import { useTranslations } from "next-intl";

import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";
import { formatDate, getSumByMonth } from "@/utils/functions";

import { useDashboardContext } from "../DashboardContext";
import { useTotalMoney } from "./useTotalMoney";

export function useTotalMoneyOverTimeChartData() {
  const t = useTranslations("Dashboard");
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
      datasets: [{ data: totalMoneyOverMonths, label: t("totalMoney") }],
    },
  };
}
