import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useExpenseTypeChartData from "@src/utils/hooks/useExpenseTypeChartData.ts";
import { currencyFormat, labelCallback } from "@src/utils/functions.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (tickValue) => currencyFormat({ notation: "compact" }).format(Number(tickValue)),
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: labelCallback,
      },
    },
  },
} as const;

function ExpenseTypeLineChart() {
  const { data } = useExpenseTypeChartData();

  return <Line height={180} options={options} data={data} />;
}

export default ExpenseTypeLineChart;
