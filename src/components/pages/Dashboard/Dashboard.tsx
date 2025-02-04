import DashboardValues from "@src/components/templates/DashboardValues";
import ExpenseTypeLineChart from "@src/components/organisms/ExpenseTypeLineChart";
import TotalMoneyOverTimeChart from "@src/components/organisms/TotalMoneyOverTimeChart";
import CategoriesPieChart from "@src/components/organisms/CategoriesPieChart";
import { DashboardContext } from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import { useMemo } from "react";
import TotalMoneyPerAccountPieChart from "@src/components/organisms/TotalMoneyPerAccountPieChart";

function Dashboard() {
  const contextValue = useMemo(
    () => ({
      startDate: DateTime.now().minus({ months: 5 }).startOf("month"),
      endDate: DateTime.now().endOf("month"),
    }),
    [],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      <DashboardValues />
      <ExpenseTypeLineChart />
      <TotalMoneyOverTimeChart />
      <CategoriesPieChart type="expense" />
      <TotalMoneyPerAccountPieChart />
    </DashboardContext.Provider>
  );
}

export default Dashboard;
