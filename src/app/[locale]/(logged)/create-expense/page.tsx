import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { CreateExpenseClient } from "./CreateExpenseClient";

export default async function CreateExpense() {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, "CreateExpense")}>
      <CreateExpenseClient />
    </NextIntlClientProvider>
  );
}
