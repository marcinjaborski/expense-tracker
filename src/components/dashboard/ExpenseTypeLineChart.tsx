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
import { Line } from "react-chartjs-2";

import { useExpenseTypeChartData } from "@/utils/hooks";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
} as const;

export function ExpenseTypeLineChart() {
  const { data } = useExpenseTypeChartData();

  return <Line options={options} data={data} />;
}
