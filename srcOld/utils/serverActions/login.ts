"use server";

import { z } from "zod";

import { redirect } from "@/navigation";
import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email("notEmail"),
  password: z.string().min(8, "passwordMinLength"),
});

export async function login(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }

  const { error } = await supabase.auth.signInWithPassword(parsedFormData.data);
  if (error) {
    if (Number(error.status) >= 500) redirect("/error");
    return { message: "invalidCredentials", errors: [] };
  }

  redirect("/");
  return { message: "OK", errors: [] };
}
