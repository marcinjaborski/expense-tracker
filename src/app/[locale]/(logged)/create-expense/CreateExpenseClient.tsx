"use client";

import { LuArrowRightLeft, LuCoins, LuMinus, LuPlus } from "react-icons/lu";
import { createExpense } from "@/utils/serverActions";
import { useState } from "react";
import { ExpenseType } from "@/utils/types";
import { useFormState, useFormStatus } from "react-dom";
import { cn } from "@/utils/functions";
import { CategoryCarousel, CreateCategoryModal, ExpenseSelect } from "@/components";
import { useTranslations } from "next-intl";

export function CreateExpenseClient() {
  const t = useTranslations("CreateExpense");
  const [type, setType] = useState<ExpenseType>(ExpenseType.enum.expense);
  const [state, formAction] = useFormState(createExpense, { message: "" });
  const { pending } = useFormStatus();

  return (
    <>
      <form action={formAction} className="box-border flex h-full flex-col items-center justify-center gap-3 px-5">
        <div className="join">
          <ExpenseSelect
            label="Income"
            Icon={LuPlus}
            value="income"
            onChange={() => setType(ExpenseType.enum.income)}
          />
          <ExpenseSelect
            label="Expense"
            Icon={LuMinus}
            value="expense"
            defaultChecked
            onChange={() => setType(ExpenseType.enum.expense)}
          />
          <ExpenseSelect
            label="Transfer"
            Icon={LuArrowRightLeft}
            value="transfer"
            onChange={() => setType(ExpenseType.enum.transfer)}
          />
        </div>
        <CategoryCarousel type={type} />
        <label className="input input-bordered flex items-center gap-2">
          <input autoFocus type="number" className="grow" placeholder={t("amount")} name="amount" />
          <LuCoins />
        </label>
        <input
          type="date"
          className="input input-bordered"
          name="date"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        <textarea
          name="description"
          placeholder={t("description")}
          className="textarea textarea-bordered w-full"
        ></textarea>
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
