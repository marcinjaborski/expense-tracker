"use server";

import { z } from "zod";

import { redirect } from "@/navigation";
import { createClient } from "@/utils/supabase/server";

const registerSchema = z
  .object({
    email: z.string().email("notEmail"),
    password: z.string().min(8, "passwordMinLength"),
    confirmPassword: z.string().min(8, "passwordMinLength"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "passwordsMismatch",
        path: ["confirmPassword"],
      });
    }
  });

export async function register(_: unknown, formData: FormData) {
  "use server";

  const supabase = createClient();
  const parsedFormData = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    return { message: "parsingError", errors: parsedFormData.error.errors };
  }

  const { error } = await supabase.auth.signUp({
    email: parsedFormData.data.email,
    password: parsedFormData.data.password,
  });
  if (error) {
    if (Number(error.status) >= 500) redirect("/error");
    return { message: "invalidCredentials", errors: [] };
  }

  redirect("/");
  return { message: "OK", errors: [] };
}
