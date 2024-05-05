import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { FaHandHoldingUsd } from "react-icons/fa";
import { LuDatabaseBackup, LuFolders, LuImport, LuWallet } from "react-icons/lu";

import { OtherLink, PageHeader } from "@/components";
import { LogoutLink } from "@/components/other/LogoutLink";
import { LocaleParams } from "@/utils/params";

export default async function Other({ params: { locale } }: LocaleParams) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Other" });

  return (
    <NextIntlClientProvider messages={pick(messages, "Other")}>
      <div className="flex w-full flex-col items-center self-stretch">
        <PageHeader title={t("title")} />
        <div className="grid h-full items-center">
          <div className="mt-3 grid grid-cols-3 place-items-center gap-5">
            <OtherLink title={t("accounts")} Icon={LuWallet} href="/accounts" />
            <OtherLink title={t("categories")} Icon={LuFolders} href="/categories" />
            <OtherLink title={t("debts")} Icon={FaHandHoldingUsd} href="/debts" />
            <OtherLink title={t("import")} Icon={LuImport} href="/import" />
            <OtherLink title={t("export")} Icon={LuDatabaseBackup} href="/export" />
            <LogoutLink />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
