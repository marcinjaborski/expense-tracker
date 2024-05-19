import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { CategoriesPieChart, ExpenseTypeLineChart } from "@/components/dashboard";
import { LocaleParams } from "@/utils/params";
import { ExpenseTypes } from "@/utils/types";

export default async function Dashboard({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return (
    <NextIntlClientProvider messages={pick(messages, "Dashboard")}>
      <div className="flex h-full w-full flex-col items-center gap-2">
        <PageHeader title={t("title")} />
        <ExpenseTypeLineChart />
        <CategoriesPieChart type={ExpenseTypes.enum.expense} />
      </div>
    </NextIntlClientProvider>
  );
}
