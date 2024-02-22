import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { ExpenseType } from "@/utils/types";
import { redirect } from "next/navigation";
import { LuArrowRightLeft, LuCoins, LuMinus, LuPlus } from "react-icons/lu";
import { ExpenseSelect } from "@/app/(logged)/create-expense/(components)";

const createExpenseSchema = z.object({
  type: ExpenseType,
  date: z.string(),
  amount: z.preprocess(Number, z.number().nonnegative()),
  description: z.string().optional(),
  recurring: z.string().optional(),
});

async function createExpense(formData: FormData) {
  "use server";
  const supabase = createClient();
  const parsedFormData = createExpenseSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsedFormData.success) {
    redirect("/error");
  }
  const { error } = await supabase.from("expenses").insert(parsedFormData.data);
  if (error) {
    redirect("/error");
  }
}

export default function CreateExpense() {
  return (
    <form
      action={createExpense}
      className="flex min-h-screen flex-col items-center justify-center gap-3 p-5"
    >
      <div className="join">
        <ExpenseSelect label="Income" Icon={LuPlus} value="income" />
        <ExpenseSelect
          label="Expense"
          Icon={LuMinus}
          value="expense"
          defaultChecked
        />
        <ExpenseSelect
          label="Transfer"
          Icon={LuArrowRightLeft}
          value="transfer"
        />
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <input
          autoFocus
          type="number"
          className="grow"
          placeholder="Amount"
          name="amount"
        />
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
        placeholder="Description"
        className="textarea textarea-bordered w-full"
      ></textarea>
      <input
        type="submit"
        className="btn btn-primary fixed bottom-20"
        aria-label="Create"
        value="Create"
      />
    </form>
  );
}
