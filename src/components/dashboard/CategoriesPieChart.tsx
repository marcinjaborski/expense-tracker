"use client";

import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

import { ExpenseType } from "@/utils/types";

import { useCategoriesChartData } from "./hooks";

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
  const { data } = useCategoriesChartData(type);

  return <Pie data={data} options={options} />;
}
