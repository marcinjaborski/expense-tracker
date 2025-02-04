import { ArcElement, Chart as ChartJS, ChartOptions, Colors, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import useTotalMoneyPerAccountChartData from "@src/utils/hooks/useTotalMoneyPerAccountChartData.ts";
import { labelCallback } from "@src/utils/functions.ts";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options: ChartOptions<"pie"> = {
  plugins: {
    colors: {
      forceOverride: true,
    },
    tooltip: {
      callbacks: {
        label: labelCallback,
      },
    },
  },
};

function TotalMoneyPerAccountPieChart() {
  const { data } = useTotalMoneyPerAccountChartData();

  return <Pie data={data} options={options} />;
}

export default TotalMoneyPerAccountPieChart;
