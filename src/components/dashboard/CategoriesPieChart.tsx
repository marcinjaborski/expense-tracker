"use client";

import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from "chart.js";
import { DateTime } from "luxon";
import React from "react";
import { Pie } from "react-chartjs-2";

import { useCategoriesChartData } from "@/repository/useCategoriesChartData";
import { ExpenseType } from "@/utils/types";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options = {
  plugins: {
    colors: {
      forceOverride: true,
    },
  },
};

type CategoriesPieChartProps = {
  type: ExpenseType;
};

export function CategoriesPieChart({ type }: CategoriesPieChartProps) {
  const startDate = DateTime.now().minus({ months: 5 }).startOf("month").toSQLDate();
  const endDate = DateTime.now().toSQLDate();
  const { data } = useCategoriesChartData(type, startDate, endDate);

  return <Pie data={data} options={options} />;
}
