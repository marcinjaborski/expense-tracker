import { pick } from "lodash";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { LoginClient } from "./LoginClient";

export default async function Login() {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, "Login")}>
      <LoginClient />
    </NextIntlClientProvider>
  );
}
