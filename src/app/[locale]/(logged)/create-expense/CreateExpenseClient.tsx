"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormState } from "react-dom";
import { LuArrowRightLeft, LuCoins, LuMinus, LuPlus } from "react-icons/lu";

import { CategoryCarousel, CreateCategoryModal, ErrorToast, ExpenseSelect, SubmitButton } from "@/components";
import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { cn, getToday, getZodErrorMessage } from "@/utils/functions";
import { createExpense } from "@/utils/serverActions";
import { ExpenseType, ExpenseTypes } from "@/utils/types";

type CreateExpenseClientProps = {
  expense: ExpenseReturnType | null;
};

export function CreateExpenseClient({ expense }: CreateExpenseClientProps) {
  const t = useTranslations("CreateExpense");
  const tFeedback = useTranslations("Feedback");
  const [type, setType] = useState<ExpenseType>(ExpenseTypes.enum.expense);
  const [{ message, errors }, formAction] = useFormState(createExpense, { message: "", errors: [] });
  const buttonText = expense ? t("update") : t("create");

  return (
    <>
      <form action={formAction} className="box-border flex h-full flex-col items-center justify-center gap-3 px-5">
        <input type="hidden" name="id" value={expense?.id} />
        <div className="join">
          <ExpenseSelect
            label={t("income")}
            Icon={LuPlus}
            value="income"
            defaultChecked={expense?.type === ExpenseTypes.enum.income}
            onChange={() => setType(ExpenseTypes.enum.income)}
          />
          <ExpenseSelect
            label={t("expense")}
            Icon={LuMinus}
            value="expense"
            defaultChecked={expense === null || expense.type === ExpenseTypes.enum.expense}
            onChange={() => setType(ExpenseTypes.enum.expense)}
          />
          <ExpenseSelect
            label={t("transfer")}
            Icon={LuArrowRightLeft}
            value="transfer"
            defaultChecked={expense?.type === ExpenseTypes.enum.transfer}
            onChange={() => setType(ExpenseTypes.enum.transfer)}
          />
        </div>
        <CategoryCarousel type={type} defaultCategoryId={expense?.category?.id} />
        {message === "parsingError" ? (
          <span className="label-text-alt text-error">{getZodErrorMessage(t, "category", errors)}</span>
        ) : null}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="number"
            className="grow"
            placeholder={t("amount")}
            name="amount"
            defaultValue={expense?.amount}
          />
          <LuCoins />
        </label>
        {message === "parsingError" ? (
          <span className="label-text-alt text-error">{getZodErrorMessage(t, "amount", errors)}</span>
        ) : null}
        <input type="date" className="input input-bordered" name="date" defaultValue={expense?.date || getToday()} />
        <textarea
          name="description"
          placeholder={t("description")}
          className="textarea textarea-bordered w-full"
          defaultValue={expense?.description}
        />
        <ErrorToast message={tFeedback("error")} show={message === "serverError"} />
        <SubmitButton className={cn("fixed bottom-20")} aria-label={buttonText} value={buttonText} />
      </form>
      <CreateCategoryModal initialType={type} />
    </>
  );
}
