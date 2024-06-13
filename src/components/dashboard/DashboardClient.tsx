"use client";

import { DateTime } from "luxon";
import { useMemo } from "react";

import { ExpenseTypes } from "@/utils/types";

import { CategoriesPieChart } from "./CategoriesPieChart";
import { DashboardContext } from "./DashboardContext";
import { DashboardValues } from "./DashboardValues";
import { ExpenseTypeLineChart } from "./ExpenseTypeLineChart";
import { TotalMoneyOverTimeChart } from "./TotalMoneyOverTimeChart";
import { TotalMoneyPerAccountPieChart } from "./TotalMoneyPerAccountPieChart";

export function DashboardClient() {
  const contextValue = useMemo(
    () => ({
      startDate: DateTime.now().minus({ months: 5 }).startOf("month"),
      endDate: DateTime.now(),
    }),
    [],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      <DashboardValues />
      <ExpenseTypeLineChart />
      <TotalMoneyOverTimeChart />
      <CategoriesPieChart type={ExpenseTypes.enum.expense} />
      <TotalMoneyPerAccountPieChart />
    </DashboardContext.Provider>
  );
}
