"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

const createCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  type: ExpenseTypes,
});

export async function createCategory(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = createCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: parsedFormData.error.message };
  }
  const { error } = await supabase.from("categories").insert(parsedFormData.data);
  if (error) {
    return { message: error.message };
  }

  return { message: "OK" };
}
