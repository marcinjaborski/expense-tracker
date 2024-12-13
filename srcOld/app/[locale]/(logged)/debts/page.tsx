import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { prefetchDebts } from "@/repository/prefetchDebts";
import { LocaleParams } from "@/utils/params";

import { DebtsClient } from "./DebtsClient";

export default async function Debts({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Debts" });
  const queryClient = new QueryClient();
  await prefetchDebts(queryClient);

  return (
    <NextIntlClientProvider messages={pick(messages, ["Debts", "Shared", "Feedback"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="relative flex w-full flex-col items-center self-stretch">
          <PageHeader title={t("title")} />
          <DebtsClient />
        </div>
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
