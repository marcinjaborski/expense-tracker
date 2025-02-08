import { ArcElement, Chart as ChartJS, ChartOptions, Colors, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import useTotalMoneyPerAccountChartData from "@src/utils/hooks/useTotalMoneyPerAccountChartData.ts";
import { labelCallback } from "@src/utils/functions.ts";
import { CHART_PIE_RADIUS } from "@src/utils/constants.ts";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options: ChartOptions<"pie"> = {
  radius: CHART_PIE_RADIUS,
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
