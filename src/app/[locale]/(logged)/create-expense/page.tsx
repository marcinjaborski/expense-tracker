import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { getExpenseById } from "@/repository/getExpenseById";
import { prefetchCategories } from "@/repository/prefetchCategories";
import { CreateExpenseSearchParams } from "@/utils/searchParams";

import { CreateExpenseClient } from "./CreateExpenseClient";

type CreateExpenseProps = {
  searchParams: CreateExpenseSearchParams;
};

export default async function CreateExpense({ searchParams }: CreateExpenseProps) {
  const queryClient = new QueryClient();
  const messages = await getMessages();
  const expense = await getExpenseById(Number(searchParams.updateId));
  await prefetchCategories(queryClient);

  return (
    <NextIntlClientProvider messages={pick(messages, ["CreateExpense", "Feedback", "Shared"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateExpenseClient expense={expense} />
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
