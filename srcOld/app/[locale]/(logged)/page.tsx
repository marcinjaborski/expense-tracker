import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { DashboardClient } from "@/components/dashboard";
import { LocaleParams } from "@/utils/params";

export default async function Dashboard({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return (
    <NextIntlClientProvider messages={pick(messages, "Dashboard")}>
      <div className="flex h-full w-full flex-col items-center gap-2">
        <PageHeader title={t("title")} />
        <DashboardClient />
      </div>
    </NextIntlClientProvider>
  );
}
