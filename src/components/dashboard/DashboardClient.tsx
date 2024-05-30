"use client";

import { DateTime } from "luxon";
import { useMemo } from "react";

import { DashboardValues } from "@/components/dashboard/DashboardValues";
import { ExpenseTypes } from "@/utils/types";

import { CategoriesPieChart } from "./CategoriesPieChart";
import { DashboardContext } from "./DashboardContext";
import { ExpenseTypeLineChart } from "./ExpenseTypeLineChart";

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
      <CategoriesPieChart type={ExpenseTypes.enum.expense} />
    </DashboardContext.Provider>
  );
}
