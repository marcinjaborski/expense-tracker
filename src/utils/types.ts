import { Database, Enums } from "@src/utils/database.types.ts";

export type ExpenseOption = Enums<"expense_type"> | "all";

export type Dir = "asc" | "desc";
export type Sort = "date" | "amount";

export type TableType = keyof Database["public"]["Tables"];

export type CompoundData = { amount: number; description: string }[];
