import { DIR, DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import { ExpenseOption } from "@/utils/types";

export type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories"> | null;
};

export const buildExpensesQuery = (
  supabase: ReturnType<typeof createClient>,
  type: ExpenseOption,
  q: string,
  sort: SortOption,
  dir: DirOption,
) => {
  let query = supabase.from("expenses").select("*, category (*)");
  if (type !== "all") query = query.eq("type", type);
  if (q !== "") query = query.ilike("description", `%${q}%`);
  return query.order(sort, { ascending: dir === DIR.asc }).returns<ExpenseReturnType[]>();
};
