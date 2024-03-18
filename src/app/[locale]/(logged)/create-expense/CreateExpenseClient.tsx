"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormState } from "react-dom";
import { LuArrowRightLeft, LuCoins, LuMinus, LuPlus } from "react-icons/lu";

import { CategoryCarousel, CreateCategoryModal, ErrorToast, ExpenseSelect, SubmitButton } from "@/components";
import { cn, getToday, getZodErrorMessage } from "@/utils/functions";
import { createExpense } from "@/utils/serverActions";
import { ExpenseType, ExpenseTypes } from "@/utils/types";

export function CreateExpenseClient() {
  const t = useTranslations("CreateExpense");
  const tFeedback = useTranslations("Feedback");
  const [type, setType] = useState<ExpenseType>(ExpenseTypes.enum.expense);
  const [{ message, errors }, formAction] = useFormState(createExpense, { message: "", errors: [] });

  return (
    <>
      <form action={formAction} className="box-border flex h-full flex-col items-center justify-center gap-3 px-5">
        <div className="join">
          <ExpenseSelect
            label={t("income")}
            Icon={LuPlus}
            value="income"
            onChange={() => setType(ExpenseTypes.enum.income)}
          />
          <ExpenseSelect
            label={t("expense")}
            Icon={LuMinus}
            value="expense"
            defaultChecked
            onChange={() => setType(ExpenseTypes.enum.expense)}
          />
          <ExpenseSelect
            label={t("transfer")}
            Icon={LuArrowRightLeft}
            value="transfer"
            onChange={() => setType(ExpenseTypes.enum.transfer)}
          />
        </div>
        <CategoryCarousel type={type} />
        <label className="input input-bordered flex items-center gap-2">
          <input type="number" className="grow" placeholder={t("amount")} name="amount" />
          <LuCoins />
        </label>
        {message === "parsingError" ? (
          <span className="label-text-alt text-error">{getZodErrorMessage(t, "amount", errors)}</span>
        ) : null}
        <input type="date" className="input input-bordered" name="date" defaultValue={getToday()} />
        <textarea name="description" placeholder={t("description")} className="textarea textarea-bordered w-full" />
        <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
        <SubmitButton className={cn("fixed bottom-20")} aria-label={t("create")} value={t("create")} />
      </form>
      <CreateCategoryModal initialType={type} />
    </>
  );
}
