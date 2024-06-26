import { useQueryClient } from "@tanstack/react-query";
import { uniqBy } from "lodash";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { LuArrowDown, LuUser } from "react-icons/lu";

import { AmountInput, ErrorToast, LabeledInput, Modal, SubmitButton } from "@/components";
import { useDebts } from "@/repository/useDebts";
import { cn, getModal, getZodErrorMessage, notUndefined } from "@/utils/functions";
import { CREATE_DEBT_MODAL } from "@/utils/ids";
import { createDebt } from "@/utils/serverActions";
import { Tables } from "@/utils/supabase/database.types";

type CreateDebtModalProps = {
  debt?: Tables<"debts">;
  onReset: () => void;
};

export function CreateDebtModal({ debt = undefined, onReset }: CreateDebtModalProps) {
  const t = useTranslations("Debts");
  const tFeedback = useTranslations("Feedback");
  const queryClient = useQueryClient();
  const debts = useDebts(true);
  const persons = uniqBy(debts.data?.pages.flat() || [], "person")
    .map((d) => d?.person)
    .filter(notUndefined);
  const [{ message, errors }, formAction] = useFormState(createDebt, { message: "", errors: [] });
  const [type, setType] = useState<"borrow" | "reimburse">("borrow");
  const buttonText = debt ? t("edit") : t("create");

  useEffect(() => {
    if (message !== "OK") return;
    getModal(CREATE_DEBT_MODAL).close();
    onReset();
    queryClient.invalidateQueries({ queryKey: ["debts"] });
  }, [message, queryClient, onReset]);

  return (
    <Modal id={CREATE_DEBT_MODAL} title={debt ? t("updateDebt") : t("createDebt")} action={formAction}>
      <Fragment key={debt?.id}>
        <input type="hidden" name="id" defaultValue={debt?.id} />
        <input type="hidden" name="type" value={type} />
        <div className="flex flex-col items-center gap-3 text-4xl">
          <LuUser />
          <button
            className="btn btn-circle text-4xl"
            type="button"
            aria-label={type === "borrow" ? t("toggleTypeReimburse") : t("toggleTypeBorrow")}
          >
            <LuArrowDown
              className={cn("transition-transform", { "rotate-180": type === "reimburse" })}
              onClick={() => setType((prevState) => (prevState === "borrow" ? "reimburse" : "borrow"))}
            />
          </button>
        </div>
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
          <SubmitButton aria-label={buttonText} value={buttonText} />
        </div>
        <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
      </Fragment>
    </Modal>
  );
}
