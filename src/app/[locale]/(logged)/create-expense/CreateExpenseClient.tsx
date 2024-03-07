"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { LuArrowRightLeft, LuCoins, LuMinus, LuPlus } from "react-icons/lu";

import { CategoryCarousel, CreateCategoryModal, ExpenseSelect } from "@/components";
import { cn } from "@/utils/functions";
import { createExpense } from "@/utils/serverActions";
import { ExpenseType, ExpenseTypes } from "@/utils/types";

export function CreateExpenseClient() {
  const t = useTranslations("CreateExpense");
  const [type, setType] = useState<ExpenseType>(ExpenseTypes.enum.expense);
  const [, formAction] = useFormState(createExpense, { message: "" });
  const { pending } = useFormStatus();

  return (
    <>
      <form action={formAction} className="box-border flex h-full flex-col items-center justify-center gap-3 px-5">
        <div className="join">
          <ExpenseSelect
            label="Income"
            Icon={LuPlus}
            value="income"
            onChange={() => setType(ExpenseTypes.enum.income)}
          />
          <ExpenseSelect
            label="Expense"
            Icon={LuMinus}
            value="expense"
            defaultChecked
            onChange={() => setType(ExpenseTypes.enum.expense)}
          />
          <ExpenseSelect
            label="Transfer"
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
        <input
          type="date"
          className="input input-bordered"
          name="date"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <textarea name="description" placeholder={t("description")} className="textarea textarea-bordered w-full" />
        <input
          type="submit"
          disabled={pending}
          className={cn("btn btn-primary fixed bottom-20", { disabled: pending })}
          aria-label={t("create")}
          value={t("create")}
        />
      </form>
      <CreateCategoryModal />
    </>
  );
}
