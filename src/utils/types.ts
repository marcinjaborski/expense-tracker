import { z } from "zod";

export const ExpenseTypes = z.enum(["expense", "income", "transfer"]);
export type ExpenseType = z.infer<typeof ExpenseTypes>;
export type ExpenseOption = ExpenseType | "all";
