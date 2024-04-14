"use client";

import { useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormState } from "react-dom";

import { AmountInput, ErrorToast, LabeledInput, Modal, SubmitButton } from "@/components";
import { useDebts } from "@/repository/useDebts";
import { getModal, getZodErrorMessage, notUndefined } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { CREATE_DEBT_MODAL } from "@/utils/ids";
import { UPDATE_ID } from "@/utils/searchParams";
import { createDebt } from "@/utils/serverActions";
import { Tables } from "@/utils/supabase/database.types";

type CreateDebtModalProps = {
  debt?: Tables<"debts">;
  onReset?: () => void;
};

export function CreateDebtModal({ debt = undefined, onReset = () => {} }: CreateDebtModalProps) {
  const t = useTranslations("Debts");
  const tFeedback = useTranslations("Feedback");
  const queryClient = useQueryClient();
  const updateParams = useUpdateParams();
  const debts = useDebts(true);
  const persons = uniqBy(debts.data?.pages.flat() || [], "person")
    .map((d) => d?.person)
    .filter(notUndefined);
  const [{ message, errors }, formAction] = useFormState(createDebt, { message: "", errors: [] });

  useEffect(() => {
    if (message !== "OK") return;
    getModal(CREATE_DEBT_MODAL).close();
    onReset();
    queryClient.invalidateQueries({ queryKey: ["categories"] }).then(() => updateParams(UPDATE_ID, null));
  }, [updateParams, message, queryClient, onReset]);

  return (
    <Modal id={CREATE_DEBT_MODAL} title={t("createDebt")} action={formAction}>
      <input type="hidden" name="id" defaultValue={debt?.id} />
      <LabeledInput
        label={t("person")}
        name="person"
        defaultValue={debt?.person}
        errorMessage={getZodErrorMessage(t, "person", errors)}
        list="personOptions"
      />
      <datalist id="personOptions">
        {persons.map((person) => (
          <option key={person} value={person} aria-label={person} />
        ))}
      </datalist>
      <AmountInput
        placeholder={t("amount")}
        name="amount"
        defaultValue={debt?.amount}
        errorMessage={getZodErrorMessage(t, "amount", errors)}
      />
      <LabeledInput label={t("description")} name="description" defaultValue={debt?.description} />
      <div className="modal-action">
        <SubmitButton aria-label={t("create")} value={t("create")} />
      </div>
      <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
    </Modal>
  );
}
