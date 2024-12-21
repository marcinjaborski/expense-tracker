import { ExpenseType } from "@src/utils/types.ts";

export type CreateExpenseFormData = {
  account: number;
  amount: number;
  category: number;
  date: string;
  description: string;
  from_account: number;
  type: ExpenseType;
};
