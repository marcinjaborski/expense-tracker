import { ArcElement, Chart as ChartJS, Colors, Legend, Tooltip } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

import { useAccountsChartData } from "./hooks";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const options = {
  plugins: {
    colors: {
      forceOverride: true,
    },
  },
};

export function TotalMoneyPerAccountPieChart() {
  const { data } = useAccountsChartData();

  return <Pie data={data} options={options} />;
}
