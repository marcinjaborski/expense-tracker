import { useAppSelector } from "@src/store/store.ts";
import useAmountByCategoryAndDate from "@src/repository/useAmountByCategoryAndDate.ts";
import { groupBy, sumBy } from "lodash";

function useMonthExpenses() {
  const { endDate } = useAppSelector((state) => state.dashboard);
  const startDate = endDate.startOf("month");
  const { data: amounts, isLoading } = useAmountByCategoryAndDate(startDate, endDate);

  if (isLoading || !amounts)
    return {
      monthExpenses: NaN,
      monthIncomes: NaN,
      monthTransfers: NaN,
    };

  const expensesByType = groupBy(amounts.data, "type");
  return {
    monthExpenses: sumBy(expensesByType["expense"], "sum"),
    monthIncomes: sumBy(expensesByType["income"], "sum"),
    monthTransfers: sumBy(expensesByType["transfer"], "sum"),
  };
}

export default useMonthExpenses;
