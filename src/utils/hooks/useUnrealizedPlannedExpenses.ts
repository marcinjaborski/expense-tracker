import usePlannedExpenses from "@src/repository/usePlannedExpenses.ts";
import { isPlannedExpenseRealized } from "@src/utils/functions.ts";
import useDashboardContext from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import { groupBy, sumBy } from "lodash";

function useUnrealizedPlannedExpenses() {
  const { endDate, planned } = useDashboardContext();
  const { data: plannedExpenses } = usePlannedExpenses();

  if (!planned || !endDate.hasSame(DateTime.now(), "month"))
    return {
      expenses: 0,
      incomes: 0,
    };

  const allUnrealized = plannedExpenses.filter((plannedExpense) => !isPlannedExpenseRealized(plannedExpense.realized));
  const { expense, income } = groupBy(allUnrealized, "type");
  return {
    expenses: sumBy(expense, "amount"),
    incomes: sumBy(income, "amount"),
  };
}

export default useUnrealizedPlannedExpenses;
