"use server";

import { z } from "zod";

import { redirect } from "@/navigation";
import { mapExpenseTypeToRoute } from "@/utils/routes";
import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

const createExpenseSchema = z.object({
  type: ExpenseTypes,
  category: z.preprocess(Number, z.number()),
  date: z.string(),
  amount: z.coerce.number().nonnegative("nonNegativeNumber"),
  description: z.string().optional(),
  recurring: z.string().optional(),
});

export async function createExpense(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = createExpenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }
  const { error } = await supabase.from("expenses").insert(parsedFormData.data);
  if (error) {
    return {
      message: "serverError",
      errors: [],
    };
  }
  redirect(mapExpenseTypeToRoute[parsedFormData.data.type]);
  return { message: "OK", errors: [] };
}
