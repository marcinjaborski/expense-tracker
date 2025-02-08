import { useInfiniteQuery } from "@tanstack/react-query";
import { DEBT_PAGE_SIZE } from "@src/utils/constants.ts";
import supabase from "@src/utils/supabase.ts";
import { notNull } from "@src/utils/functions.ts";
import queryKey, { DebtFilters } from "@src/utils/queryKey.ts";

function useDebts({ person, showSettled }: DebtFilters) {
  return useInfiniteQuery({
    queryKey: queryKey.debts.list({ person, showSettled }),
    queryFn: async ({ pageParam }) => {
      let query = supabase.from("debts").select("*").order("created_at", { ascending: false });
      query = query.eq("person", person);
      if (!showSettled) query = query.is("settled", false);
      query = query.range(pageParam * DEBT_PAGE_SIZE, (pageParam + 1) * DEBT_PAGE_SIZE - 1);
      return query.throwOnError().then((result) => result.data);
    },
    select: (data) => data.pages.flat().filter(notNull),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage?.length === DEBT_PAGE_SIZE ? lastPageParam + 1 : null),
  });
}

export default useDebts;
