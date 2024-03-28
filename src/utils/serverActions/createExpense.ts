"use server";

import { z } from "zod";

import { redirect } from "@/navigation";
import { mapExpenseTypeToRoute } from "@/utils/routes";
import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

const createExpenseSchema = z.object({
  id: z.preprocess(Number, z.number().optional()),
  type: ExpenseTypes,
  category: z.preprocess(
    Number,
    z.number({ invalid_type_error: "missingCategory", required_error: "missingCategory" }),
  ),
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
  if (parsedFormData.data.id === 0) delete parsedFormData.data.id;
  const { error } = await supabase.from("expenses").upsert(parsedFormData.data);
  if (error) {
    return {
      message: "serverError",
      errors: [],
    };
  }
  redirect(mapExpenseTypeToRoute[parsedFormData.data.type]);
  return { message: "OK", errors: [] };
}
