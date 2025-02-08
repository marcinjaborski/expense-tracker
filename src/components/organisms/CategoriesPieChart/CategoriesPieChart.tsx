import { ArcElement, Chart as ChartJS, ChartOptions, Colors, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import useCategoriesChartData from "@src/utils/hooks/useCategoriesChartData.ts";
import { labelCallback } from "@src/utils/functions.ts";
import { Enums } from "@src/utils/database.types.ts";
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

type CategoriesPieChartProps = {
  type: Enums<"expense_type">;
};

function CategoriesPieChart({ type }: CategoriesPieChartProps) {
  const { data } = useCategoriesChartData(type);

  return <Pie data={data} options={options} />;
}

export default CategoriesPieChart;
