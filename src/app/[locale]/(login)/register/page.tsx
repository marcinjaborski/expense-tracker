import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { RegisterClient } from "./RegisterClient";

export default async function Register() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "Login")}>
      <RegisterClient />
    </NextIntlClientProvider>
  );
}
