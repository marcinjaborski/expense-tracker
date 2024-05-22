import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { CategoriesPieChart, ExpenseTypeLineChart } from "@/components/dashboard";
import { ValueCard } from "@/components/dashboard/ValueCard";
import { getTotalMoney } from "@/repository/getTotalMoney";
import { LocaleParams } from "@/utils/params";
import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

export default async function Dashboard({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  const supabase = createClient();

  const { data: currentExpenses } = await supabase.rpc("get_this_month_expenses", { expense_type: "expense" });
  const { data: currentIncomes } = await supabase.rpc("get_this_month_expenses", { expense_type: "income" });
  const { data: averageExpenses } = await supabase.rpc("get_avg_expenses_past_six_months");
  const totalMoney = await getTotalMoney();

  return (
    <NextIntlClientProvider messages={pick(messages, "Dashboard")}>
      <div className="flex h-full w-full flex-col items-center gap-2">
        <PageHeader title={t("title")} />
        <div className="grid grid-cols-2 gap-2">
          <ValueCard value={-Number(currentExpenses)} label={t("currentExpenses")} />
          <ValueCard value={-Number(averageExpenses)} label={t("averageExpenses")} />
          <ValueCard value={totalMoney} label={t("totalMoney")} />
          <ValueCard value={Number(currentIncomes) - Number(currentExpenses)} label={t("currentNetProfit")} />
        </div>
        <ExpenseTypeLineChart />
        <CategoriesPieChart type={ExpenseTypes.enum.expense} />
      </div>
    </NextIntlClientProvider>
  );
}
