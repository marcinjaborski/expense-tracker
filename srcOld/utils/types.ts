import { z } from "zod";

import { Database } from "@/utils/supabase/database.types";

export const ExpenseTypes = z.enum(["expense", "income", "transfer"]);
export type ExpenseType = z.infer<typeof ExpenseTypes>;
export type ExpenseOption = ExpenseType | "all";

export function isExpenseType(value: string): value is ExpenseType {
  return ExpenseTypes.safeParse(value).success;
}

export type DatabaseTable = keyof Database["public"]["Tables"];

export function isDatabaseTable(value: string | null): value is DatabaseTable {
  return value !== null && ["expenses", "accounts", "categories", "debts"].includes(value);
}

export type Functions = Database["public"]["Functions"];
