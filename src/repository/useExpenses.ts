import { useInfiniteQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { EXPENSE_PAGE_SIZE } from "@src/utils/constants.ts";
import { Tables } from "@src/utils/database.types.ts";
import queryKey, { ExpenseFilters } from "@src/utils/queryKey.ts";

export type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories">;
  account: Tables<"accounts">;
  from_account: Tables<"accounts"> | null;
};

function useExpenses({ type, q, sort, dir, accounts, categories }: ExpenseFilters) {
  return useInfiniteQuery({
    queryKey: queryKey.expenses.list({ type, q, sort, dir, accounts, categories }),
    queryFn: async ({ pageParam }) => {
      let query = supabase.from("expenses").select("*, category (*), account (*), from_account (*)");
      if (type !== "all") query = query.eq("type", type);
      if (q) query = query.ilike("description", `%${q}%`);
      if (accounts?.length) query = query.in("account", accounts);
      if (categories?.length) query = query.in("category", categories);
      if (sort) query = query.order(sort, { ascending: dir === "asc" });
      query = query.range(pageParam * EXPENSE_PAGE_SIZE, (pageParam + 1) * EXPENSE_PAGE_SIZE - 1);
      return query
        .throwOnError()
        .returns<ExpenseReturnType[]>()
        .then((result) => result.data);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage?.length === EXPENSE_PAGE_SIZE ? lastPageParam + 1 : null,
  });
}

export default useExpenses;
