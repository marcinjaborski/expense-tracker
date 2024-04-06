"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { ErrorToast, LabeledInput, Modal, SubmitButton } from "@/components";
import { useRouter } from "@/navigation";
import { currencies } from "@/utils/constants";
import { getModal, getZodErrorMessage } from "@/utils/functions";
import { CREATE_ACCOUNT_MODAL } from "@/utils/ids";
import { createAccount } from "@/utils/serverActions";

type CreateAccountModalProps = {
  onReset: () => void;
};

export function CreateAccountModal({ onReset }: CreateAccountModalProps) {
  const t = useTranslations("Accounts");
  const tFeedback = useTranslations("Feedback");
  const [{ message, errors }, formAction] = useFormState(createAccount, { message: "", errors: [] });
  const router = useRouter();

  useEffect(() => {
    if (message !== "OK") return;
    router.refresh();
    getModal(CREATE_ACCOUNT_MODAL).close();
    onReset();
  }, [onReset, router, message]);

  return (
    <Modal id={CREATE_ACCOUNT_MODAL} title={t("createAccountTitle")} action={formAction}>
      <LabeledInput label={t("name")} name="name" errorMessage={getZodErrorMessage(t, "name", errors)} />
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{t("currency")}</span>
        </div>
        <select className="select select-bordered w-full" name="currency">
          {currencies.map((code) => (
            <option key={code} value={code}>
              {t(code)}
            </option>
          ))}
        </select>
      </label>
      <div className="modal-action">
        <SubmitButton aria-label={t("createAccount")} value={t("createAccount")} />
      </div>
      <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
    </Modal>
  );
}
