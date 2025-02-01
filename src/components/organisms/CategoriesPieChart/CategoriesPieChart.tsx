import { ArcElement, Chart as ChartJS, ChartOptions, Colors, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ExpenseType } from "@src/utils/types.ts";
import useCategoriesChartData from "@src/utils/hooks/useCategoriesChartData.ts";
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

type CategoriesPieChartProps = {
  type: ExpenseType;
};

function CategoriesPieChart({ type }: CategoriesPieChartProps) {
  const { data } = useCategoriesChartData(type);

  return <Pie data={data} options={options} />;
}

export default CategoriesPieChart;
