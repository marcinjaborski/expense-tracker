import { DIR, DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";
import { ExpenseOption } from "@/utils/types";

export type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories">;
  account: Tables<"accounts">;
  from_account: Tables<"accounts"> | null;
};

export const EXPENSE_PAGE_SIZE = 50;

export const buildExpensesQuery = (
  supabase: ReturnType<typeof createClient>,
  type: ExpenseOption,
  page: number,
  q: string,
  sort: SortOption,
  dir: DirOption,
) => {
  let query = supabase.from("expenses").select("*, category (*), account (*), from_account (*)");
  if (type !== "all") query = query.eq("type", type);
  if (q !== "") query = query.ilike("description", `%${q}%`);
  query = query.order(sort, { ascending: dir === DIR.asc });
  query = query.range(page * EXPENSE_PAGE_SIZE, (page + 1) * EXPENSE_PAGE_SIZE - 1);
  return query.returns<ExpenseReturnType[]>();
};
