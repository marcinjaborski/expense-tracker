import { useTranslations } from "next-intl";

import { ValueCard } from "@/components/dashboard/ValueCard";
import { useAverageExpenses } from "@/utils/hooks/useAverageExpenses";
import { useMonthExpenses } from "@/utils/hooks/useMonthExpenses";
import { useTotalMoney } from "@/utils/hooks/useTotalMoney";

export function DashboardValues() {
  const t = useTranslations("Dashboard");
  const { monthExpenses, monthIncomes } = useMonthExpenses();
  const averageExpenses = useAverageExpenses();
  const totalMoney = useTotalMoney();

  return (
    <div className="grid grid-cols-2 gap-2">
      <ValueCard value={-monthExpenses} label={t("currentExpenses")} />
      <ValueCard value={-averageExpenses} label={t("averageExpenses")} />
      <ValueCard value={totalMoney} label={t("totalMoney")} />
      <ValueCard value={monthIncomes - monthExpenses} label={t("currentNetProfit")} />
    </div>
  );
}
