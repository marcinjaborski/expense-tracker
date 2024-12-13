import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Fragment, useEffect } from "react";
import { useFormState } from "react-dom";

import { AmountInput, ErrorToast, LabeledInput, Modal, SubmitButton } from "@/components";
import { getModal, getZodErrorMessage } from "@/utils/functions";
import { CREATE_ACCOUNT_MODAL } from "@/utils/ids";
import { createAccount } from "@/utils/serverActions";
import { Tables } from "@/utils/supabase/database.types";

type CreateAccountModalProps = {
  account?: Tables<"accounts">;
  onReset: () => void;
};

export function CreateAccountModal({ account = undefined, onReset }: CreateAccountModalProps) {
  const t = useTranslations("Accounts");
  const tFeedback = useTranslations("Feedback");
  const queryClient = useQueryClient();
  const [{ message, errors }, formAction] = useFormState(createAccount, { message: "", errors: [] });
  const buttonText = account ? t("updateAccount") : t("createAccount");

  useEffect(() => {
    if (message !== "OK") return;
    getModal(CREATE_ACCOUNT_MODAL).close();
    onReset();
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  }, [queryClient, onReset, message]);

  return (
    <Modal
      id={CREATE_ACCOUNT_MODAL}
      title={account ? t("updateAccountTitle") : t("createAccountTitle")}
      action={formAction}
    >
      <Fragment key={account?.id}>
        <input type="hidden" name="id" defaultValue={account?.id} />
        <LabeledInput
          label={t("name")}
          name="name"
          errorMessage={getZodErrorMessage(t, "name", errors)}
          defaultValue={account?.name}
        />
        <AmountInput
          className="mt-5"
          placeholder={t("initialBalance")}
          name="initialBalance"
          defaultValue={account?.initialBalance}
          errorMessage={getZodErrorMessage(t, "initialBalance", errors)}
        />
        <div className="modal-action">
          <SubmitButton aria-label={buttonText} value={buttonText} />
        </div>
        <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
      </Fragment>
    </Modal>
  );
}
