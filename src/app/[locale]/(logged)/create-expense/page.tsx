import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { getExpenseById } from "@/repository/getExpenseById";
import { prefetchAccounts } from "@/repository/prefetchAccounts";
import { prefetchCategories } from "@/repository/prefetchCategories";
import { UpdateSearchParams } from "@/utils/searchParams";

import { CreateExpenseClient } from "./CreateExpenseClient";

export default async function CreateExpense({ searchParams }: UpdateSearchParams) {
  const queryClient = new QueryClient();
  const messages = await getMessages();
  const expense = await getExpenseById(Number(searchParams.updateId));
  await Promise.all([prefetchCategories(queryClient), prefetchAccounts(queryClient)]);

  return (
    <NextIntlClientProvider messages={pick(messages, ["CreateExpense", "Feedback", "Shared"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateExpenseClient expense={expense} />
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
