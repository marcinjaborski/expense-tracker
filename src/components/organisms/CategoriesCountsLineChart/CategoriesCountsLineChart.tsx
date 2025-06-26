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
import useCategoriesCountsLineChartData from "@src/utils/hooks/useCategoriesCountsLineChartData.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors);

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
} as const;

function CategoriesCountsLineChart() {
  const { data } = useCategoriesCountsLineChartData();

  return <Line height={300} data={data} options={options} />;
}

export default CategoriesCountsLineChart;
