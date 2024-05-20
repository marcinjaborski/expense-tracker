"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const createAccountSchema = z.object({
  id: z.preprocess(Number, z.number().optional()),
  name: z.string().min(3, "nameMinLength"),
  currency: z.string().optional(),
  initialBalance: z.coerce.number().optional(),
});

export async function createAccount(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = createAccountSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }
  if (parsedFormData.data.id === 0) delete parsedFormData.data.id;
  const { error } = await supabase.from("accounts").upsert(parsedFormData.data);
  if (error) {
    return { message: "serverError", errors: [] };
  }

  return { message: "OK", errors: [] };
}
