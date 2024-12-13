import { useInfiniteQuery } from "@tanstack/react-query";

import { buildDebtsQuery, DEBT_PAGE_SIZE } from "@/repository/buildDebtsQuery";
import { createClient } from "@/utils/supabase/client";

export const getDebtsClient = (page: number, showSettled: boolean) => {
  const supabase = createClient();
  return buildDebtsQuery(supabase, page, showSettled).throwOnError();
};

export const useDebts = (showSettled: boolean) =>
  useInfiniteQuery({
    queryKey: ["debts", showSettled],
    queryFn: async ({ pageParam }) => getDebtsClient(pageParam, showSettled).then((result) => result.data),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage?.length === DEBT_PAGE_SIZE ? lastPageParam + 1 : null),
  });
