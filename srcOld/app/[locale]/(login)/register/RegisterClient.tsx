"use client";

import { useTranslations } from "next-intl";
import { useFormState } from "react-dom";

import { AuthCard, LabeledInput } from "@/components";
import { Link } from "@/navigation";
import { getZodErrorMessage } from "@/utils/functions";
import { register } from "@/utils/serverActions";

export function RegisterClient() {
  const t = useTranslations("Login");
  const [{ message, errors }, formAction] = useFormState(register, { message: "", errors: [] });

  return (
    <AuthCard
      title={t("register")}
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
            label="Password"
            name="password"
            type="password"
            required
            errorMessage={getZodErrorMessage(t, "password", errors)}
          />
          <LabeledInput
            label="Confim password"
            name="confirmPassword"
            type="password"
            required
            errorMessage={getZodErrorMessage(t, "confirmPassword", errors)}
          />
        </>
      }
      errorMessage={message === "invalidCredentials" ? t(message) : undefined}
      bottomText={
        <>
          {t("loginText")}
          <Link href="/login" className="pl-1 font-bold">
            {t("loginLink")}
          </Link>
        </>
      }
    />
  );
}
