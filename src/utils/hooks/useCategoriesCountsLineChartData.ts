import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { groupBy, sumBy } from "lodash";
import { Interval } from "luxon";
import { formatDate, getSumByMonth } from "@src/utils/functions.ts";
import { CHART_POINT_RADIUS, CHART_TENSION } from "@src/utils/constants.ts";
import useCountsByCategoryAndDate from "@src/repository/useCountsByCategoryAndDate.ts";

function useCategoriesCountsLineChartData() {
  const { startDate, endDate } = useDashboardContext();
  const query = useCountsByCategoryAndDate(startDate, endDate);
  const expensesByCategory = groupBy(query.data?.data, "category");

  const labels = Interval.fromDateTimes(startDate, endDate)
    .splitBy({ month: 1 })
    .map((interval) => formatDate(interval.start!.toSQLDate()));

  const datasets = Object.entries(expensesByCategory)
    .sort(([, data1], [, data2]) => {
      return sumBy(data2, "sum") - sumBy(data1, "sum");
    })
    .map(([category, data], index) => ({
      label: category,
      data: getSumByMonth(data, startDate, endDate),
      tension: CHART_TENSION,
      pointRadius: CHART_POINT_RADIUS,
      hidden: index > 2,
    }));

  return {
    ...query,
    data: {
      labels,
      datasets,
    },
  };
}

export default useCategoriesCountsLineChartData;
