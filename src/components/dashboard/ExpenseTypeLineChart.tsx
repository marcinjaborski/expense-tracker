"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { DateTime } from "luxon";
import { Line } from "react-chartjs-2";

import { useExpenseTypeChartData } from "@/repository/useExpenseTypeChartData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
} as const;

export function ExpenseTypeLineChart() {
  const startDate = DateTime.now().minus({ months: 5 }).startOf("month").toSQLDate();
  const endDate = DateTime.now().toSQLDate();
  const { data } = useExpenseTypeChartData(startDate, endDate);

  return <Line options={options} data={data} />;
}
