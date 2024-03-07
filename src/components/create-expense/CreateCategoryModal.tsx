"use client";

import { useFormState, useFormStatus } from "react-dom";
import { LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";

import { ExpenseSelect } from "@/components/create-expense/ExpenseSelect";
import { LabeledInput } from "@/components/shared";
import { categoryIcon } from "@/utils/categories";
import { cn, getModal } from "@/utils/functions";
import { createCategory } from "@/utils/serverActions/createCategory";

export function CreateCategoryModal() {
  const [state, formAction] = useFormState(createCategory, { message: "" });
  const { pending } = useFormStatus();

  if (state.message === "OK") getModal("create_category_modal").close();

  return (
    <dialog id="create_category_modal" className="modal">
      <form className="modal-box flex flex-col" action={formAction}>
        <h3 className="text-lg font-bold">Create new category</h3>
        <LabeledInput label="Name" name="name" />
        <div className="mt-3 grid max-h-[30vh] grid-cols-4 gap-2 overflow-y-auto">
          {Object.entries(categoryIcon).map(([name, Icon], index) => (
            <label key={name} className="btn has-[:checked]:btn-primary">
              <Icon className="text-2xl" />
              <input type="radio" value={name} className="hidden" name="icon" defaultChecked={index === 0} />
            </label>
          ))}
        </div>
        <div className="join mt-5 self-center">
          <ExpenseSelect label="Income" Icon={LuPlus} value="income" />
          <ExpenseSelect label="Expense" Icon={LuMinus} value="expense" defaultChecked />
          <ExpenseSelect label="Transfer" Icon={LuArrowRightLeft} value="transfer" />
        </div>
        <div className="modal-action">
          <input
            type="submit"
            className={cn("btn btn-primary", { disabled: pending })}
            aria-label="Create"
            disabled={pending}
          />
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">close</button>
      </form>
    </dialog>
  );
}
