"use server";
import { z } from "zod";
import { ExpenseType } from "@/utils/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const createCategorySchema = z.object({
  name: z.string(),
  icon: z.string(),
  type: ExpenseType,
});

export async function createCategory(formData: FormData) {
  "use server";
  const supabase = createClient();
  const parsedFormData = createCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsedFormData.success) {
    redirect("/error");
  }
  const { error } = await supabase.from("categories").insert(parsedFormData.data);
  if (error) {
    redirect("/error");
  }
}
