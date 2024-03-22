import { QueryClient } from "@tanstack/react-query";

import { DIR, DirOption, SortOption } from "@/utils/searchParams";
import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { ExpenseOption } from "@/utils/types";

export type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories"> | null;
};

export const prefetchExpenses = async (
  queryClient: QueryClient,
  type: ExpenseOption,
  sort: SortOption,
  dir: DirOption,
) => {
  const supabase = createClient();
  let query = supabase.from("expenses").select("*, category (*)");
  if (type !== "all") query = query.eq("type", type);
  query = query.order(sort, { ascending: dir === DIR.asc });
  const { data: expenses } = await query.returns<ExpenseReturnType[]>();
  if (!expenses) return;

  await queryClient.prefetchQuery({
    queryKey: ["expenses", type, sort, dir],
    queryFn: () => expenses,
  });
};
