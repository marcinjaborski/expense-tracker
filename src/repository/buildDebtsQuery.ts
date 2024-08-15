import { createClient } from "@/utils/supabase/client";

export const DEBT_PAGE_SIZE = 50;

export function buildDebtsQuery(supabase: ReturnType<typeof createClient>, page: number, showSettled: boolean) {
  let query = supabase.from("debts").select("*").order("created_at", { ascending: false });
  if (!showSettled) query = query.is("settled", false);
  return query.range(page * DEBT_PAGE_SIZE, (page + 1) * DEBT_PAGE_SIZE - 1);
}
