import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { currencyFormat, labelCallback } from "@src/utils/functions.ts";
import { Enums } from "@src/utils/database.types.ts";
import useCategoriesLineChartData from "@src/utils/hooks/useCategoriesLineChartData.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors);

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

type CategoriesLineChartProps = {
  type: Enums<"expense_type">;
};

function CategoriesLineChart({ type }: CategoriesLineChartProps) {
  const { data } = useCategoriesLineChartData(type);

  return <Line height={300} data={data} options={options} />;
}

export default CategoriesLineChart;
