"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormState } from "react-dom";
import { LuArrowDown, LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";

import { AmountInput, CategoryCarousel, ErrorToast, ExpenseSelect, SubmitButton } from "@/components";
import { CreateCategoryModal } from "@/components/categories";
import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { useAccounts } from "@/repository/useAccounts";
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
  const { data: accounts } = useAccounts();
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
        {type === ExpenseTypes.enum.transfer ? (
          <>
            <select
              className="select select-bordered w-full"
              name="from_account"
              defaultValue={expense?.from_account || undefined}
            >
              {accounts?.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            {message === "parsingError" ? (
              <span className="label-text-alt text-error">{getZodErrorMessage(t, "from_account", errors)}</span>
            ) : null}
            <LuArrowDown />
          </>
        ) : null}
        <select className="select select-bordered w-full" name="account" defaultValue={expense?.account || undefined}>
          {accounts?.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
        <AmountInput
          placeholder={t("amount")}
          name="amount"
          defaultValue={expense?.amount}
          errorMessage={getZodErrorMessage(t, "amount", errors)}
        />
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
