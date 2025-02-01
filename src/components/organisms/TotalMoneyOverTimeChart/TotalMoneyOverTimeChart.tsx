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
import useTotalMoneyOverTimeChartData from "@src/utils/hooks/useTotalMoneyOverTimeChartData.ts";
import { useMemo, useState } from "react";
import { currencyFormat, labelCallback } from "@src/utils/functions.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TotalMoneyOverTimeChart() {
  const [beginAtZero, setBeginAtZero] = useState(false);
  const { data } = useTotalMoneyOverTimeChartData();

  const options: ChartOptions<"line"> = useMemo(
    () => ({
      onClick: (_, elements) => (!elements.length ? setBeginAtZero((prevState) => !prevState) : null),
      responsive: true,
      scales: {
        y: {
          beginAtZero,
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
    }),
    [beginAtZero],
  );

  return <Line options={options} data={data} />;
}

export default TotalMoneyOverTimeChart;
