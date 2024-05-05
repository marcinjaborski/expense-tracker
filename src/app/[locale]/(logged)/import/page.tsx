import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { LocaleParams } from "@/utils/params";

import { ImportClient } from "./ImportClient";

export default async function Import({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Import" });

  return (
    <NextIntlClientProvider messages={pick(messages, "Import")}>
      <div className="flex h-full w-full flex-col items-center gap-2">
        <PageHeader title={t("importTitle")} />
        <ImportClient />
      </div>
    </NextIntlClientProvider>
  );
}
