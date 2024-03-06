"use server";
import { z } from "zod";
import { ExpenseType } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/navigation";
import { mapExpenseTypeToRoute } from "@/utils/routes";

const createExpenseSchema = z.object({
  type: ExpenseType,
  category: z.preprocess(Number, z.number()),
  date: z.string(),
  amount: z.preprocess(Number, z.number().nonnegative()),
  description: z.string().optional(),
  recurring: z.string().optional(),
});

export async function createExpense(_: unknown, formData: FormData) {
  "use server";
  const supabase = createClient();
  const parsedFormData = createExpenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return {
      message: parsedFormData.error.message,
    };
  }
  const { error } = await supabase.from("expenses").insert(parsedFormData.data);
  if (error) {
    return {
      message: error.message,
    };
  }
  redirect(mapExpenseTypeToRoute[parsedFormData.data.type]);
}
