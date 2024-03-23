import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { prefetchExpenses } from "@/repository/prefetchExpenses";
import { isExpenseRoute, mapRouteToType } from "@/utils/routes";
import { ExpenseListSearchParams, parseDirOption, parseQuery, parseSortOption } from "@/utils/searchParams";

import { ExpenseListClient } from "./ExpenseListClient";

type ExpensesProps = {
  params: {
    locale: string;
    type: string;
  };
  searchParams: ExpenseListSearchParams;
};

export default async function ExpenseList({ params, searchParams }: ExpensesProps) {
  const route = `/${params.type}`;
  if (!isExpenseRoute(route)) notFound();
  const type = mapRouteToType[route];
  const queryClient = new QueryClient();
  const messages = await getMessages();
  const t = await getTranslations({ locale: params.locale, namespace: "ExpenseList" });

  await prefetchExpenses(
    queryClient,
    type,
    parseQuery(searchParams.q),
    parseSortOption(searchParams.sort),
    parseDirOption(searchParams.dir),
  );

  return (
    <NextIntlClientProvider messages={pick(messages, ["ExpenseList"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex h-full w-full flex-col gap-2">
          <PageHeader title={t("title")} />
          <ExpenseListClient type={type} />
        </div>
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
