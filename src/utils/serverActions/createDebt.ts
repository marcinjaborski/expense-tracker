"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const createDebtSchema = z.object({
  id: z.preprocess(Number, z.number().optional()),
  person: z.string().min(1, "emptyPerson"),
  amount: z.preprocess(Number, z.number({ invalid_type_error: "invalidNumber" }).positive("numberGreaterThanZero")),
  description: z.string().optional(),
});

export async function createDebt(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = createDebtSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }
  if (parsedFormData.data.id === 0) delete parsedFormData.data.id;
  const { error } = await supabase.from("debts").upsert(parsedFormData.data);
  if (error) {
    return { message: "serverError", errors: [] };
  }

  return { message: "OK", errors: [] };
}
