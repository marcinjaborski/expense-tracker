import { LabeledInput } from "@/components";
import { ExpenseSelect } from "@/app/(logged)/create-expense/(components)";
import { LuArrowRightLeft, LuMinus, LuPlus } from "react-icons/lu";
import { createCategory } from "@/utils/serverActions/createCategory";

export function CreateCategoryModal() {
  return (
    <dialog id="create_category_modal" className="modal">
      <form className="modal-box flex flex-col" action={createCategory}>
        <h3 className="text-lg font-bold">Create new category</h3>
        <LabeledInput label="Name" name="name" />
        <LabeledInput label="Icon" name="icon" />
        <div className="join mt-5 self-center">
          <ExpenseSelect label="Income" Icon={LuPlus} value="income" />
          <ExpenseSelect label="Expense" Icon={LuMinus} value="expense" defaultChecked />
          <ExpenseSelect label="Transfer" Icon={LuArrowRightLeft} value="transfer" />
        </div>
        <div className="modal-action">
          <input type="submit" className="btn btn-primary" aria-label="Create" />
        </div>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
