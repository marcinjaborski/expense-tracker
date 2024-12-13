"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

const createCategorySchema = z.object({
  id: z.preprocess(Number, z.number().optional()),
  name: z.string().min(1, "nonEmptyName"),
  icon: z.string().min(1),
  type: ExpenseTypes,
});

export async function createCategory(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = createCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }
  if (parsedFormData.data.id === 0) delete parsedFormData.data.id;
  const { error } = await supabase.from("categories").upsert(parsedFormData.data);
  if (error) {
    return { message: "serverError", errors: [] };
  }

  return { message: "OK", errors: [] };
}
