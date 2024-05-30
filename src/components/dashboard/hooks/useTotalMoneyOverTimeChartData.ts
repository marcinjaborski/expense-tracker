import { groupBy, sortedUniq, sumBy } from "lodash";
import { Interval } from "luxon";
import { useTranslations } from "next-intl";

import { useAmountByCategoryAndDate } from "@/repository/useAmountByCategoryAndDate";
import { formatDate } from "@/utils/functions";

import { useDashboardContext } from "../DashboardContext";
import { useTotalMoney } from "./useTotalMoney";

export function useTotalMoneyOverTimeChartData() {
  const t = useTranslations("Dashboard");
  const { startDate, endDate } = useDashboardContext();
  const query = useAmountByCategoryAndDate(startDate, endDate);
  const startTotalMoney = useTotalMoney(startDate);

  const { income, expense } = groupBy(query.data?.data, "type");
  const incomesByMonth = Object.values(groupBy(income, "month")).map((incomes) => sumBy(incomes, "sum"));
  const expensesByMonth = Object.values(groupBy(expense, "month")).map((expenses) => sumBy(expenses, "sum"));

  const monthsDifference = Math.ceil(Interval.fromDateTimes(startDate, endDate).length("months"));
  const totalMoneyOverMonths = Array.from({ length: monthsDifference }, () => startTotalMoney);
  let totalProfit = 0;
  for (let i = 0; i < totalMoneyOverMonths.length; i++) {
    totalProfit += incomesByMonth[i] - expensesByMonth[i];
    totalMoneyOverMonths[i] += totalProfit;
  }

  return {
    ...query,
    data: {
      labels: sortedUniq(query.data?.data?.map(({ month }) => formatDate(month))),
      datasets: [{ data: totalMoneyOverMonths, label: t("totalMoney") }],
    },
  };
}
