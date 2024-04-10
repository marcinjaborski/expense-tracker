import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { CreateButton, PageHeader } from "@/components";
import { prefetchCategories } from "@/repository/prefetchCategories";
import { CREATE_CATEGORY_MODAL } from "@/utils/ids";
import { LocaleParams } from "@/utils/params";

import { CategoriesClient } from "./CategoriesClient";

export default async function Categories({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Categories" });
  const queryClient = new QueryClient();
  await prefetchCategories(queryClient);

  return (
    <NextIntlClientProvider messages={pick(messages, ["Categories", "CreateExpense", "Shared", "Feedback"])}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="relative flex w-full flex-col items-center self-stretch">
          <PageHeader title={t("title")} />
          <CategoriesClient />
          <CreateButton label={t("createCategory")} modal={CREATE_CATEGORY_MODAL} />
        </div>
      </HydrationBoundary>
    </NextIntlClientProvider>
  );
}
