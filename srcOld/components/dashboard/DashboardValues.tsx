import { useTranslations } from "next-intl";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";

import { useAverageExpenses, useMonthExpenses, useTotalMoney } from "./hooks";
import { ValueCard } from "./ValueCard";

export function DashboardValues() {
  const t = useTranslations("Dashboard");
  const { endDate } = useDashboardContext();
  const { monthExpenses, monthIncomes } = useMonthExpenses();
  const averageExpenses = useAverageExpenses();
  const totalMoney = useTotalMoney(endDate);

  return (
    <div className="grid grid-cols-2 gap-2">
      <ValueCard value={-monthExpenses} label={t("currentExpenses")} />
      <ValueCard value={-averageExpenses} label={t("averageExpenses")} />
      <ValueCard value={totalMoney} label={t("totalMoney")} />
      <ValueCard value={monthIncomes - monthExpenses} label={t("currentNetProfit")} />
    </div>
  );
}
