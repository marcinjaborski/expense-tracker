import DashboardValues from "@src/components/templates/DashboardValues";
import ExpenseTypeLineChart from "@src/components/organisms/ExpenseTypeLineChart";
import TotalMoneyOverTimeChart from "@src/components/organisms/TotalMoneyOverTimeChart";
import CategoriesPieChart from "@src/components/organisms/CategoriesPieChart";
import { DashboardContext } from "@src/utils/context/dashboardContext.ts";
import { DateTime } from "luxon";
import { useMemo } from "react";
import TotalMoneyPerAccountPieChart from "@src/components/organisms/TotalMoneyPerAccountPieChart";
import CategoriesLineChart from "@src/components/organisms/CategoriesLineChart";
import { Divider, Stack } from "@mui/material";

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
      <Stack gap={1} divider={<Divider />}>
        <DashboardValues />
        <ExpenseTypeLineChart />
        <TotalMoneyOverTimeChart />
        <CategoriesLineChart type="expense" />
        <CategoriesPieChart type="expense" />
        <TotalMoneyPerAccountPieChart />
      </Stack>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
