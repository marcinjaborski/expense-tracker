import { Database } from "@src/utils/database.types.ts";

export type ExpenseType = "expense" | "income" | "transfer";
export type ExpenseOption = ExpenseType | "all";

export type Dir = "asc" | "desc";
export type Sort = "date" | "amount";

export type TableType = keyof Database["public"]["Tables"];
