import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { prefetchCategories } from "@/repository/prefetchCategories";

import { CreateExpenseClient } from "./CreateExpenseClient";

export default async function CreateExpense() {
  const queryClient = new QueryClient();
  const messages = await getMessages();

  await prefetchCategories(queryClient);

  return (
    <NextIntlClientProvider messages={pick(messages, ["CreateExpense", "Feedback"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateExpenseClient />
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
