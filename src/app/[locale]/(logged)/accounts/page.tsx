import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { PageHeader } from "@/components";
import { AccountCard, CreateAccountButton, CreateAccountModal } from "@/components/accounts";
import { FormWrap } from "@/components/shared/FormWrap";
import { redirect } from "@/navigation";
import { getAccounts } from "@/repository/getAccounts";
import { SearchParamType, UPDATE_ID } from "@/utils/searchParams";

import { AccountsClient } from "./AccountsClient";

type AccountsProps = {
  params: {
    locale: string;
  };
  searchParams: {
    [UPDATE_ID]: SearchParamType;
  };
};

export default async function Accounts({ params: { locale }, searchParams: { updateId } }: AccountsProps) {
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Accounts" });
  const { data: accounts, error } = await getAccounts();

  if (error || accounts === null) return redirect("/error");
  const account = accounts.find((acc) => acc.id === Number(updateId));

  return (
    <NextIntlClientProvider messages={pick(messages, ["Accounts", "Shared", "Feedback"])}>
      <div className="flex w-full flex-col items-center self-stretch">
        <PageHeader title={t("title")} />
        <div className="mt-3 flex h-full w-full flex-col gap-4">
          {accounts.length === 0 ? (
            <div>{t("noAccounts")}</div>
          ) : (
            accounts.map((account) => <AccountCard key={account.id} account={account} />)
          )}
        </div>
        <CreateAccountButton />
        <FormWrap<typeof CreateAccountModal> Form={CreateAccountModal} account={account} />
        <AccountsClient />
      </div>
    </NextIntlClientProvider>
  );
}
