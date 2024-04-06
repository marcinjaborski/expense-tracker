"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";

import { ExpenseSelect } from "@/components/create-expense/ExpenseSelect";
import { ErrorToast, LabeledInput, Modal, SubmitButton } from "@/components/shared";
import { categoryIcon } from "@/utils/categories";
import { getModal } from "@/utils/functions";
import { CREATE_CATEGORY_MODAL } from "@/utils/ids";
import { createCategory } from "@/utils/serverActions/createCategory";
import { ExpenseType, ExpenseTypes } from "@/utils/types";

export function CreateCategoryModal({ initialType }: { initialType: ExpenseType }) {
  const t = useTranslations("CreateExpense");
  const tFeedback = useTranslations("Feedback");
  const [{ message }, formAction] = useFormState(createCategory, { message: "", errors: [] });
  const [type, setType] = useState<ExpenseType>(initialType);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  if (message === "OK") getModal(CREATE_CATEGORY_MODAL).close();

  return (
    <Modal id={CREATE_CATEGORY_MODAL} title={t("createCategory")} action={formAction}>
      <LabeledInput label={t("name")} name="name" />
      <div className="mt-3 grid max-h-[30vh] grid-cols-4 gap-2 overflow-y-auto">
        {Object.entries(categoryIcon).map(([name, Icon], index) => (
          <label key={name} className="btn has-[:checked]:btn-primary">
            <Icon className="text-2xl" />
            <input type="radio" value={name} className="hidden" name="icon" defaultChecked={index === 0} />
          </label>
        ))}
      </div>
      <div className="join mt-5 self-center">
        <ExpenseSelect
          label={t("income")}
          Icon={LuPlus}
          value="income"
          checked={type === ExpenseTypes.enum.income}
          onChange={() => setType(ExpenseTypes.enum.income)}
        />
        <ExpenseSelect
          label={t("expense")}
          Icon={LuMinus}
          value="expense"
          checked={type === ExpenseTypes.enum.expense}
          onChange={() => setType(ExpenseTypes.enum.expense)}
        />
        <ExpenseSelect
          label={t("transfer")}
          Icon={LuArrowRightLeft}
          value="transfer"
          checked={type === ExpenseTypes.enum.transfer}
          onChange={() => setType(ExpenseTypes.enum.transfer)}
        />
      </div>
      <div className="modal-action">
        <SubmitButton aria-label={t("create")} value={t("create")} />
      </div>
      <ErrorToast message={tFeedback("error")} show={message === "serverError" || message === "parsingError"} />
    </Modal>
  );
}
