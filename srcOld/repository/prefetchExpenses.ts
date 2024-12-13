import { QueryClient } from "@tanstack/react-query";

import { DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/server";
import { ExpenseOption } from "@/utils/types";

import { buildExpensesQuery } from "./buildExpensesQuery";

export const prefetchExpenses = async (
  queryClient: QueryClient,
  type: ExpenseOption,
  q: string,
  sort: SortOption,
  dir: DirOption,
) => {
  const supabase = createClient();
  const { data: expenses } = await buildExpensesQuery(supabase, type, 0, q, sort, dir, [], []);
  if (!expenses) return;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["expenses", type, q, sort, dir, [], []],
    queryFn: () => expenses,
    initialPageParam: 0,
  });
};
