"use server";

import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { createClient } from "@/utils/supabase/server";

export async function getExpenseById(id: number) {
  if (!id) return null;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("expenses")
    .select("*, category (*)")
    .eq("id", id)
    .single<ExpenseReturnType>();
  if (error || !data) return null;
  return data;
}
