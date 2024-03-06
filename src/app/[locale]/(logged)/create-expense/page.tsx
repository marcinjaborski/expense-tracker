import { CreateExpenseClient } from "./CreateExpenseClient";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { pick } from "lodash";

export default async function CreateExpense() {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, "CreateExpense")}>
      <CreateExpenseClient />
    </NextIntlClientProvider>
  );
}
