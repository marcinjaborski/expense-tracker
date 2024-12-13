"use client";

import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";

import { AuthCard, LabeledInput } from "@/components";
import { Link } from "@/navigation";
import { getZodErrorMessage } from "@/utils/functions";
import { login } from "@/utils/serverActions";

export function LoginClient() {
  const t = useTranslations("Login");
  const [{ message, errors }, formAction] = useFormState(login, { message: "", errors: [] });

  return (
    <AuthCard
      title="Login"
      action={formAction}
      fields={
        <>
          <LabeledInput
            label={t("email")}
            name="email"
            type="email"
            required
            errorMessage={getZodErrorMessage(t, "email", errors)}
          />
          <LabeledInput
            label={t("password")}
            name="password"
            type="password"
            required
            errorMessage={getZodErrorMessage(t, "password", errors)}
          />
        </>
      }
      errorMessage={message === "invalidCredentials" ? t(message) : undefined}
      bottomText={
        <>
          {t("registerText")}
          <Link href="/register" className="pl-1 font-bold">
            {t("registerLink")}
          </Link>
        </>
      }
    />
  );
}
