import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { prefetchAccounts } from "@/repository/prefetchAccounts";
import { LocaleParams } from "@/utils/params";

import { AccountsClient } from "./AccountsClient";

export default async function Accounts({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Accounts" });
  const queryClient = new QueryClient();
  await prefetchAccounts(queryClient);

  return (
    <NextIntlClientProvider messages={pick(messages, ["Accounts", "Shared", "Feedback"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex w-full flex-col items-center self-stretch">
          <PageHeader title={t("title")} />
          <AccountsClient />
        </div>
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
