import { Enums } from "@src/utils/database.types.ts";

export type CreateExpenseFormData = {
  account: number;
  amount: number;
  category: number;
  date: string;
  description: string;
  from_account: number;
  type: Enums<"expense_type">;
};
