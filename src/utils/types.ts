import { z } from "zod";

export const ExpenseType = z.enum(["expense", "income", "transfer"]);
export type ExpenseType = z.infer<typeof ExpenseType>;
